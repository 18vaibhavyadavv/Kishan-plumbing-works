import { motion, useReducedMotion } from 'motion/react';
import { Award, BadgeIndianRupee, Sparkles, FileCheck2, ShieldCheck, Handshake } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/plumbingData';
import { WHY_CHOOSE_HI } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';

function PillarIcon({ iconKey }: { iconKey: (typeof WHY_CHOOSE_ITEMS)[number]['iconKey'] }) {
  const cls = 'w-5 h-5 text-[#123B55] group-hover:text-[#081D2B] transition-colors';
  switch (iconKey) {
    case 'award':
      return <Award className={cls} aria-hidden="true" />;
    case 'badge':
      return <BadgeIndianRupee className={cls} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={cls} aria-hidden="true" />;
    case 'file':
      return <FileCheck2 className={cls} aria-hidden="true" />;
    case 'shield':
      return <ShieldCheck className={cls} aria-hidden="true" />;
    case 'handshake':
      return <Handshake className={cls} aria-hidden="true" />;
  }
}

export function WhyChooseSection() {
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#123B55]">{t.whyChoose.eyebrow}</p>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#081D2B] text-balance">
            {t.whyChoose.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">{t.whyChoose.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const hiItem = WHY_CHOOSE_HI[idx];
            const title = lang === 'hi' && hiItem ? hiItem.title : item.title;
            const description = lang === 'hi' && hiItem ? hiItem.description : item.description;

            return (
              <motion.div
                key={item.index}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.24, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl bg-[#F5F7FA] hover:bg-white border border-slate-200/90 hover:border-[#D9B978] hover:shadow-[0_14px_30px_-10px_rgba(8,29,43,0.12)] p-6 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tabular-nums text-slate-400 group-hover:text-[#123B55] transition-colors">
                    {item.index}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:bg-[#D9B978]/25 group-hover:border-[#D9B978] flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:-rotate-3">
                    <PillarIcon iconKey={item.iconKey} />
                  </div>
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-[#081D2B]">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
                <div
                  aria-hidden="true"
                  className="mt-4 h-[2px] w-8 group-hover:w-16 bg-[#D9B978] transition-all duration-300 rounded-full"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
