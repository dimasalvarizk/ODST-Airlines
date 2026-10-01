import React from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import bookingVisualImg from '../../assets/Bookingvisual.png';

interface BookingTeaserSectionProps {
  onLearnMore?: () => void;
}

export const BookingTeaserSection: React.FC<BookingTeaserSectionProps> = ({ onLearnMore }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="booking-info" className="py-16 sm:py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 xl:gap-20">
        {/* Right Column in RTL: Passenger Pilgrimage Visual matching screenshot */}
        <ScrollReveal animation="zoom-in" duration={850} className="w-full lg:w-5/12 flex justify-center lg:justify-end">
          <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl border border-slate-100/80 max-w-lg lg:max-w-none w-full hover:scale-[1.01] transition-transform duration-500">
            <img
              src={bookingVisualImg}
              alt="ODST Passenger Ready for Pilgrimage"
              className="w-full h-auto object-cover select-none block"
            />
          </div>
        </ScrollReveal>

        {/* Left Column in RTL: Text, Checklist Pills & Action Button */}
        <ScrollReveal animation="fade-up" delay={150} duration={850} className="w-full lg:w-7/12 space-y-6 text-start">
          {/* Pre-title Label */}
          <div className="inline-flex items-center text-[#E87729] text-xs sm:text-sm font-bold font-noto-arabic tracking-wide uppercase">
            <span>{t.bookingTeaser.label}</span>
          </div>

          {/* Main 2-Line Heading with Noto Sans Arabic Font */}
          <h2 className="font-noto-arabic font-normal text-2xl sm:text-3xl md:text-[38px] lg:text-[46px] text-[#242E69] leading-[1.35] sm:leading-[1.4] tracking-tight text-balance">
            <span className="block whitespace-normal">
              {t.bookingTeaser.titleLine1 || t.bookingTeaser.title}
            </span>
            {t.bookingTeaser.titleLine2 && (
              <span className="block mt-1.5 sm:mt-2 md:mt-2.5 whitespace-normal">
                {t.bookingTeaser.titleLine2}
              </span>
            )}
          </h2>

          {/* Description Paragraph with Noto Sans Arabic */}
          <div className="text-[#64748B] text-xs sm:text-sm md:text-[15px] leading-[1.8] font-normal font-noto-arabic max-w-2xl space-y-1 text-justify">
            {t.bookingTeaser.descLine1 ? (
              <>
                <p className="whitespace-normal leading-[1.8] text-justify">{t.bookingTeaser.descLine1}</p>
                <p className="whitespace-normal leading-[1.8] text-justify">{t.bookingTeaser.descLine2}</p>
              </>
            ) : (
              <p className="leading-[1.8] text-justify">{t.bookingTeaser.description}</p>
            )}
          </div>

          {/* 3 Checklist Items matching screenshot */}
          <div className="space-y-3 pt-1 max-w-xl">
            {t.bookingTeaser.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#FFF7F0] border border-[#FFE8D6]/70 flex items-center gap-3.5 transition-all hover:bg-[#FFF2E6] hover:translate-x-[-2px]"
              >
                <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#E87729] shrink-0 stroke-[2.5]" />
                <span className="font-noto-arabic font-normal text-sm sm:text-[15px] md:text-base text-[#242E69]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={onLearnMore}
              className="px-8 py-3.5 rounded-full font-noto-arabic font-normal text-sm sm:text-base text-white bg-[#E87729] hover:bg-[#D5681E] shadow-lg shadow-[#E87729]/25 inline-flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.bookingTeaser.action}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
