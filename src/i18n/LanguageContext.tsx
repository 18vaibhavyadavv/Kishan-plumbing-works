import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from '../utils/plumbing';
import { UI_COPY } from './translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (next: Language) => void;
  toggleLang: () => void;
  t: (typeof UI_COPY)[Language];
}

const STORAGE_KEY = 'kpw_lang';

function resolveInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  try {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang === 'hi' || paramLang === 'en') {
      return paramLang;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'hi' || stored === 'en') {
      return stored;
    }
  } catch {
    // Ignore storage read issues
  }

  return 'en';
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(resolveInitialLanguage);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write issues
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = UI_COPY[lang].docTitle;
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang,
    t: UI_COPY[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
