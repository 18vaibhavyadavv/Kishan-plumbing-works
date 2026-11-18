import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { KANPUR_LOCALITIES, SERVICES } from '../data/plumbingData';
import { SERVICES_HI } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import {
  buildWhatsAppUrl,
  classifyGeolocationError,
  DISPLAY_PHONE,
  formatEnquiryMessage,
  isOutsideKanpur,
  isWithinKanpurNagarCoords,
  matchNearestKanpurLocality,
  TEL_LINK,
  validateEnquiryForm,
  type EnquiryErrors,
  type GeolocationErrorReason,
  type LiveCoordinates,
} from '../utils/plumbing';
import { MagneticAnchor, MagneticButton } from './MagneticButton';
import { LocalityCombobox } from './LocalityCombobox';

interface ContactSectionProps {
  selectedServiceId: string;
  onServiceChange: (serviceId: string) => void;
  onNotify: (type: 'success' | 'warning', title: string, description: string) => void;
}

export function ContactSection({
  selectedServiceId,
  onServiceChange,
  onNotify,
}: ContactSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const customLocalityInputRef = useRef<HTMLInputElement>(null);
  const { lang, t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(selectedServiceId || SERVICES[0].id);
  const [locality, setLocality] = useState('Swaroop Nagar');
  const [customLocality, setCustomLocality] = useState('');
  const [workDetails, setWorkDetails] = useState('');

  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [detectedCoords, setDetectedCoords] = useState<LiveCoordinates | null>(null);
  const [gpsStatusText, setGpsStatusText] = useState<string | null>(null);
  const [gpsErrorText, setGpsErrorText] = useState<string | null>(null);
  const [gpsErrorReason, setGpsErrorReason] = useState<GeolocationErrorReason | null>(null);

  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedWhatsAppUrl, setConfirmedWhatsAppUrl] = useState<string | null>(null);
  const [confirmedSummary, setConfirmedSummary] = useState<string | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (locality === 'Other Kanpur Nagar Locality') {
      window.setTimeout(() => customLocalityInputRef.current?.focus(), 60);
    }
  }, [locality]);

  const resolveServiceTitle = (id: string) => {
    const found = SERVICES.find((item) => item.id === id) ?? SERVICES[0];
    if (lang === 'hi') {
      return SERVICES_HI[found.id]?.title ?? found.title;
    }
    return found.title;
  };

  const detectLiveLocation = useCallback(
    async (silentIfDenied: boolean = false) => {
      if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
        if (!silentIfDenied) {
          setGpsErrorReason('unavailable');
          setGpsErrorText(t.contact.gpsUnsupported);
        }
        return;
      }

      setIsDetectingGps(true);
      setGpsErrorText(null);
      setGpsErrorReason(null);

      const handleSuccess = async (position: GeolocationPosition) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (!isWithinKanpurNagarCoords(lat, lng)) {
          setIsDetectingGps(false);
          setDetectedCoords(null);
          setGpsStatusText(null);
          setLocality('Outside Kanpur Nagar');
          onNotify('warning', t.servingOnly, t.contact.gpsOutsideDesc);
          return;
        }

        let resolvedArea = matchNearestKanpurLocality(lat, lng);
        let areaLabelPrefix: string = t.contact.gpsDetectedNear;

        try {
          const controller = new AbortController();
          const timer = window.setTimeout(() => controller.abort(), 3200);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
            {
              signal: controller.signal,
              headers: { Accept: 'application/json' },
            }
          );
          window.clearTimeout(timer);

          if (res.ok) {
            const data = (await res.json()) as {
              address?: {
                suburb?: string;
                neighbourhood?: string;
                residential?: string;
                city_district?: string;
                town?: string;
                city?: string;
                county?: string;
                state_district?: string;
              };
            };
            const addr = data?.address;
            const rawArea =
              addr?.neighbourhood ||
              addr?.suburb ||
              addr?.residential ||
              addr?.town ||
              '';

            const districtText = `${addr?.city || ''} ${addr?.state_district || ''} ${addr?.county || ''}`.toLowerCase();
            if (districtText && !districtText.includes('kanpur')) {
              setIsDetectingGps(false);
              setDetectedCoords(null);
              setGpsStatusText(null);
              setLocality('Outside Kanpur Nagar');
              onNotify('warning', t.servingOnly, t.contact.gpsOutsideDesc);
              return;
            }

            if (rawArea.trim()) {
              const presetMatch = KANPUR_LOCALITIES.find(
                (loc) => loc.toLowerCase() === rawArea.trim().toLowerCase()
              );
              resolvedArea = presetMatch || rawArea.trim();
              areaLabelPrefix = t.contact.gpsDetectedExact;
            }
          }
        } catch {
          // Fallback cleanly to deterministic Kanpur Nagar coordinate anchor
        }

        setIsDetectingGps(false);
        setDetectedCoords({ lat, lng });
        setGpsErrorText(null);
        setGpsErrorReason(null);
        setLocality(resolvedArea);
        setGpsStatusText(`${areaLabelPrefix}: ${resolvedArea}`);
        setErrors((prev) => ({ ...prev, locality: undefined, customLocality: undefined }));

        if (!silentIfDenied) {
          onNotify('success', t.contact.gpsSuccessTitle, t.contact.gpsSuccessDesc(resolvedArea));
        }
      };

      const handleFinalError = (error: GeolocationPositionError) => {
        setIsDetectingGps(false);
        if (silentIfDenied) return;
        let isEmbedded = false;
        try {
          isEmbedded = window.self !== window.top;
        } catch {
          isEmbedded = true;
        }
        const reason = classifyGeolocationError(error.code, error.message, isEmbedded);
        setGpsErrorReason(reason);
        const msg =
          reason === 'policy_blocked'
            ? t.contact.gpsDeniedPolicy
            : reason === 'user_denied'
              ? t.contact.gpsDenied
              : t.contact.gpsFailed;
        setGpsErrorText(msg);
        onNotify('warning', t.contact.gpsUnavailableTitle, msg);
      };

      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        (error) => {
          // On timeout or position unavailable, retry once with network/Wi-Fi accuracy
          if (error.code !== error.PERMISSION_DENIED) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleFinalError, {
              enableHighAccuracy: false,
              timeout: 8000,
              maximumAge: 300000,
            });
            return;
          }
          handleFinalError(error);
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 }
      );
    },
    [onNotify, t]
  );

  // Automatically fetch live location into the form on mount when permission is already granted
  // or when ?autolocate=1 is present, and react if permission changes from prompt to granted
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autolocate') === '1') {
      detectLiveLocation(true);
      return;
    }

    let permissionStatus: PermissionStatus | null = null;
    const handlePermChange = () => {
      if (permissionStatus?.state === 'granted') {
        detectLiveLocation(true);
      }
    };

    if (typeof navigator !== 'undefined' && navigator.permissions?.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((status) => {
          permissionStatus = status;
          if (status.state === 'granted') {
            detectLiveLocation(true);
          }
          status.addEventListener?.('change', handlePermChange);
        })
        .catch(() => {
          // Permissions API unsupported; user can click Use Live Location anytime
        });
    }

    return () => {
      permissionStatus?.removeEventListener?.('change', handlePermChange);
    };
  }, [detectLiveLocation]);

  const liveOutsideArea =
    isOutsideKanpur(locality, customLocality) || isOutsideKanpur('', workDetails);

  const handleLocalityChange = (nextVal: string) => {
    setLocality(nextVal);
    if (detectedCoords && gpsStatusText && !gpsStatusText.includes(nextVal)) {
      setDetectedCoords(null);
      setGpsStatusText(null);
    }
    setGpsErrorText(null);
    setGpsErrorReason(null);
    if (errors.locality) {
      setErrors((prev) => ({ ...prev, locality: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmedWhatsAppUrl(null);
    setConfirmedSummary(null);

    const payload = {
      name,
      phone,
      service: resolveServiceTitle(serviceId),
      locality,
      customLocality,
      workDetails,
      coordinates: detectedCoords,
    };

    const result = validateEnquiryForm(payload, lang);
    if (!result.valid) {
      setErrors(result.errors);
      if (result.outsideServiceArea) {
        onNotify('warning', t.servingOnly, t.contact.formOutsideDesc);
      } else {
        onNotify('warning', t.contact.formCheckTitle, t.contact.formCheckDesc);
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const message = formatEnquiryMessage(payload, lang);
    const waUrl = buildWhatsAppUrl(message, lang);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedWhatsAppUrl(waUrl);
      setConfirmedSummary(message);
      onServiceChange(serviceId);
      onNotify('success', t.contact.formReadyTitle, t.contact.formReadyDesc);

      const anchor = document.createElement('a');
      anchor.href = waUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }, 220);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact & Kanpur Nagar Service Boundary */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#123B55]">{t.servingOnly}</p>
              <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#081D2B] text-balance">
                {t.contact.heading}
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">{t.contact.subtitle}</p>
            </div>

            {/* Direct Contact Panel */}
            <div className="rounded-2xl bg-[#081D2B] text-white p-6 sm:p-7 border border-[#123B55]">
              <p className="text-xs font-medium text-[#D9B978]">{t.contact.panelEyebrow}</p>

              <a
                href={TEL_LINK}
                className="mt-2 inline-flex items-center gap-3 text-2xl sm:text-3xl font-mono font-semibold tabular-nums text-white hover:text-[#D9B978] transition-colors focus-visible:outline-2 focus-visible:outline-[#D9B978] rounded"
              >
                <Phone className="w-6 h-6 text-[#D9B978] shrink-0" aria-hidden="true" />
                <span>{DISPLAY_PHONE}</span>
              </a>

              <div className="mt-5 pt-5 border-t border-white/10 space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D9B978] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">{t.contact.cityTitle}</p>
                    <p className="text-xs text-white/65 mt-0.5">{t.contact.cityDesc}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <MagneticAnchor
                  href={buildWhatsAppUrl(undefined, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  autoSheen
                  className="flex-1 inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#E4C788] to-[#CEAA61] hover:from-[#ECCF93] hover:to-[#C6A054] text-[#081D2B] font-display font-bold text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_22px_-6px_rgba(217,185,120,0.4)] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.contact.directWhatsApp}</span>
                </MagneticAnchor>
                <a
                  href={TEL_LINK}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-medium text-sm transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#D9B978] shrink-0" aria-hidden="true" />
                  <span>{t.contact.callNow}</span>
                </a>
              </div>
            </div>

            {/* Service Area Assurance */}
            <div className="rounded-2xl bg-[#F5F7FA] border border-slate-200 p-5">
              <p className="font-display font-semibold text-sm text-[#081D2B]">
                {t.contact.whyOnlyTitle}
              </p>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                {t.contact.whyOnlyDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Validated WhatsApp Enquiry Form */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl bg-[#F5F7FA] border border-slate-200 p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-200">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#081D2B]">
                  {t.contact.formTitle}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{t.contact.formSubtitle}</p>
              </div>
              <span className="text-xs font-semibold text-[#123B55]">{t.contact.formBadge}</span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block text-sm font-medium text-[#081D2B] mb-1.5"
                  >
                    {t.contact.nameLabel}
                  </label>
                  <input
                    id="enquiry-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder={t.contact.namePlaceholder}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#081D2B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123B55] ${
                      errors.name ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-sm font-medium text-[#081D2B] mb-1.5"
                  >
                    {t.contact.phoneLabel}
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder={t.contact.phonePlaceholder}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border text-sm font-mono text-[#081D2B] placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123B55] ${
                      errors.phone ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="enquiry-service"
                    className="block text-sm font-medium text-[#081D2B] mb-1.5"
                  >
                    {t.contact.serviceLabel}
                  </label>
                  <select
                    id="enquiry-service"
                    name="service"
                    value={serviceId}
                    onChange={(e) => {
                      setServiceId(e.target.value);
                      onServiceChange(e.target.value);
                      if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
                    }}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#081D2B] focus:outline-none focus:ring-2 focus:ring-[#123B55] ${
                      errors.service ? 'border-red-500' : 'border-slate-300'
                    }`}
                  >
                    {SERVICES.map((item) => {
                      const label =
                        lang === 'hi' ? SERVICES_HI[item.id]?.title ?? item.title : item.title;
                      return (
                        <option key={item.id} value={item.id}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                  {errors.service && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <LocalityCombobox
                    value={locality}
                    onChange={handleLocalityChange}
                    hasError={Boolean(errors.locality || liveOutsideArea)}
                    isDetectingGps={isDetectingGps}
                    detectedCoords={detectedCoords}
                    gpsStatusText={gpsStatusText}
                    gpsErrorText={gpsErrorText}
                    gpsErrorReason={gpsErrorReason}
                    onDetectLiveLocation={() => detectLiveLocation(false)}
                  />
                  {errors.locality && !liveOutsideArea && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.locality}
                    </p>
                  )}
                </div>
              </div>

              {locality === 'Other Kanpur Nagar Locality' && (
                <div>
                  <label
                    htmlFor="enquiry-custom-locality"
                    className="block text-sm font-medium text-[#081D2B] mb-1.5"
                  >
                    {t.contact.customLocalityLabel}
                  </label>
                  <input
                    ref={customLocalityInputRef}
                    id="enquiry-custom-locality"
                    name="customLocality"
                    type="text"
                    value={customLocality}
                    onChange={(e) => {
                      setCustomLocality(e.target.value);
                      if (errors.customLocality)
                        setErrors((prev) => ({ ...prev, customLocality: undefined }));
                    }}
                    placeholder={t.contact.customLocalityPlaceholder}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#081D2B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123B55] ${
                      errors.customLocality ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.customLocality && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.customLocality}
                    </p>
                  )}
                </div>
              )}

              {/* Polite Outside Kanpur Nagar Guardrail Message */}
              {liveOutsideArea && (
                <div
                  role="alert"
                  className="rounded-xl bg-amber-50 border border-amber-300 p-4 flex items-start gap-3 text-amber-950"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-sm">
                    <p className="font-display font-semibold">{t.contact.outsideTitle}</p>
                    <p className="mt-1 text-amber-900 leading-relaxed">{t.contact.outsideDesc}</p>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="enquiry-details"
                  className="block text-sm font-medium text-[#081D2B] mb-1.5"
                >
                  {t.contact.detailsLabel}
                </label>
                <textarea
                  id="enquiry-details"
                  name="workDetails"
                  rows={3}
                  required
                  value={workDetails}
                  onChange={(e) => {
                    setWorkDetails(e.target.value);
                    if (errors.workDetails)
                      setErrors((prev) => ({ ...prev, workDetails: undefined }));
                  }}
                  placeholder={t.contact.detailsPlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#081D2B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123B55] ${
                    errors.workDetails ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.workDetails && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.workDetails}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <MagneticButton
                  type="submit"
                  autoSheen
                  disabled={isSubmitting || liveOutsideArea}
                  className="inline-flex items-center justify-center min-h-[50px] px-6 py-3 rounded-xl bg-gradient-to-b from-[#123B55] to-[#081D2B] hover:from-[#184B6B] hover:to-[#0C293D] disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-display font-bold text-sm sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_24px_-8px_rgba(8,29,43,0.45)] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#123B55]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>{t.contact.submittingBtn}</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 text-[#D9B978]" aria-hidden="true" />
                      <span>{t.contact.submitBtn}</span>
                    </>
                  )}
                </MagneticButton>

                <p className="text-xs text-slate-500">
                  {t.contact.directTo}{' '}
                  <span className="font-mono tabular-nums font-medium text-[#081D2B]">
                    9935670167
                  </span>
                </p>
              </div>
            </form>

            {/* Confirmed Submission Summary + Direct WhatsApp Action */}
            {confirmedWhatsAppUrl && confirmedSummary && (
              <div
                role="status"
                className="mt-6 rounded-2xl bg-white border border-[#D9B978] p-5 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-base text-[#081D2B]">
                      {t.contact.confirmedTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {t.contact.confirmedDesc}
                    </p>
                    <pre className="mt-3 p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                      {confirmedSummary}
                    </pre>
                    <div className="mt-4">
                      <a
                        href={confirmedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#D9B978] hover:bg-[#C8A55F] text-[#081D2B] font-display font-bold text-sm transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>{t.contact.openWhatsAppNow}</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
