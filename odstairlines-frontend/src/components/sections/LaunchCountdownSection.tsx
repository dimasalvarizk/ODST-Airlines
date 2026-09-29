import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';

interface LaunchCountdownSectionProps {
  onNotifyMe?: () => void;
}

export const LaunchCountdownSection: React.FC<LaunchCountdownSectionProps> = () => {
  const { t } = useLanguage();

  const timeUnits = [
    { label: t.countdown.days },
    { label: t.countdown.hours },
    { label: t.countdown.minutes },
    { label: t.countdown.seconds },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#242E69] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Heading */}
        <ScrollReveal animation="fade-up" duration={800} className="max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          {/* Pre-title Label with Line on the Right: "— استعدوا للإقلاع" */}
          <div className="inline-flex items-center gap-2.5 text-white/90 text-xs sm:text-sm font-normal font-noto-arabic">
            <span className="w-6 sm:w-8 h-[1.5px] bg-white/70 rounded-full"></span>
            <span>{t.countdown.label}</span>
          </div>

          {/* Main Title */}
          <h2 className="font-noto-arabic font-normal text-2xl sm:text-3xl md:text-[36px] lg:text-[46px] text-white leading-[1.3] tracking-tight px-2">
            {t.countdown.title}
          </h2>

          {/* Subtitle */}
          <p className="font-noto-arabic font-normal text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            {t.countdown.description}
          </p>
        </ScrollReveal>

        {/* 4 Time Units Grid matching screenshot */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
          {timeUnits.map((unit, idx) => (
            <ScrollReveal
              key={idx}
              animation="zoom-in"
              delay={idx * 100}
              duration={750}
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-2xl sm:rounded-[24px] bg-white/[0.06] border border-white/10 shadow-md flex flex-col items-center justify-center gap-2.5 sm:gap-3 transition-colors hover:bg-white/[0.1] hover:border-white/20"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl text-white font-normal select-none">
                  —
                </span>
                <span className="text-xs sm:text-sm font-normal font-noto-arabic text-white/90">
                  {unit.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
