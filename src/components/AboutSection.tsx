import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Ruler, Handshake } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SafeImage } from './SafeImage';

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Visual Composition */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="sm:col-span-2 rounded-2xl overflow-hidden border border-slate-200 aspect-4/3 sm:aspect-16/10">
              <SafeImage
                src="/src/assets/images/about_craftsmanship_1795006941756.jpg"
                alt="Precision copper and CPVC water pipeline manifold installation"
                fallbackTitle="Precision Pipeline Engineering"
                className="w-full h-full"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-4/3">
              <SafeImage
                src="/src/assets/images/sanitary_fittings_detail_1795006951220.jpg"
                alt="Clean luxury basin and champagne brass mixer installation"
                fallbackTitle="Sanitaryware Finishing"
                className="w-full h-full"
              />
            </div>
            <div className="rounded-2xl bg-[#081D2B] text-white p-6 flex flex-col justify-between border border-[#123B55]">
              <div>
                <p className="text-xs font-medium text-[#D9B978]">{t.about.legacyLabel}</p>
                <p className="mt-2 font-display font-bold text-2xl sm:text-3xl font-mono tabular-nums text-white">
                  {t.about.legacyYears}
                </p>
              </div>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">{t.about.legacyDesc}</p>
            </div>
          </motion.div>

          {/* Right Story & Commitments */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-sm font-semibold text-[#123B55]">{t.about.eyebrow}</p>
            <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#081D2B] text-balance">
              {t.about.heading}
            </h2>
            <p className="mt-5 text-base text-slate-600 leading-relaxed">
              {t.about.p1Start}{' '}
              <strong className="text-[#081D2B]">{t.about.p1Quote}</strong> {t.about.p1End}
            </p>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">{t.about.p2}</p>

            <div className="mt-8 space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] border border-slate-200 flex items-center justify-center shrink-0">
                  <Ruler className="w-5 h-5 text-[#123B55]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-[#081D2B]">
                    {t.about.highlights[0].title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-0.5">{t.about.highlights[0].desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] border border-slate-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#123B55]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-[#081D2B]">
                    {t.about.highlights[1].title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-0.5">{t.about.highlights[1].desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] border border-slate-200 flex items-center justify-center shrink-0">
                  <Handshake className="w-5 h-5 text-[#123B55]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-[#081D2B]">
                    {t.about.highlights[2].title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-0.5">{t.about.highlights[2].desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
