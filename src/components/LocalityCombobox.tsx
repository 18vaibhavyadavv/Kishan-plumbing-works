import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, LocateFixed, Loader2, MapPin, Check, ExternalLink, RotateCcw } from 'lucide-react';
import { KANPUR_LOCALITIES } from '../data/plumbingData';
import { getLocalityDisplayLabel, LOCALITY_LABELS_HI } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import {
  filterLocalities,
  type GeolocationErrorReason,
  type LiveCoordinates,
} from '../utils/plumbing';

const QUICK_LOCALITIES = [
  'Swaroop Nagar',
  'Kakadeo',
  'Civil Lines',
  'Kalyanpur',
  'Kidwai Nagar',
  'Govind Nagar',
  'Other Kanpur Nagar Locality',
];

interface LocalityComboboxProps {
  value: string;
  onChange: (nextValue: string) => void;
  hasError?: boolean;
  isDetectingGps: boolean;
  detectedCoords: LiveCoordinates | null;
  gpsStatusText: string | null;
  gpsErrorText: string | null;
  gpsErrorReason: GeolocationErrorReason | null;
  onDetectLiveLocation: () => void;
}

export function LocalityCombobox({
  value,
  onChange,
  hasError = false,
  isDetectingGps,
  detectedCoords,
  gpsStatusText,
  gpsErrorText,
  gpsErrorReason,
  onDetectLiveLocation,
}: LocalityComboboxProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchMode, setSearchMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const inputId = 'enquiry-locality';
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  const filtered = searchMode
    ? filterLocalities(KANPUR_LOCALITIES, value, LOCALITY_LABELS_HI)
    : KANPUR_LOCALITIES;

  const isSpecialCanonical =
    value === 'Other Kanpur Nagar Locality' || value === 'Outside Kanpur Nagar';

  const inputDisplayValue =
    isSpecialCanonical && lang === 'hi' ? getLocalityDisplayLabel(value, 'hi') : value;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearchMode(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectOption = (option: string) => {
    onChange(option);
    setOpen(false);
    setSearchMode(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
      return;
    }

    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && filtered[activeIndex]) {
      e.preventDefault();
      selectOption(filtered[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setSearchMode(false);
      setActiveIndex(-1);
    }
  };

  const exactMatch = KANPUR_LOCALITIES.some(
    (item) => item.toLowerCase() === value.trim().toLowerCase()
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-[#081D2B]">
          {t.contact.localityLabel}
        </label>

        <button
          type="button"
          onClick={onDetectLiveLocation}
          disabled={isDetectingGps}
          aria-busy={isDetectingGps}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123B55] hover:text-[#081D2B] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#123B55] rounded px-1 py-0.5"
        >
          {isDetectingGps ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#123B55]" aria-hidden="true" />
              <span>{t.contact.fetchingGps}</span>
            </>
          ) : (
            <>
              <LocateFixed className="w-3.5 h-3.5 text-[#123B55]" aria-hidden="true" />
              <span>{t.contact.useLiveLocation}</span>
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          name="locality"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={
            open && activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined
          }
          value={inputDisplayValue}
          onFocus={() => {
            setOpen(true);
            setSearchMode(false);
          }}
          onChange={(e) => {
            onChange(e.target.value);
            setSearchMode(true);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder={t.contact.localityPlaceholder}
          autoComplete="off"
          className={`w-full min-h-[44px] pl-3.5 pr-10 py-2.5 rounded-xl bg-white border text-sm text-[#081D2B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123B55] ${
            hasError ? 'border-amber-600' : 'border-slate-300'
          }`}
        />

        <button
          type="button"
          aria-label={open ? t.contact.closeOptions : t.contact.showOptions}
          onClick={() => {
            setOpen((prev) => !prev);
            setSearchMode(false);
            inputRef.current?.focus();
          }}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-500 hover:text-[#081D2B] hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Live GPS feedback */}
      {gpsStatusText && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
          <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>
            {gpsStatusText}
            {detectedCoords
              ? ` (${detectedCoords.lat.toFixed(4)}°N, ${detectedCoords.lng.toFixed(4)}°E)`
              : ''}
          </span>
        </p>
      )}
      {gpsErrorText && (
        <div
          role="status"
          className="mt-2 rounded-xl bg-amber-50/90 border border-amber-200 p-3 text-xs text-amber-950 space-y-2.5"
        >
          <p className="font-medium leading-relaxed">{gpsErrorText}</p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onDetectLiveLocation}
              disabled={isDetectingGps}
              className="inline-flex items-center gap-1 rounded-lg bg-white border border-amber-300 px-2.5 py-1 text-[11px] font-semibold text-[#081D2B] hover:bg-amber-100/70 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>{t.contact.gpsRetryBtn}</span>
            </button>
            {gpsErrorReason === 'policy_blocked' && typeof window !== 'undefined' && (
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-[#081D2B] px-2.5 py-1 text-[11px] font-semibold text-[#D9B978] hover:bg-[#123B55] transition-colors"
              >
                <span>{t.contact.gpsOpenNewTab}</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </div>
          <div className="pt-1 border-t border-amber-200/80">
            <p className="text-[11px] font-semibold text-amber-900 mb-1.5">
              {t.contact.gpsQuickPickTitle}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_LOCALITIES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => selectOption(loc)}
                  className="rounded-lg bg-white border border-amber-200 hover:border-[#123B55] hover:bg-[#F5F7FA] px-2 py-1 text-[11px] font-medium text-[#081D2B] transition-colors cursor-pointer"
                >
                  {getLocalityDisplayLabel(loc, lang)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Searchable Dropdown Listbox */}
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label={t.contact.localityLabel}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl z-30 py-1.5"
          >
            {value.trim().length >= 2 && !exactMatch && !isSpecialCanonical && (
              <li role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => selectOption(value.trim())}
                  className="w-full text-left px-3.5 py-2.5 text-sm text-[#123B55] font-medium hover:bg-[#F5F7FA] flex items-center justify-between gap-2 border-b border-slate-100 cursor-pointer"
                >
                  <span>
                    {t.contact.useTypedLocality} “{value.trim()}”
                  </span>
                  <span className="text-xs text-slate-400">{t.contact.customTag}</span>
                </button>
              </li>
            )}

            {filtered.map((item, idx) => {
              const isSelected = value.trim().toLowerCase() === item.toLowerCase();
              const isActive = idx === activeIndex;
              const isOutside = item === 'Outside Kanpur Nagar';

              return (
                <li
                  key={item}
                  id={`${listboxId}-opt-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <button
                    type="button"
                    onClick={() => selectOption(item)}
                    className={`w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      isActive || isSelected
                        ? 'bg-[#081D2B] text-white'
                        : isOutside
                          ? 'text-amber-800 hover:bg-amber-50'
                          : 'text-[#081D2B] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    <span>{getLocalityDisplayLabel(item, lang)}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#D9B978] shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
