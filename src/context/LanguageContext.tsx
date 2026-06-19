import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../locales/translations.ts';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('garderiehub_lang');
    return (saved === 'en' ? 'en' : 'fr');
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('garderiehub_lang', lang);
  };

  const t = (key: string): string => {
    const parts = key.split('.');
    let result: any = translations[language];
    for (const part of parts) {
      if (result && result[part] !== undefined) {
        result = result[part];
      } else {
        // Fallback to fr
        let fallback: any = translations['fr'];
        for (const p of parts) {
          if (fallback && fallback[p] !== undefined) {
            fallback = fallback[p];
          } else {
            fallback = key;
          }
        }
        return fallback;
      }
    }
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
