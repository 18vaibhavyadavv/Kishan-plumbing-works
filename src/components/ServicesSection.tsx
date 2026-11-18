import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Home,
  Bath,
  UtensilsCrossed,
  Pipette,
  Droplets,
  Building2,
  Briefcase,
  HardHat,
  Wrench,
  MessageCircle,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { SERVICES, type PlumbingService, type ServiceCategory } from '../data/plumbingData';
import { SERVICE_CATEGORY_LABELS, SERVICES_HI } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { buildServiceWhatsAppUrl } from '../utils/plumbing';

const CATEGORIES: ServiceCategory[] = [
  'All',
  'Residential',
  'Commercial & Multi-Unit',
  'Pipelines & Repairs',
];

function ServiceIcon({ iconKey }: { iconKey: PlumbingService['iconKey'] }) {
  const cls = 'w-5 h-5 text-[#123B55] group-hover:text-[#081D2B] transition-colors';
  switch (iconKey) {
    case 'home':
      return <Home className={cls} aria-hidden="true" />;
    case 'bath':
      return <Bath className={cls} aria-hidden="true" />;
    case 'kitchen':
      return <UtensilsCrossed className={cls} aria-hidden="true" />;
    case 'pipeline':
      return <Pipette className={cls} aria-hidden="true" />;
    case 'sanitary':
      return <Droplets className={cls} aria-hidden="true" />;
    case 'apartment':
      return <Building2 className={cls} aria-hidden="true" />;
    case 'commercial':
      return <Briefcase className={cls} aria-hidden="true" />;
    case 'construction':
      return <HardHat className={cls} aria-hidden="true" />;
    case 'repair':
      return <Wrench className={cls} aria-hidden="true" />;
  }
}

function ServiceCard({
  service,
  index,
  isSelected,
  onSelectServiceForQuote,
}: {
  service: PlumbingService;
  index: number;
  isSelected: boolean;
  onSelectServiceForQuote: (serviceId: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });

  const hiCopy = SERVICES_HI[service.id];
  const displayTitle = lang === 'hi' && hiCopy ? hiCopy.title : service.title;
  const displaySummary = lang === 'hi' && hiCopy ? hiCopy.summary : service.summary;
  const displayDeliverables =
    lang === 'hi' && hiCopy ? hiCopy.deliverables : service.deliverables;
  const displayCategory = SERVICE_CATEGORY_LABELS[lang][service.category];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, visible: false }));
  };

  return (
    <motion.article
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
      transition={{
        duration: 0.25,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden flex flex-col justify-between rounded-2xl bg-white p-6 transition-all duration-200 ${
        isSelected
          ? 'border-2 border-[#D9B978] shadow-[0_14px_30px_-10px_rgba(217,185,120,0.35)]'
          : 'border border-slate-200 hover:border-[#D9B978] hover:shadow-[0_16px_36px_-12px_rgba(8,29,43,0.14)]'
      }`}
    >
      {/* Subtle Desktop Cursor Spotlight */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spotlight.visible ? 1 : 0,
            background: `radial-gradient(340px circle at ${spotlight.x}% ${spotlight.y}%, rgba(217, 185, 120, 0.11), transparent 65%)`,
          }}
        />
      )}

      <div className="relative z-10">
        {/* Clean unboxed editorial metadata */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono font-semibold tabular-nums text-[#123B55]">
              {service.index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{displayCategory}</span>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] group-hover:bg-[#D9B978]/25 border border-slate-200/80 group-hover:border-[#D9B978] flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 shrink-0">
            <ServiceIcon iconKey={service.iconKey} />
          </div>
        </div>

        <h3 className="mt-4 font-display font-bold text-xl text-[#081D2B] tracking-tight">
          {displayTitle}
        </h3>

        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{displaySummary}</p>

        <ul className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
          {displayDeliverables.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-[#123B55] shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upgraded Card Interactive Buttons */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
        <motion.a
          whileHover={prefersReducedMotion ? undefined : { y: -1 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          href={buildServiceWhatsAppUrl(displayTitle, lang)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.services.whatsappBtn} - ${displayTitle}`}
          className="btn-sheen-trigger relative overflow-hidden flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-gradient-to-b from-[#0C293D] to-[#081D2B] hover:from-[#123B55] hover:to-[#0C293D] text-white font-display font-semibold text-xs sm:text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_14px_-4px_rgba(8,29,43,0.35)] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#123B55]"
        >
          {!prefersReducedMotion && (
            <span
              aria-hidden="true"
              className="btn-sheen-layer pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          )}
          <MessageCircle
            className="w-4 h-4 text-[#D9B978] shrink-0 relative z-10"
            aria-hidden="true"
          />
          <span className="relative z-10">{t.services.whatsappBtn}</span>
        </motion.a>

        <motion.button
          type="button"
          whileHover={prefersReducedMotion ? undefined : { y: -1 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          onClick={() => onSelectServiceForQuote(service.id)}
          aria-label={`${t.services.quoteBtn} - ${displayTitle}`}
          className={`inline-flex items-center justify-center gap-1 min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#123B55] ${
            isSelected
              ? 'bg-[#D9B978] border-[#C8A55F] text-[#081D2B] shadow-xs'
              : 'bg-[#F5F7FA] border-slate-200 text-[#081D2B] hover:border-[#D9B978] hover:bg-[#D9B978]/15'
          }`}
        >
          <span>{isSelected ? t.services.selectedBtn : t.services.quoteBtn}</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        </motion.button>
      </div>
    </motion.article>
  );
}

interface ServicesSectionProps {
  selectedServiceId: string;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export function ServicesSection({
  selectedServiceId,
  onSelectServiceForQuote,
}: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  const visibleServices =
    activeCategory === 'All'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeCategory);

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#123B55]">{t.services.eyebrow}</p>
            <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#081D2B] text-balance">
              {t.services.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600">{t.services.subtitle}</p>
          </div>

          {/* Interactive Sliding Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter plumbing services by category"
            className="flex flex-wrap items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-xs self-start lg:self-end"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#123B55] ${
                    active ? 'text-white' : 'text-slate-600 hover:text-[#081D2B]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeServiceTab"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 32 }
                      }
                      aria-hidden="true"
                      className="absolute inset-0 rounded-lg bg-[#081D2B] shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{SERVICE_CATEGORY_LABELS[lang][category]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isSelected={selectedServiceId === service.id}
              onSelectServiceForQuote={onSelectServiceForQuote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
