import React, { useState, useEffect } from 'react';
import { Menu, X, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import odstLogo from '../../assets/LogoOdst.png';
import languageIcon from '../../assets/Language.png';
import type { Language } from '../../data/translations';

// Crisp vector SVG flags that render consistently across all OS (Windows, Mac, iOS, Android)
const SaudiFlag: React.FC = () => (
  <svg className="w-5 h-3.5 rounded-[3px] shadow-sm shrink-0" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="20" fill="#006C35" rx="2" />
    <path d="M8 13h14M8 13l2-1.5M8 13l2 1.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <text x="15" y="9.5" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold" fontFamily="sans-serif">لا إله إلا الله</text>
  </svg>
);

const UKFlag: React.FC = () => (
  <svg className="w-5 h-3.5 rounded-[3px] shadow-sm shrink-0" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="uk-flag-clip"><rect width="60" height="30" rx="2" /></clipPath>
    <g clipPath="url(#uk-flag-clip)">
      <path d="M0 0h60v30H0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const IndonesiaFlag: React.FC = () => (
  <svg className="w-5 h-3.5 rounded-[3px] shadow-sm shrink-0" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="id-flag-clip"><rect width="30" height="20" rx="2" /></clipPath>
    <g clipPath="url(#id-flag-clip)">
      <rect width="30" height="10" fill="#CE1126" />
      <rect y="10" width="30" height="10" fill="#FFFFFF" />
      <rect width="30" height="20" stroke="#CBD5E1" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
);

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Strip hash from browser address bar immediately if one exists
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string; flag: React.ReactNode }[] = [
    { code: 'ar', label: 'العربية (AR)', flag: <SaudiFlag /> },
    { code: 'en', label: 'English (EN)', flag: <UKFlag /> },
    { code: 'id', label: 'Indonesia (ID)', flag: <IndonesiaFlag /> },
  ];

  const navItems = [
    { label: t.nav.home, targetId: 'home' },
    { label: t.nav.about, targetId: 'about' },
    { label: t.nav.services, targetId: 'services' },
    { label: t.nav.booking, targetId: 'booking-info' },
    { label: t.nav.contact, targetId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Clean hash from address bar completely
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const elem = document.getElementById(targetId);
    if (elem) {
      const navOffset = 80;
      const elemPos = elem.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elemPos - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-noto-arabic ${
        isScrolled
          ? 'bg-[#131B45]/92 backdrop-blur-xl shadow-2xl py-3 sm:py-3.5'
          : 'bg-transparent pt-6 sm:pt-8 md:pt-9 lg:pt-10 pb-3 sm:pb-4'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-14 flex items-center justify-between relative">
        {/* 1. Brand Logo (Start Side) */}
        <div className="flex items-center shrink-0 z-10">
          <button
            onClick={(e) => handleNavClick(e, 'home')}
            className="inline-flex items-center group cursor-pointer"
            aria-label="ODST Airlines Home"
          >
            <img
              src={odstLogo}
              alt="ODST Airlines Logo"
              className="h-10 sm:h-12 md:h-13 lg:h-14 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
            />
          </button>
        </div>

        {/* 2. Desktop Navigation Links (Tepat di Tengah / Centered in the middle) */}
        <nav className="hidden lg:flex items-center justify-center gap-6 lg:gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2 font-noto-arabic pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className="text-white hover:text-[#E87729] text-sm lg:text-[15px] font-medium tracking-wide transition-colors drop-shadow-sm whitespace-nowrap cursor-pointer font-noto-arabic"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 3. Language Switcher Pill & Mobile Drawer Toggle (End Side) */}
        <div className="flex items-center gap-3 shrink-0 z-10">
          <div className="relative font-noto-arabic">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              dir="ltr"
              className="flex flex-row items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white hover:bg-slate-50 text-[#1E285F] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 font-sans cursor-pointer"
              aria-label="Switch Language"
            >
              <img
                src={languageIcon}
                alt="Language"
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain select-none shrink-0"
              />
              <span className="font-bold tracking-wide text-[#1E285F]">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Language Selector Popover with solid white card & crisp contrast */}
            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div
                  className={`absolute top-full mt-3 w-52 sm:w-56 rounded-2xl bg-white text-[#242E69] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 font-noto-arabic ${
                    isRTL ? 'left-0' : 'right-0'
                  }`}
                >
                  <div className="space-y-1">
                    {languages.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm rounded-xl transition-all cursor-pointer font-bold ${
                          language === item.code
                            ? 'bg-[#FFF4EC] text-[#E87729] font-extrabold shadow-sm'
                            : 'text-[#242E69] hover:bg-slate-100/90 font-semibold'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {item.flag}
                          <span className="text-[13px] sm:text-sm">{item.label}</span>
                        </span>
                        {language === item.code && (
                          <Check className="w-4 h-4 text-[#E87729] shrink-0 stroke-[2.5]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile & Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 z-50 bg-[#131B45]/98 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-2xl animate-in slide-in-from-top-3 space-y-5 font-noto-arabic">
          <div className="flex flex-col space-y-3 font-noto-arabic text-start">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className="text-white text-base font-bold py-2.5 px-3 rounded-xl hover:bg-white/10 hover:text-[#E87729] transition-all font-noto-arabic text-start cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <div className="pt-4 border-t border-white/15">
            <span className="block text-xs font-medium text-white/70 mb-2.5 text-start font-noto-arabic">
              {language === 'ar' ? 'اختر اللغة' : language === 'en' ? 'Select Language' : 'Pilih Bahasa'}
            </span>
            <div className="grid grid-cols-3 gap-2" dir="ltr">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    language === item.code
                      ? 'bg-[#E87729] text-white shadow-md'
                      : 'bg-white/10 text-white/90 hover:bg-white/20'
                  }`}
                >
                  {item.flag}
                  <span>{item.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
