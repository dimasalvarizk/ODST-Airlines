import React from 'react';
import { Layers, Route, Plane } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const KeyFeaturesSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const icons = [Plane, Route, Layers];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Heading - Aligned to Start (Right in RTL, Left in LTR) */}
      <ScrollReveal animation="fade-up" duration={800} className="text-start max-w-3xl mb-12 sm:mb-16 space-y-3.5">
        {/* Pre-title Label with Line */}
        <div className="inline-flex items-center gap-2.5 text-[#E87729] text-xs sm:text-sm font-bold font-noto-arabic">
          <span className="w-7 sm:w-9 h-[2px] bg-[#E87729] rounded-full"></span>
          <span>{t.features.label}</span>
        </div>

        {/* Main Section Title */}
        <h2 className="font-noto-arabic font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#242E69] leading-[1.28] tracking-tight text-balance">
          {t.features.title}
        </h2>

        {/* Subtitle */}
        <p className="font-noto-arabic font-normal text-[#64748B] text-sm sm:text-base leading-relaxed max-w-xl text-balance">
          {t.features.subtitle}
        </p>
      </ScrollReveal>

      {/* 3 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {t.features.cards.map((card, idx) => {
          const Icon = icons[idx] || Layers;
          return (
            <ScrollReveal
              key={card.number}
              animation="fade-up"
              delay={idx * 150}
              duration={800}
              className="h-full"
            >
              <div
                className="p-6 sm:p-7 lg:p-8 xl:p-9 rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white border border-slate-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Card Header: Number & Icon */}
                <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-slate-100">
                  {isRTL ? (
                    <>
                      <div className="w-10 sm:w-11 lg:w-12 h-10 sm:h-11 lg:h-12 rounded-2xl bg-[#FFF7F0] border border-[#FFE8D6]/60 flex items-center justify-center text-[#E87729] shrink-0 shadow-sm shadow-[#E87729]/10">
                        <Icon className="w-5 h-5 text-[#E87729]" />
                      </div>
                      <span className="font-sans font-medium text-xs sm:text-sm text-slate-400">
                        {card.number}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-sans font-medium text-xs sm:text-sm text-slate-400">
                        {card.number}
                      </span>
                      <div className="w-10 sm:w-11 lg:w-12 h-10 sm:h-11 lg:h-12 rounded-2xl bg-[#FFF7F0] border border-[#FFE8D6]/60 flex items-center justify-center text-[#E87729] shrink-0 shadow-sm shadow-[#E87729]/10">
                        <Icon className="w-5 h-5 text-[#E87729]" />
                      </div>
                    </>
                  )}
                </div>

                {/* Card Body */}
                <div className="pt-5 sm:pt-6 space-y-2.5 sm:space-y-3 text-start flex-1 flex flex-col justify-start">
                  <h3 className="font-noto-arabic font-normal text-lg sm:text-xl lg:text-[22px] text-[#242E69] leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-noto-arabic font-normal text-xs sm:text-sm lg:text-[14.5px] text-[#64748B] leading-[1.75] pt-0.5 text-justify">
                    {card.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
