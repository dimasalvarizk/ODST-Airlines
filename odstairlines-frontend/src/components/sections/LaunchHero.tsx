import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import heroBg from '../../assets/hero.jpg';
import ruteHero from '../../assets/rutehero.png';

interface LaunchHeroProps {
  onExploreVision?: () => void;
  onFollowNews?: () => void;
}

export const LaunchHero: React.FC<LaunchHeroProps> = ({ onExploreVision, onFollowNews }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="w-full px-1.5 sm:px-2.5 md:px-3 lg:px-3.5 pt-1.5 sm:pt-2 pb-1.5 sm:pb-2 max-w-full mx-auto">
      {/* Outer Hero Card - Viewport-Aware Responsive Height for Laptop, Tablet & Mobile */}
      <section
        id="home"
        className="relative rounded-[20px] sm:rounded-[28px] md:rounded-[36px] lg:rounded-[40px] overflow-hidden min-h-[540px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[700px] h-auto lg:h-[calc(100dvh-1rem)] max-h-none lg:max-h-[920px] 2xl:max-h-[980px] flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-2xl border border-white/20 transition-all duration-300 pt-20 sm:pt-24 md:pt-28 lg:pt-36 xl:pt-40 pb-6 sm:pb-8"
      >
        {/* Real Aircraft Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="ODST Airlines Aircraft on Tarmac"
            className="w-full h-full object-cover object-[center_38%] sm:object-[center_40%] select-none scale-100"
          />
          {/* Subtle Image Veil (~25% uniform overlay) */}
          <div className="absolute inset-0 bg-[#0E1535]/25"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A102E]/30 via-transparent to-[#0A102E]/30"></div>
        </div>

        {/* HERO CENTER CONTENT */}
        <ScrollReveal
          animation="fade-up"
          duration={900}
          className="relative z-10 my-auto py-3 sm:py-5 md:py-6 lg:py-8 text-center max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto space-y-3 sm:space-y-4 md:space-y-4.5 xl:space-y-5 px-2 sm:px-4"
        >
          {/* Section Pre-title */}
          <div className="inline-flex items-center justify-center">
            <span className="text-xs sm:text-xs md:text-sm font-bold text-[#E87729] tracking-widest uppercase font-arabic">
              {t.hero.label}
            </span>
          </div>

          {/* Big Headline - Scaled proportionally for all screen widths */}
          <h1 className="font-kufam font-black text-2xl sm:text-3xl md:text-[34px] lg:text-[42px] xl:text-[48px] 2xl:text-[54px] text-white leading-[1.32] md:leading-[1.28] drop-shadow-md text-balance">
            <span className="block">
              {t.hero.headlinePre}
              <span className="text-[#E87729] inline-block font-black mx-1">{t.hero.headlineHighlight}</span>
              {t.hero.headlineLine1End || t.hero.headlinePost}
            </span>
            {t.hero.headlineLine2 && (
              <span className="block mt-1 sm:mt-1.5 md:mt-2 text-white">
                {t.hero.headlineLine2}
              </span>
            )}
          </h1>

          {/* Subtitle Paragraph */}
          <p className="font-noto-arabic text-white/95 text-xs sm:text-sm md:text-base lg:text-[16.5px] font-normal sm:font-medium max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed drop-shadow-md px-2 text-balance">
            {t.hero.intro}
          </p>

          {/* Hero Action Buttons */}
          <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4 w-full sm:w-auto">
            {/* Solid Orange Primary Button */}
            <button
              onClick={onExploreVision}
              className="w-full sm:w-auto justify-center px-6 sm:px-7 md:px-8 xl:px-9 py-2.5 sm:py-3 md:py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#E87729] hover:bg-[#D5681E] shadow-xl shadow-[#E87729]/35 flex items-center gap-2 sm:gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{t.hero.actionExplore}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4 text-white shrink-0" /> : <ArrowRight className="w-4 h-4 text-white shrink-0" />}
            </button>

            {/* White Secondary Button */}
            <button
              onClick={onFollowNews}
              className="w-full sm:w-auto justify-center px-6 sm:px-7 md:px-8 xl:px-9 py-2.5 sm:py-3 md:py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#242E69] bg-white hover:bg-slate-100 shadow-xl flex items-center gap-2 sm:gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{t.hero.actionNews}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4 text-[#242E69] shrink-0" /> : <ArrowRight className="w-4 h-4 text-[#242E69] shrink-0" />}
            </button>
          </div>
        </ScrollReveal>

        {/* HERO BOTTOM FLIGHT PATH MOTIF */}
        <div className="relative bottom-0 left-0 z-10 pointer-events-none pt-2 sm:pt-3 md:pt-4">
          <img
            src={ruteHero}
            alt="ODST Flight Route"
            className="h-3 sm:h-3.5 md:h-4 lg:h-4.5 xl:h-5 w-auto object-contain select-none drop-shadow-sm"
          />
        </div>
      </section>
    </div>
  );
};
