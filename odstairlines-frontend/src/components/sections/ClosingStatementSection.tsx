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
    <section className="relative min-h-[500px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden">
      {/* Aircraft Background Image with Subtle Dark Blue Tint */}
      <div className="absolute inset-0 z-0">
        <img
          src={aircraftImg}
          alt="ODST Aircraft Soaring in the Clouds"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Subtle Dark Blue Overlay to match screenshot perfectly */}
        <div className="absolute inset-0 bg-[#1E2756]/30 md:bg-[#1E2756]/25"></div>
      </div>

      <ScrollReveal
        animation="fade-up"
        duration={900}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8 py-20 sm:py-28"
      >
        {/* Pre-title Label with Line on the Right: "— وجهتنا تبدأ بكم" */}
        <div className="inline-flex items-center gap-2.5 text-white/90 text-xs sm:text-sm font-normal font-noto-arabic">
          <span className="w-6 sm:w-8 h-[1.5px] bg-white/80 rounded-full"></span>
          <span>{t.closing.label}</span>
        </div>

        {/* Big 2-Line Closing Statement - Tight & Balanced Line Height */}
        <h2 className="font-noto-arabic font-normal text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] xl:text-[44px] text-white leading-[1.3] sm:leading-[1.28] md:leading-[1.24] drop-shadow-md max-w-3xl lg:max-w-4xl mx-auto px-4">
          <span className="block">
            {t.closing.statementLine1 || t.closing.statement}
          </span>
          {t.closing.statementLine2 && (
            <span className="block mt-1.5 sm:mt-2 md:mt-2.5 text-white">
              {t.closing.statementLine2}
            </span>
          )}
        </h2>

        {/* Action Button */}
        <div className="pt-2 sm:pt-4">
          <button
            onClick={onNotifyMe}
            className="px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-noto-arabic font-normal text-xs sm:text-sm md:text-base text-[#242E69] bg-white hover:bg-[#FFF7F0] shadow-2xl inline-flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span>{t.closing.action}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#242E69]" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#242E69]" />}
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};
