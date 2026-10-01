import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import pilgrimageImg from '../../assets/Pilgrimage.png';
import ruteheroImg from '../../assets/rutehero.png';

export const HajjUmrahSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="hajj-umrah" className="bg-[#FAF5EF] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 xl:gap-20">
          {/* Right Column in RTL: Pilgrimage Image Frame matching screenshot */}
          <ScrollReveal animation="zoom-in" duration={850} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl border border-slate-200/60 max-w-lg lg:max-w-none w-full hover:scale-[1.01] transition-transform duration-500">
              <img
                src={pilgrimageImg}
                alt="ODST Hajj & Umrah Pilgrims"
                className="w-full h-auto object-cover select-none block"
              />
            </div>
          </ScrollReveal>

          {/* Left Column in RTL: Text Copy & Route Graphic */}
          <ScrollReveal animation="fade-up" delay={150} duration={850} className="w-full lg:w-1/2 space-y-6 text-start">
            {/* Pre-title Label with Line: "— رحلات ذات معنى" */}
            <div className="inline-flex items-center gap-2.5 text-[#E87729] text-xs sm:text-sm font-bold font-noto-arabic">
              <span className="w-7 sm:w-9 h-[2px] bg-[#E87729] rounded-full"></span>
              <span>{t.pilgrimage.label}</span>
            </div>

            {/* Main 2-Line Heading with Noto Sans Arabic Font */}
            <h2 className="font-noto-arabic font-normal text-2xl sm:text-3xl md:text-[36px] lg:text-[44px] xl:text-[48px] text-[#242E69] leading-[1.35] sm:leading-[1.4] tracking-tight text-balance">
              <span className="block">
                {t.pilgrimage.titleLine1 || t.pilgrimage.title}
              </span>
              {t.pilgrimage.titleLine2 && (
                <span className="block mt-1.5 sm:mt-2 md:mt-2.5">
                  {t.pilgrimage.titleLine2}
                </span>
              )}
            </h2>

            {/* Description Paragraph with Noto Sans Arabic */}
            <p className="font-noto-arabic font-normal text-sm sm:text-base md:text-[15.5px] text-[#64748B] leading-[1.8] max-w-xl text-justify">
              {t.pilgrimage.description}
            </p>

            {/* Route flight path graphic */}
            <div className="pt-2">
              <img
                src={ruteheroImg}
                alt="Flight Route"
                className="h-3.5 sm:h-4 md:h-4.5 object-contain"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
