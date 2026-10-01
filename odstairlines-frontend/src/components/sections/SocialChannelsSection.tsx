import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import windowBg from '../../assets/Window.jpeg';

export const SocialChannelsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Airplane Window View */}
      <div className="absolute inset-0 z-0">
        <img
          src={windowBg}
          alt="ODST Cabin Window Sky View"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Subtle Atmospheric Dark Blue Overlay */}
        <div className="absolute inset-0 bg-[#0B1536]/40 md:bg-[#0B1536]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A102E]/35 via-transparent to-[#0A102E]/45"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-16 sm:py-20 md:py-24 space-y-5 sm:space-y-6">
        <ScrollReveal animation="fade-up" duration={850} className="space-y-4 sm:space-y-5">
          {/* Pre-title Label with Line: "— Tetap Terhubung" */}
          <div className="inline-flex items-center justify-center gap-2.5 text-white/90 text-xs sm:text-sm font-normal font-noto-arabic">
            <span className="w-6 sm:w-8 h-[1.5px] bg-white/80 rounded-full"></span>
            <span>{t.social.label}</span>
          </div>

          {/* 2-Line Main Title */}
          <h2 className="font-noto-arabic font-normal text-2xl sm:text-3xl md:text-[38px] lg:text-[44px] xl:text-[48px] text-white leading-[1.3] drop-shadow-md px-2 max-w-3xl mx-auto text-balance">
            <span className="block">{t.social.titleLine1 || t.social.title}</span>
            {t.social.titleLine2 && (
              <span className="block mt-1 sm:mt-1.5">{t.social.titleLine2}</span>
            )}
          </h2>

          {/* Subtitle Description */}
          <p className="font-noto-arabic font-normal text-xs sm:text-sm md:text-[14.5px] text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm pt-0.5 text-balance">
            {t.social.description}
          </p>
        </ScrollReveal>

        {/* 3 Glass Pill Buttons matching screenshot */}
        <ScrollReveal animation="zoom-in" delay={150} duration={800} className="pt-2 sm:pt-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4" dir="ltr">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/odst.group/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-white/40 text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Follow ODST on Instagram"
            >
              <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-sans">Instagram</span>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-white/40 text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Follow ODST on X"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="font-sans">X</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/ODSTAirlines/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-white/40 text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Follow ODST on Facebook"
            >
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.615V8z" />
              </svg>
              <span className="font-sans">Facebook</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

