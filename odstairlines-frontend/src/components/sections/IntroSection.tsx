import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import windowViewImg from '../../assets/Windowview.png';

export const IntroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 xl:gap-16">
        {/* Right Column in RTL: Cabin Window View Image */}
        <ScrollReveal animation="zoom-in" duration={850} className="w-full lg:w-5/12 flex justify-center lg:justify-end">
          <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl border border-slate-100/80 max-w-lg lg:max-w-none w-full hover:scale-[1.01] transition-transform duration-500">
            <img
              src={windowViewImg}
              alt="ODST Luxury Aircraft Cabin Window View"
              className="w-full h-auto object-cover select-none block"
            />
          </div>
        </ScrollReveal>

        {/* Left Column in RTL: Text & Quote Box */}
        <ScrollReveal animation="fade-up" delay={150} duration={850} className="w-full lg:w-7/12 space-y-6 text-start">
          {/* Pre-title Label with Line on the Right: "— مرحباً بكم على متن رؤيتنا" */}
          <div className="inline-flex items-center gap-2.5 text-[#E87729] text-xs sm:text-sm font-bold font-noto-arabic">
            <span className="w-7 sm:w-9 h-[2px] bg-[#E87729] rounded-full"></span>
            <span>{t.introSection.label}</span>
          </div>

          {/* Main 2-Line Heading with Noto Sans Arabic Font (Regular / Not Bold) */}
          <h2 className="font-noto-arabic font-normal text-2xl sm:text-3xl md:text-[36px] lg:text-[42px] xl:text-[48px] text-[#242E69] leading-[1.45] tracking-tight">
            <span className="block whitespace-normal">
              {t.introSection.titleLine1 || t.introSection.title}
            </span>
            {t.introSection.titleLine2 && (
              <span className="block mt-2 sm:mt-2.5 md:mt-3 whitespace-normal">
                {t.introSection.titleLine2}
              </span>
            )}
          </h2>

          {/* Description Paragraph with Noto Sans Arabic (2 Lines matching screenshot) */}
          <div className="text-[#64748B] text-xs sm:text-sm md:text-[15.5px] leading-[1.75] font-normal font-noto-arabic max-w-2xl space-y-1">
            {t.introSection.descLine1 ? (
              <>
                <p className="whitespace-normal">
                  {t.introSection.descLine1}
                </p>
                <p className="whitespace-normal">
                  {t.introSection.descLine2}
                </p>
              </>
            ) : (
              <p>{t.introSection.description}</p>
            )}
          </div>

          {/* Quote Card with Warm Cream Background & Sparkle Badge on the Right */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF7F0] border border-[#FFE8D6]/70 shadow-sm flex items-center justify-between gap-4 max-w-xl">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-[#E87729] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#E87729]/25">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
            </div>
            <p className="text-sm sm:text-[15px] md:text-base font-normal font-noto-arabic text-[#242E69] leading-relaxed text-start flex-1">
              {t.introSection.quote}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
