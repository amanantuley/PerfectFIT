
'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { translations } from '@/lib/translations';

export type Language = 'en' | 'hi' | 'mr' | 'ur';

type TranslationKey = keyof typeof translations['en'];

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey | string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: TranslationKey | string): string => {
    const typedKey = key as TranslationKey;
    return translations[language][typedKey] || translations['en'][typedKey] || key;
  }, [language]);


  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
