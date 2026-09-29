import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import almokhtaraLogo from '../../assets/AlmokhtaraGorupLOGO.png';
import flightPathImg from '../../assets/Flightpath.png';

export const PartnershipSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="partnership" className="bg-[#FAF5EF] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 xl:gap-20">
          {/* Right Column in RTL: Al Mokhtara Group Logo Card */}
          <ScrollReveal animation="zoom-in" duration={850} className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <div className="rounded-[32px] sm:rounded-[36px] bg-white p-8 sm:p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/90 max-w-md lg:max-w-none w-full flex items-center justify-center hover:scale-[1.01] transition-transform duration-500">
              <img
                src={almokhtaraLogo}
                alt="Al Mokhtara Group — The Hospitality Company"
                className="w-full max-w-[260px] sm:max-w-[300px] h-auto object-contain select-none"
              />
            </div>
          </ScrollReveal>

          {/* Left Column in RTL: Text Copy */}
          <ScrollReveal animation="fade-up" delay={150} duration={850} className="w-full lg:w-7/12 space-y-6 text-start">
            {/* Pre-title Label with Line: "— شراكة محلية موثوقة" */}
            <div className="inline-flex items-center gap-2.5 text-[#E87729] text-xs sm:text-sm font-bold font-noto-arabic">
              <span className="w-7 sm:w-9 h-[2px] bg-[#E87729] rounded-full"></span>
              <span>{t.partnership.label}</span>
            </div>

            {/* Main 2-Line Heading with Noto Sans Arabic Font (Regular / Not Bold) */}
            <h2 className="font-noto-arabic font-normal text-2xl sm:text-3xl md:text-[38px] lg:text-[46px] text-[#242E69] leading-[1.45] tracking-tight">
              <span className="block whitespace-normal">
                {t.partnership.titleLine1 || t.partnership.title}
              </span>
              {t.partnership.titleLine2 && (
                <span className="block mt-2 sm:mt-2.5 md:mt-3 whitespace-normal">
                  {t.partnership.titleLine2}
                </span>
              )}
            </h2>

            {/* Description Paragraph with Noto Sans Arabic */}
            <p className="font-noto-arabic font-normal text-xs sm:text-sm md:text-[14.5px] text-[#64748B] leading-relaxed whitespace-normal">
              {t.partnership.description}
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Full-Width Flight Path Graphic */}
        <ScrollReveal animation="fade-up" delay={250} duration={900} className="pt-12 sm:pt-16 max-w-5xl mx-auto flex justify-center">
          <img
            src={flightPathImg}
            alt="Flight Path"
            className="w-full h-auto object-contain select-none opacity-90 hover:opacity-100 transition-opacity duration-500"
          />
        </ScrollReveal>
      </div>
    </section>
  );
};
