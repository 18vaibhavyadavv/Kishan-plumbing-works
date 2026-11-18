import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { SERVICES_HI } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { Toast, type ToastState } from './components/Toast';
import { MagneticAnchor, MagneticButton } from './components/MagneticButton';
import { buildWhatsAppUrl } from './utils/plumbing';
import { SERVICES } from './data/plumbingData';

function CtaBanner({ onGetQuotation }: { onGetQuotation: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  return (
    <section aria-label="Quotation Call to Action" className="py-12 sm:py-16 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#081D2B] via-[#123B55] to-[#081D2B] text-white p-7 sm:p-10 lg:p-12 border border-[#123B55]"
        >
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold text-[#D9B978]">
                {t.ctaBanner.eyebrow}
              </p>
              <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl tracking-tight text-white text-balance">
                {t.ctaBanner.heading}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-white/80">{t.ctaBanner.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <MagneticButton
                type="button"
                autoSheen
                onClick={onGetQuotation}
                className="inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#E4C788] to-[#CEAA61] hover:from-[#ECCF93] hover:to-[#C6A054] text-[#081D2B] font-display font-bold text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_24px_-6px_rgba(217,185,120,0.4)] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{t.ctaBanner.quoteBtn}</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </MagneticButton>
              <MagneticAnchor
                href={buildWhatsAppUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-[#D9B978]/35 hover:border-[#D9B978]/70 backdrop-blur-md text-white font-display font-semibold text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-colors whitespace-nowrap"
              >
                <MessageCircle
                  className="w-4 h-4 text-[#D9B978] shrink-0 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>{t.ctaBanner.whatsappBtn}</span>
              </MagneticAnchor>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AppContent() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<number | null>(null);
  const { lang, t } = useLanguage();

  const showToast = useCallback(
    (type: 'success' | 'warning', title: string, description: string) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      setToast({ id: Date.now(), type, title, description });
      timerRef.current = window.setTimeout(() => {
        setToast(null);
      }, 5000);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const scrollToContact = useCallback(() => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const nameInput = document.getElementById('enquiry-name');
    if (nameInput instanceof HTMLInputElement) {
      window.setTimeout(() => nameInput.focus({ preventScroll: true }), 450);
    }
  }, []);

  const handleSelectServiceForQuote = useCallback(
    (serviceId: string) => {
      setSelectedServiceId(serviceId);
      const found = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];
      const displayName =
        lang === 'hi' ? SERVICES_HI[found.id]?.title ?? found.title : found.title;
      showToast(
        'success',
        t.services.selectedToastTitle(displayName),
        t.services.selectedToastDesc
      );
      scrollToContact();
    },
    [lang, scrollToContact, showToast, t.services]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#081D2B]">
        <Navbar />
        <main className="flex-1">
          <HeroSection onGetQuotation={scrollToContact} />
          <AboutSection />
          <ServicesSection
            selectedServiceId={selectedServiceId}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
          <ExperienceSection />
          <WhyChooseSection />
          <CtaBanner onGetQuotation={scrollToContact} />
          <FaqSection />
          <ContactSection
            selectedServiceId={selectedServiceId}
            onServiceChange={setSelectedServiceId}
            onNotify={showToast}
          />
        </main>
        <Footer />
        <FloatingActions />
        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
