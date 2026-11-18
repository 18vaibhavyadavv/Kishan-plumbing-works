import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_PILLARS, VERIFIED_LOCATIONS } from '../data/plumbingData';
import { EXPERIENCE_PILLARS_HI, VERIFIED_LOCATIONS_HI } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { CountUpNumber } from './CountUpNumber';

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  const pillars = lang === 'hi' ? EXPERIENCE_PILLARS_HI : EXPERIENCE_PILLARS;

  return (
    <section id="experience" className="py-16 sm:py-24 bg-[#081D2B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Experience Header & 48+ Counter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#D9B978]">{t.experience.eyebrow}</p>
            <div className="mt-3 flex items-baseline gap-3">
              <CountUpNumber
                target={48}
                suffix="+"
                className="text-5xl sm:text-6xl font-bold text-[#D9B978] tracking-tight"
              />
              <span className="font-display font-semibold text-xl sm:text-2xl text-white">
                {t.experience.yearsUnit}
              </span>
            </div>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight text-white text-balance">
              {t.experience.heading}
            </h2>
            <p className="mt-4 text-base text-white/75 leading-relaxed">{t.experience.subtitle}</p>
          </div>

          {/* 5 Core Experience Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl bg-[#123B55]/50 border border-white/10 p-5 ${
                  index === pillars.length - 1 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D9B978] shrink-0" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-base text-white">{pillar.title}</h3>
                </div>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Verified Work Locations in Kanpur Nagar */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#D9B978]">{t.experience.locationsEyebrow}</p>
              <h3 className="mt-1.5 font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
                {t.experience.locationsHeading}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/65">{t.experience.locationsSub}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VERIFIED_LOCATIONS.map((location, idx) => {
              const hiLoc = VERIFIED_LOCATIONS_HI[location.name];
              const name = lang === 'hi' && hiLoc ? hiLoc.name : location.name;
              const areaNote = lang === 'hi' && hiLoc ? hiLoc.areaNote : location.areaNote;
              const scope = lang === 'hi' && hiLoc ? hiLoc.scope : location.scope;

              return (
                <motion.div
                  key={location.name}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.22, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#D9B978]/50 p-5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <MapPin className="w-3.5 h-3.5 text-[#D9B978] shrink-0" aria-hidden="true" />
                      <span>{areaNote}</span>
                    </div>
                    <Building2 className="w-4 h-4 text-white/40 shrink-0" aria-hidden="true" />
                  </div>
                  <h4 className="mt-3 font-display font-bold text-lg text-white">{name}</h4>
                  <p className="mt-1.5 text-sm text-white/70">{scope}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
