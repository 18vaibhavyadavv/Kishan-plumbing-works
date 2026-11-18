import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildWhatsAppUrl, TEL_LINK } from '../utils/plumbing';

export function FloatingActions() {
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  return (
    <>
      {/* Desktop Floating WhatsApp Button with tasteful dual concentric pulse */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <div className="relative">
          {!prefersReducedMotion && (
            <>
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0.55, scale: 1 }}
                animate={{ opacity: 0, scale: 1.45 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border border-[#D9B978]/70 pointer-events-none"
              />
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0.4, scale: 1 }}
                animate={{ opacity: 0, scale: 1.7 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
                className="absolute inset-0 rounded-full border border-[#D9B978]/45 pointer-events-none"
              />
            </>
          )}
          <motion.a
            href={buildWhatsAppUrl(undefined, lang)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.floating.whatsappAria}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className="btn-sheen-trigger relative overflow-hidden inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-b from-[#123B55] to-[#081D2B] hover:from-[#184B6B] hover:to-[#0C293D] text-white border border-[#D9B978]/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_14px_30px_-6px_rgba(8,29,43,0.55)] font-display font-semibold text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#D9B978]"
          >
            {!prefersReducedMotion && (
              <span
                aria-hidden="true"
                className="btn-sheen-auto pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
            )}
            <MessageCircle
              className="w-5 h-5 text-[#D9B978] shrink-0 relative z-10"
              aria-hidden="true"
            />
            <span className="relative z-10">{t.floating.whatsappLabel}</span>
          </motion.a>
        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar (<= 56px height to keep sticky footprint under 15%) */}
      <div
        role="region"
        aria-label="Quick Contact Actions"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-[#081D2B]/95 backdrop-blur-md border-t border-white/15 px-3 flex items-center gap-2.5 shadow-2xl"
      >
        <motion.a
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          href={TEL_LINK}
          className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-white/10 active:bg-white/20 border border-white/10 text-white font-display font-semibold text-sm transition-colors whitespace-nowrap"
        >
          <Phone className="w-4 h-4 text-[#D9B978] shrink-0" aria-hidden="true" />
          <span>{t.floating.callNow}</span>
        </motion.a>
        <motion.a
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          href={buildWhatsAppUrl(undefined, lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-gradient-to-b from-[#E4C788] to-[#CEAA61] text-[#081D2B] font-display font-bold text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t.floating.whatsappMobile}</span>
        </motion.a>
      </div>
    </>
  );
}
