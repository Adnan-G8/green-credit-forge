import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language, type TranslationKey } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('it');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('fagri-lang') as Language;
    if (stored && translations[stored]) {
      setLanguage(stored);
    } else {
      // Ensure Italian is set as default if no stored language
      setLanguage('it');
      localStorage.setItem('fagri-lang', 'it');
    }
    setIsInitialized(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    console.log('Switching language to:', lang); // Debug log
    setLanguage(lang);
    localStorage.setItem('fagri-lang', lang);
    document.documentElement.lang = lang;
    // Force a small delay to ensure state update
    setTimeout(() => {
      console.log('Language state updated to:', lang); // Debug log
    }, 100);
  };

  const t = (key: string): string => {
    if (!isInitialized) {
      // Return Italian translation while initializing
      return (translations['it'] as any)[key] || key;
    }
    const translation = (translations[language] as any)?.[key] || (translations['it'] as any)[key] || key;
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
