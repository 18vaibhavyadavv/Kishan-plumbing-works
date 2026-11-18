import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { SERVICES } from '../data/plumbingData';
import { SERVICES_HI } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import {
  buildWhatsAppUrl,
  buildServiceWhatsAppUrl,
  DISPLAY_PHONE,
  TEL_LINK,
} from '../utils/plumbing';

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-[#081D2B] text-white border-t border-white/10 pb-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Summary */}
          <div className="lg:col-span-4">
            <h2 className="font-display font-extrabold text-xl brand-gold-shimmer inline-block">
              {t.brandName}
            </h2>
            <p className="mt-2 text-sm font-medium text-[#D9B978]">{t.taglineHindi}</p>
            <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-sm">
              {t.footer.summary}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-white/80">
              <MapPin className="w-4 h-4 text-[#D9B978] shrink-0" aria-hidden="true" />
              <span>{t.footer.areaNote}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-semibold text-sm text-white">{t.footer.navHeading}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <a href="#home" className="hover:text-[#D9B978] transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D9B978] transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D9B978] transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#D9B978] transition-colors">
                  {t.nav.experience}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D9B978] transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D9B978] transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Services Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-semibold text-sm text-white">
              {t.footer.servicesHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {SERVICES.slice(0, 6).map((service) => {
                const label =
                  lang === 'hi' ? SERVICES_HI[service.id]?.title ?? service.title : service.title;
                return (
                  <li key={service.id}>
                    <a
                      href={buildServiceWhatsAppUrl(label, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#D9B978] transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Direct Contact & WhatsApp CTA */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-semibold text-sm text-white">
              {t.footer.directHeading}
            </h3>
            <div className="mt-4 space-y-3">
              <a
                href={TEL_LINK}
                className="inline-flex items-center gap-2.5 text-lg font-mono font-semibold tabular-nums text-[#D9B978] hover:underline"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{DISPLAY_PHONE}</span>
              </a>
              <p className="text-xs text-white/65">{t.footer.directDesc}</p>
              <a
                href={buildWhatsAppUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#D9B978] hover:bg-[#C8A55F] text-[#081D2B] font-display font-bold text-sm transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.nav.whatsappUs}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>{t.footer.copyright(new Date().getFullYear())}</p>
          <p>{t.footer.excellence}</p>
        </div>
      </div>
    </footer>
  );
}
