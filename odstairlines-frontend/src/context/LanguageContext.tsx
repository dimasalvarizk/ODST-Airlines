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

    if (language === 'id') {
      document.title = 'ODST Airlines Indonesia — Penerbangan Modern Indonesia & Arab Saudi';
    } else if (language === 'ar') {
      document.title = 'أوديست إيرلاينز إندو — طيران حديث يربط إندونيسيا بالمملكة العربية السعودية';
    } else {
      document.title = 'ODST Airlines Indonesia — Modern Flights Connecting Indonesia & Saudi Arabia';
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (language === 'id') {
        metaDescription.setAttribute('content', 'ODST Airlines Indonesia — Visi penerbangan modern yang menghubungkan Indonesia dan Kerajaan Arab Saudi. Dedikasi khusus kenyamanan perjalanan Haji & Umrah.');
      } else if (language === 'ar') {
        metaDescription.setAttribute('content', 'أوديست إيرلاينز إندونيسيا — رؤية طيران حديثة تقرّب المسافات بين إندونيسيا والمملكة العربية السعودية، مع عناية خاصة برحلات الحج والعمرة.');
      } else {
        metaDescription.setAttribute('content', 'ODST Airlines Indonesia — A modern aviation vision bridging Indonesia and Saudi Arabia with dedicated care for Hajj & Umrah journeys.');
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
