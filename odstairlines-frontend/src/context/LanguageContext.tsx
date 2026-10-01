import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Language, TranslationData } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationData;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('odst_lang');
      if (saved === 'ar' || saved === 'en' || saved === 'id') {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'ar'; // Default to Arabic (ar)
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('odst_lang', lang);
    } catch {
      // Ignore
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    document.title = 'ODST AIRLINES INDO INDONESIA';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (language === 'id') {
        metaDescription.setAttribute('content', 'ODST AIRLINES INDO INDONESIA — Lini usaha terbaru dari Manazil Al Mukhtara Group yang terkemuka dari Arab Saudi, siap mendefinisikan ulang perjalanan udara Haji dan Umrah.');
      } else if (language === 'ar') {
        metaDescription.setAttribute('content', 'أوديست إيرلاينز إندو إندونيسيا — أحدث قطاعات الأعمال التابعة لمجموعة منازل المختارة الرائدة بالمملكة العربية السعودية لخدمات رحلات الحج والعمرة.');
      } else {
        metaDescription.setAttribute('content', 'ODST AIRLINES INDO INDONESIA — The latest business venture from Saudi Arabia’s renowned Manazil Al Mukhtara Group, redefining Hajj and Umrah air travel.');
      }
    }
  }, [language]);

  const isRTL = language === 'ar';
  const t = TRANSLATIONS[language] || TRANSLATIONS.id;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
