import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MessageCircle, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { buildWhatsAppUrl, DISPLAY_PHONE, TEL_LINK } from '../utils/plumbing';
import { useLanguage } from '../i18n/LanguageContext';
import { MagneticAnchor, MagneticButton } from './MagneticButton';
import { SafeImage } from './SafeImage';
import { CountUpNumber } from './CountUpNumber';

interface HeroSectionProps {
  onGetQuotation: () => void;
}

export function HeroSection({ onGetQuotation }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  const staggerContainer = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  };

  const staggerItem = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#081D2B] text-white pt-24 pb-14 md:pt-32 md:pb-20"
    >
      {/* Subtle animated architectural gradient backdrop */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="hero-mesh-motion absolute -inset-1/4 opacity-70"
          style={{
            background:
              'radial-gradient(60% 50% at 15% 20%, rgba(18, 59, 85, 0.9) 0%, transparent 70%), radial-gradient(45% 45% at 85% 25%, rgba(217, 185, 120, 0.16) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Hero Copy with Staggered Entrance */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium mb-4"
            >
              <span className="font-display font-bold tracking-tight brand-gold-shimmer">
                {t.hero.kickerBrand}
              </span>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <span className="text-[#D9B978]">{t.hero.kickerTrust}</span>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <span className="text-white/80">{t.hero.kickerArea}</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="font-display font-bold text-[clamp(2.1rem,4vw,3.65rem)] leading-[1.12] tracking-tight text-white text-balance"
            >
              {t.hero.headlineLine1}{' '}
              <span className="text-[#D9B978]">{t.hero.headlineLine2}</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p variants={staggerItem} className="mt-3 text-sm text-white/65 max-w-xl">
              {t.hero.legacyLine}
            </motion.p>

            {/* Sculpted Interactive Hero CTAs */}
            <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-3.5">
              <MagneticButton
                type="button"
                autoSheen
                onClick={onGetQuotation}
                className="inline-flex items-center justify-center min-h-[50px] px-6 py-3 rounded-xl bg-gradient-to-b from-[#E4C788] to-[#CEAA61] hover:from-[#ECCF93] hover:to-[#C6A054] text-[#081D2B] font-display font-bold text-sm sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_12px_28px_-6px_rgba(217,185,120,0.4)] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>{t.hero.ctaQuote}</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </MagneticButton>

              <MagneticAnchor
                href={buildWhatsAppUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[50px] px-6 py-3 rounded-xl bg-[#123B55]/90 hover:bg-[#194E70] border border-[#D9B978]/35 hover:border-[#D9B978]/70 backdrop-blur-md text-white font-display font-semibold text-sm sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_-8px_rgba(0,0,0,0.45)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D9B978]"
              >
                <MessageCircle
                  className="w-4 h-4 text-[#D9B978] shrink-0 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>{t.hero.ctaWhatsApp}</span>
              </MagneticAnchor>

              <motion.a
                href={TEL_LINK}
                whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className="group inline-flex items-center gap-2 min-h-[50px] px-4 py-3 rounded-xl border border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.07] text-sm font-medium text-white/90 hover:text-[#D9B978] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D9B978]"
              >
                <Phone
                  className="w-4 h-4 text-[#D9B978] shrink-0 transition-transform duration-200 group-hover:rotate-12"
                  aria-hidden="true"
                />
                <span className="font-mono tabular-nums">{DISPLAY_PHONE}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Hero Architectural Showcase with Crisp Entrance & Hover Elevation */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-[#123B55]/40 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)] aspect-16/10 lg:aspect-auto lg:h-full min-h-[260px]">
              <SafeImage
                src="/src/assets/images/hero_plumbing_luxury_1795006932495.jpg"
                alt={t.hero.imageAlt}
                fallbackTitle={t.hero.imageFallback}
                className="w-full h-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#081D2B]/90 via-[#081D2B]/25 to-transparent pointer-events-none"
              />
              {/* Subtle Gold Top Border Highlight */}
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D9B978]/70 to-transparent"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs text-[#D9B978] font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{t.hero.imageBadge}</span>
                </div>
                <p className="mt-1 font-display font-semibold text-sm sm:text-base text-white">
                  {t.hero.imageCaption}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width 4-Column Trust Indicator Strip */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl p-2 -m-2 transition-colors hover:bg-white/[0.03]"
          >
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#D9B978]">
              <CountUpNumber target={48} suffix="+" />
            </p>
            <p className="mt-1 text-sm font-medium text-white">{t.hero.stat1Title}</p>
            <p className="text-xs text-white/60 mt-0.5">{t.hero.stat1Sub}</p>
          </motion.div>

          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl p-2 -m-2 transition-colors hover:bg-white/[0.03]"
          >
            <p className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2">
              <span>{t.hero.stat2Value}</span>
            </p>
            <p className="mt-1 text-sm font-medium text-white/90">{t.hero.stat2Title}</p>
            <p className="text-xs text-white/60 mt-0.5">{t.hero.stat2Sub}</p>
          </motion.div>

          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl p-2 -m-2 transition-colors hover:bg-white/[0.03]"
          >
            <p className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2">
              <span>100%</span>
              <ShieldCheck className="w-5 h-5 text-[#D9B978] shrink-0" aria-hidden="true" />
            </p>
            <p className="mt-1 text-sm font-medium text-white/90">{t.hero.stat3Title}</p>
            <p className="text-xs text-white/60 mt-0.5">{t.hero.stat3Sub}</p>
          </motion.div>

          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl p-2 -m-2 transition-colors hover:bg-white/[0.03]"
          >
            <a
              href={TEL_LINK}
              className="group block focus-visible:outline-2 focus-visible:outline-[#D9B978] rounded"
            >
              <p className="text-xl sm:text-2xl font-mono font-semibold tabular-nums text-[#D9B978] group-hover:underline">
                9935670167
              </p>
              <p className="mt-1.5 text-sm font-medium text-white/90">{t.hero.stat4Title}</p>
              <p className="text-xs text-white/60 mt-0.5">{t.hero.stat4Sub}</p>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
