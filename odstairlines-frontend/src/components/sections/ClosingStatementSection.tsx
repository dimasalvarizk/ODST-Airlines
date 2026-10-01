import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import aircraftImg from '../../assets/aircraft.jpeg';

interface ClosingStatementSectionProps {
  onNotifyMe: () => void;
}

export const ClosingStatementSection: React.FC<ClosingStatementSectionProps> = ({ onNotifyMe }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[480px] sm:min-h-[540px] md:min-h-[600px] lg:min-h-[640px] flex items-center justify-center text-white overflow-hidden">
      {/* Aircraft Background Image with atmospheric soft navy wash matching the design */}
      <div className="absolute inset-0 z-0">
        <img
          src={aircraftImg}
          alt="ODST Aircraft"
          className="w-full h-full object-cover object-[center_35%] sm:object-[center_30%] select-none"
        />
        {/* Soft Blue Atmospheric Tonal Overlays for High Legibility & Exact Visual Match */}
        <div className="absolute inset-0 bg-[#1E2756]/35 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#0F1738]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1533]/45 via-transparent to-[#0E1533]/55"></div>
      </div>

      <ScrollReveal
        animation="fade-up"
        duration={900}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center space-y-5 sm:space-y-6 md:space-y-7 py-20 sm:py-28"
      >
        {/* Top Tagline: Tujuan Kami Dimulai dari Anda */}
        <div className="inline-flex items-center justify-center text-white/85 text-xs sm:text-[13px] md:text-sm font-normal tracking-wide">
          <span>{t.closing.label}</span>
        </div>

        {/* Big Impact Headline matching image hierarchy */}
        <div className="max-w-3xl lg:max-w-4xl mx-auto px-2">
          {t.closing.statementLine1 ? (
            <h2 className="font-sans font-medium sm:font-semibold text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] xl:text-[44px] text-white leading-[1.35] sm:leading-[1.38] md:leading-[1.4] tracking-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
              <span className="block">{t.closing.statementLine1}</span>
              {t.closing.statementLine2 && (
                <span className="block mt-1 sm:mt-1.5">{t.closing.statementLine2}</span>
              )}
              {t.closing.statementLine3 && (
                <span className="block mt-1 sm:mt-1.5">{t.closing.statementLine3}</span>
              )}
            </h2>
          ) : (
            <h2 className="font-sans font-medium sm:font-semibold text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] xl:text-[44px] text-white leading-[1.35] sm:leading-[1.38] md:leading-[1.4] tracking-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] whitespace-pre-line">
              {t.closing.statement}
            </h2>
          )}
        </div>

        {/* Luminous Clean White Pill Action Button */}
        <div className="pt-2 sm:pt-3">
          <button
            onClick={onNotifyMe}
            className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-sans font-medium text-xs sm:text-sm md:text-[15px] text-[#242E69] bg-white hover:bg-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)] inline-flex items-center gap-2 sm:gap-2.5 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
          >
            <span>{t.closing.action}</span>
            {isRTL ? (
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#242E69] transition-transform duration-300 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#242E69] transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};


