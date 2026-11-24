import { createContext, useContext, useEffect, useState } from 'react';
import translations from '../data/translations.js';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'wedding-language';

function readSavedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'te' || saved === 'en' ? saved : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSavedLanguage);

  useEffect(() => {
    document.documentElement.lang = lang === 'te' ? 'te' : 'en';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private browsing: ignore */
    }
  }, [lang]);

  const value = {
    lang,
    t: translations[lang],
    toggleLang: () => setLang((l) => (l === 'en' ? 'te' : 'en')),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
