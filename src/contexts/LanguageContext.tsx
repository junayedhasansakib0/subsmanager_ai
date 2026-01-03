import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language, TranslationKeys } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Update HTML lang attribute for accessibility and font switching
    document.documentElement.lang = language;
    if (language === 'bn') {
      document.documentElement.classList.add('lang-bn');
    } else {
      document.documentElement.classList.remove('lang-bn');
    }
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
