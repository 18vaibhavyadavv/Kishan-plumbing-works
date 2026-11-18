import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/plumbingData';
import { FAQ_ITEMS_HI } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  const items = lang === 'hi' ? FAQ_ITEMS_HI : FAQ_ITEMS;

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? '' : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-[#123B55]">{t.faq.eyebrow}</p>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#081D2B] text-balance">
            {t.faq.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">{t.faq.subtitle}</p>
        </div>

        <div className="mt-10 space-y-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl bg-white border transition-colors ${
                  isOpen ? 'border-[#123B55]/40 shadow-xs' : 'border-slate-200'
                }`}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#123B55] rounded-2xl"
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-[#081D2B]">
                    {item.question}
                  </span>
                  <motion.span
                    animate={prefersReducedMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-8 h-8 rounded-lg bg-[#F5F7FA] flex items-center justify-center shrink-0 text-[#123B55]"
                  >
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, height: 'auto' }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 mt-1 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
