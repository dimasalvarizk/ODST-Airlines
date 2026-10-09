import React, { useState, useEffect } from 'react';
import { Menu, X, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import odstLogo from '../../assets/LogoOdst.png';
import languageIcon from '../../assets/Language.png';
import type { Language } from '../../data/translations';
import { IndonesiaFlag, UKFlag, SaudiFlag } from '../common/Flags';

export interface NavbarProps {
  currentPage?: 'landing' | 'contact';
  onNavigate?: (page: 'landing' | 'contact' | 'admin', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = 'landing', onNavigate }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'services' | 'booking-info' | 'contact' | null>('home');

  const langDropdownRef = React.useRef<HTMLDivElement>(null);

  // Scroll listener for sticky background & active section highlighting
  useEffect(() => {
    // Strip hash from browser address bar immediately if one exists
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentPage !== 'landing') {
        setActiveSection(currentPage === 'contact' ? 'contact' : null);
        return;
      }

      const scrollY = window.scrollY;
      if (scrollY < 180) {
        setActiveSection('home');
        return;
      }

      const bookingElem = document.getElementById('booking-info');
      const servicesElem = document.getElementById('services');

      if (bookingElem) {
        const rect = bookingElem.getBoundingClientRect();
        if (rect.top <= 320) {
          setActiveSection('booking-info');
          return;
        }
      }

      if (servicesElem) {
        const rect = servicesElem.getBoundingClientRect();
        if (rect.top <= 320) {
          setActiveSection('services');
          return;
        }
      }

      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(() => {
    if (!langDropdownOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [langDropdownOpen]);

  const languages: { code: Language; label: string; flag: React.ReactNode }[] = [
    { code: 'ar', label: 'العربية (AR)', flag: <SaudiFlag /> },
    { code: 'en', label: 'English (EN)', flag: <UKFlag /> },
    { code: 'id', label: 'Indonesia (ID)', flag: <IndonesiaFlag /> },
  ];

  const navItems = [
    { label: t.nav.home, targetId: 'home' },
    { label: t.nav.about, targetId: 'about', href: 'https://odst.id' },
    { label: t.nav.services, targetId: 'services' },
    { label: t.nav.booking, targetId: 'booking-info' },
    { label: t.nav.contact, targetId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string, href?: string) => {
    if (href || targetId === 'about') {
      window.location.href = href || 'https://odst.id';
      return;
    }

    e.preventDefault();
    setMobileMenuOpen(false);

    // Clean hash from address bar completely
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    if (targetId === 'contact') {
      if (onNavigate) {
        onNavigate('contact');
      } else {
        window.history.pushState(null, '', '/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (currentPage === 'contact') {
      if (onNavigate) {
        onNavigate('landing', targetId);
      } else {
        window.history.pushState(null, '', '/');
      }
      return;
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

  const renderLink = (item: (typeof navItems)[0], isMobile = false) => {
    const isActive =
      (item.targetId === 'contact' && currentPage === 'contact') ||
      (currentPage === 'landing' && activeSection === item.targetId);

    const baseClasses = isMobile
      ? `font-normal text-base py-2.5 px-3 rounded-xl transition-colors duration-200 text-start w-full bg-transparent border-none cursor-pointer flex items-center justify-between ${
          isActive ? 'text-[#e27435] font-medium bg-white/10' : 'text-white/85 hover:text-[#e27435]'
        }`
      : `font-normal text-sm lg:text-[15px] transition-colors duration-200 relative group py-1 bg-transparent border-none cursor-pointer whitespace-nowrap font-noto-arabic ${
          isActive ? 'text-[#e27435] font-medium' : 'text-white/80 hover:text-white'
        }`;

    const underlineBar = !isMobile && (
      <span
        className={`absolute bottom-[-4px] start-0 h-0.5 bg-[#e27435] transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    );

    if (item.href) {
      return (
        <a
          key={item.label}
          href={item.href}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={baseClasses}
        >
          {item.label}
          {underlineBar}
        </a>
      );
    }

    return (
      <button
        key={item.label}
        type="button"
        onClick={(e) => handleNavClick(e, item.targetId)}
        className={baseClasses}
      >
        {item.label}
        {underlineBar}
      </button>
    );
  };

  return (
    <nav
      className={`fixed top-0 start-0 w-full z-50 transition-all duration-300 font-noto-arabic ${
        isScrolled
          ? 'bg-[#050c1e]/85 backdrop-blur-md shadow-lg py-3 sm:py-3.5'
          : 'bg-transparent py-5 sm:py-6 md:pt-7 md:pb-5'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 flex items-center justify-between relative">
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
              className="h-9 sm:h-11 md:h-12 lg:h-14 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
            />
          </button>
        </div>

        {/* 2. Desktop Navigation Links (Centered in the middle with active indicator underline) */}
        <div className="hidden lg:flex items-center justify-center gap-6 lg:gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2 font-noto-arabic pointer-events-auto">
          {navItems.map((item) => renderLink(item, false))}
        </div>

        {/* 3. Language Switcher Pill & Mobile Drawer Toggle (End Side) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 z-10">
          <div ref={langDropdownRef} className="relative font-noto-arabic z-30">
            <button
              type="button"
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              dir="ltr"
              className="flex flex-row items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white hover:bg-slate-50 text-[#1e2b58] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 font-sans cursor-pointer"
              aria-label="Switch Language"
            >
              <img
                src={languageIcon}
                alt="Language"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5 object-contain select-none shrink-0 pointer-events-none"
              />
              <span className="font-bold tracking-wide text-[#1e2b58] pointer-events-none">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Language Selector Popover with solid white card & crisp contrast */}
            {langDropdownOpen && (
              <div
                className={`absolute top-full mt-3 w-48 sm:w-56 rounded-2xl bg-white text-[#1e2b58] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 font-noto-arabic ${
                  isRTL ? 'left-0' : 'right-0'
                }`}
              >
                <div className="space-y-1">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLanguage(item.code);
                        setLangDropdownOpen(false);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm rounded-xl transition-all cursor-pointer font-bold ${
                        language === item.code
                          ? 'bg-[#FFF4EC] text-[#e27435] font-extrabold shadow-sm'
                          : 'text-[#1e2b58] hover:bg-slate-100/90 font-semibold'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 pointer-events-none">
                        {item.flag}
                        <span className="text-xs sm:text-sm">{item.label}</span>
                      </span>
                      {language === item.code && (
                        <Check className="w-4 h-4 text-[#e27435] shrink-0 stroke-[2.5] pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
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

      {/* Mobile & Tablet Navigation Drawer Panel */}
      <div
        className={`lg:hidden absolute top-full start-0 w-full bg-[#1e2b58] border-t border-white/10 shadow-xl transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col py-4 px-6 space-y-4 font-noto-arabic">
          <div className="flex flex-col space-y-1 font-noto-arabic">
            {navItems.map((item) => renderLink(item, true))}
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
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    language === item.code
                      ? 'bg-[#e27435] text-white shadow-md'
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
      </div>
    </nav>
  );
};

