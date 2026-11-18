import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Menu, X, MessageCircle, Phone, Languages } from 'lucide-react';
import { buildWhatsAppUrl, DISPLAY_PHONE, TEL_LINK } from '../utils/plumbing';
import { useLanguage } from '../i18n/LanguageContext';
import { MagneticAnchor } from './MagneticButton';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { lang, setLang, t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, restDelta: 0.001 });

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#081D2B]/95 backdrop-blur-md border-b border-white/10 shadow-sm'
            : 'bg-[#081D2B]/85 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Single clean animated brand wordmark */}
          <motion.a
            href="#home"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={prefersReducedMotion ? undefined : { y: -1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative py-1 font-display font-extrabold text-[15px] sm:text-lg tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D9B978] rounded"
          >
            <span className="brand-gold-shimmer">{t.brandName}</span>
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gradient-to-r from-[#D9B978] via-[#F3DDA5] to-transparent scale-x-50 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
            />
          </motion.a>

          {/* Zone 2: Single-line navigation links */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-[#D9B978] rounded"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#D9B978] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                />
              </a>
            ))}
          </nav>

          {/* Zone 3: Language Switcher (English | हिन्दी) + Single Primary Action + Mobile Drawer Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Dual Language Switcher */}
            <div
              role="group"
              aria-label="Language switch"
              className="hidden md:inline-flex items-center p-0.5 rounded-xl bg-white/[0.07] border border-white/15 backdrop-blur-sm"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`relative px-2.5 py-1.5 rounded-[10px] text-xs font-display font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#D9B978] ${
                  lang === 'en' ? 'text-[#081D2B]' : 'text-white/75 hover:text-white'
                }`}
              >
                {lang === 'en' && (
                  <motion.span
                    layoutId="langPillDesktop"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 450, damping: 32 }
                    }
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[10px] bg-[#D9B978] shadow-xs"
                  />
                )}
                <span className="relative z-10">English</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                aria-pressed={lang === 'hi'}
                className={`relative px-2.5 py-1.5 rounded-[10px] text-xs font-display font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#D9B978] ${
                  lang === 'hi' ? 'text-[#081D2B]' : 'text-white/75 hover:text-white'
                }`}
              >
                {lang === 'hi' && (
                  <motion.span
                    layoutId="langPillDesktop"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 450, damping: 32 }
                    }
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[10px] bg-[#D9B978] shadow-xs"
                  />
                )}
                <span className="relative z-10">हिन्दी</span>
              </button>
            </div>

            {/* Compact Mobile Header Language Switcher */}
            <div
              role="group"
              aria-label="Mobile language switch"
              className="md:hidden inline-flex items-center p-0.5 rounded-lg bg-white/[0.08] border border-white/15"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2 py-1 rounded-md text-[11px] font-display font-bold transition-colors cursor-pointer ${
                  lang === 'en' ? 'bg-[#D9B978] text-[#081D2B]' : 'text-white/75'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                aria-pressed={lang === 'hi'}
                className={`px-2 py-1 rounded-md text-[11px] font-display font-bold transition-colors cursor-pointer ${
                  lang === 'hi' ? 'bg-[#D9B978] text-[#081D2B]' : 'text-white/75'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <MagneticAnchor
              href={buildWhatsAppUrl(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D9B978] hover:bg-[#C8A55F] text-[#081D2B] font-display font-bold text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_16px_-4px_rgba(217,185,120,0.4)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white"
            >
              <MessageCircle
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              />
              <span>{t.nav.whatsappUs}</span>
            </MagneticAnchor>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#D9B978]"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Scroll Progress Hairline */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="h-[2px] w-full bg-gradient-to-r from-[#D9B978]/60 via-[#D9B978] to-white/80 origin-left"
          />
        )}
      </header>

      {/* Mobile Slide-In Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden"
            />
            <motion.aside
              id="mobile-navigation-drawer"
              aria-label="Mobile Navigation"
              initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 max-w-[82vw] bg-[#081D2B] border-l border-white/10 z-[60] md:hidden flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <span className="font-display font-extrabold text-base brand-gold-shimmer">
                    {t.brandName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label={t.nav.closeMenu}
                    className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Drawer Language Switch */}
                <div className="mt-4 p-2 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/75 pl-1">
                    <Languages className="w-3.5 h-3.5 text-[#D9B978]" aria-hidden="true" />
                    <span>{lang === 'hi' ? 'भाषा' : 'Language'}</span>
                  </span>
                  <div className="inline-flex items-center p-0.5 rounded-lg bg-[#081D2B] border border-white/10">
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      className={`px-2.5 py-1 rounded-md text-xs font-display font-semibold cursor-pointer ${
                        lang === 'en' ? 'bg-[#D9B978] text-[#081D2B]' : 'text-white/75'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('hi')}
                      className={`px-2.5 py-1 rounded-md text-xs font-display font-semibold cursor-pointer ${
                        lang === 'hi' ? 'bg-[#D9B978] text-[#081D2B]' : 'text-white/75'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                <nav className="mt-5 flex flex-col gap-1">
                  {navLinks.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, x: 16 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.2 }}
                      className="flex items-center justify-between px-3 py-3.5 rounded-xl text-base font-medium text-white/90 hover:text-[#D9B978] hover:bg-white/5 transition-colors"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <p className="text-xs text-white/60">{t.servingOnly}</p>
                <a
                  href={TEL_LINK}
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-3 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D9B978]" aria-hidden="true" />
                  <span className="font-mono tabular-nums">{DISPLAY_PHONE}</span>
                </a>
                <a
                  href={buildWhatsAppUrl(undefined, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#D9B978] text-[#081D2B] font-display font-semibold text-sm hover:bg-[#C8A55F] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{t.nav.whatsappUs}</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
