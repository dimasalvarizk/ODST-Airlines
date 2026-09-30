import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import odstLogo from '../../assets/LogoOdst.png';

export interface FooterSectionProps {
  currentPage?: 'landing' | 'contact';
  onNavigate?: (page: 'landing' | 'contact' | 'admin', sectionId?: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ currentPage = 'landing', onNavigate }) => {
  const { t } = useLanguage();

  const handleInternalNav = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('http')) {
      return;
    }
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    const targetId = href.replace('#', '');
    if (targetId === 'about') {
      window.location.href = 'https://odst.id';
      return;
    }
    if (targetId === 'admin') {
      if (onNavigate) {
        onNavigate('admin');
      } else {
        window.history.pushState(null, '', '/admin');
      }
      return;
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

  return (
    <footer id="contact" className="bg-[#242E69] text-white pt-16 sm:pt-20 pb-12 sm:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" duration={800}>
          {/* Main Footer Row */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
            {/* Right Column in RTL: Brand Logo & Text */}
            <div className="w-full lg:w-5/12 space-y-4 sm:space-y-5 text-start">
              <button
                onClick={(e) => handleInternalNav(e, '#home')}
                className="inline-block group cursor-pointer"
                aria-label="ODST Airlines"
              >
                <img
                  src={odstLogo}
                  alt="ODST Airlines"
                  className="h-13 sm:h-15 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </button>

              {/* 2-Line About Text */}
              <div className="font-noto-arabic font-normal text-white/90 text-sm sm:text-[15px] leading-[1.75] max-w-md space-y-0.5">
                {t.footer.aboutLine1 ? (
                  <>
                    <p className="whitespace-normal">{t.footer.aboutLine1}</p>
                    <p className="whitespace-normal">{t.footer.aboutLine2}</p>
                  </>
                ) : (
                  <p>{t.footer.aboutText}</p>
                )}
              </div>

              {/* Subtext */}
              <p className="font-noto-arabic font-normal text-xs sm:text-sm text-white/80 pt-1">
                {t.footer.availability}
              </p>
            </div>

            {/* Left Columns in RTL: 3 Navigation Lists */}
            <div className="w-full lg:w-6/12 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-start">
              {/* Column 1: ODST / أوديست */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-noto-arabic font-normal text-sm sm:text-base text-white tracking-wide">
                  {t.footer.companyTitle}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-300 font-noto-arabic font-normal">
                  {t.footer.companyLinks.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('http') ? (
                        <a
                          href={link.href}
                          className="hover:text-white transition-colors block text-start cursor-pointer font-noto-arabic"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleInternalNav(e, link.href)}
                          className="hover:text-white transition-colors block text-start cursor-pointer font-noto-arabic"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Journey / الرحلة */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-noto-arabic font-normal text-sm sm:text-base text-white tracking-wide">
                  {t.footer.journeyTitle}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-300 font-noto-arabic font-normal">
                  {t.footer.journeyLinks.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={(e) => handleInternalNav(e, link.href)}
                        className="hover:text-white transition-colors block text-start cursor-pointer font-noto-arabic"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Connect / تواصل */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-noto-arabic font-normal text-sm sm:text-base text-white tracking-wide">
                  {t.footer.contactTitle}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-300 font-noto-arabic font-normal">
                  {t.footer.contactLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition-colors block cursor-pointer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Baseline Bar */}
          <div className="pt-10 sm:pt-14 mt-12 sm:mt-16 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
            {/* Copyright Note (Renders on Right in RTL) */}
            <p className="font-noto-arabic font-normal text-white/70">
              {t.footer.rights}
            </p>

            {/* Flight Route Indicator (Renders on Left in RTL) */}
            <span className="font-sans font-medium tracking-widest text-white/90">
              INDONESIA ↔ SAUDI ARABIA
            </span>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
