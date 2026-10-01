import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import { countdownService } from '../../services/api';

interface LaunchCountdownSectionProps {
  onNotifyMe?: () => void;
}

export const LaunchCountdownSection: React.FC<LaunchCountdownSectionProps> = () => {
  const { t, language } = useLanguage();

  const [targetDateStr, setTargetDateStr] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [customTexts, setCustomTexts] = useState<{
    label?: string;
    title?: string;
    description?: string;
  }>({});

  const [timeLeft, setTimeLeft] = useState<{
    days: string | number;
    hours: string | number;
    minutes: string | number;
    seconds: string | number;
  }>({
    days: '—',
    hours: '—',
    minutes: '—',
    seconds: '—',
  });

  // Fetch live countdown configuration from Backend API
  useEffect(() => {
    let isMounted = true;
    const loadCountdown = async () => {
      try {
        const res = await countdownService.getPublic();
        if (res.success && res.data && isMounted) {
          setIsActive(res.data.isActive);
          if (res.data.targetDate) {
            setTargetDateStr(res.data.targetDate);
          }
          if (res.data.label && res.data.title && res.data.description) {
            setCustomTexts({
              label: res.data.label[language] || res.data.label.id,
              title: res.data.title[language] || res.data.title.id,
              description: res.data.description[language] || res.data.description.id,
            });
          }
        }
      } catch (err) {
        // Fallback gracefully to default translation state if backend is offline
        console.warn('[Countdown API] Using local fallback countdown');
      }
    };

    loadCountdown();
    return () => {
      isMounted = false;
    };
  }, [language]);

  // Live real-time tick interval
  useEffect(() => {
    if (!targetDateStr || !isActive) {
      setTimeLeft({ days: '—', hours: '—', minutes: '—', seconds: '—' });
      return;
    }

    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days < 10 ? `0${days}` : days,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr, isActive]);

  const timeUnits = [
    { value: timeLeft.days, label: t.countdown.days },
    { value: timeLeft.hours, label: t.countdown.hours },
    { value: timeLeft.minutes, label: t.countdown.minutes },
    { value: timeLeft.seconds, label: t.countdown.seconds },
  ];

  const displayLabel = customTexts.label || t.countdown.label;
  const displayTitle = customTexts.title || t.countdown.title;
  const displayDesc = customTexts.description || t.countdown.description;

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#242E69] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Heading */}
        <ScrollReveal animation="fade-up" duration={800} className="max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          {/* Pre-title Label */}
          <div className="inline-flex items-center gap-2.5 text-white/90 text-xs sm:text-sm font-normal font-noto-arabic">
            <span className="w-6 sm:w-8 h-[1.5px] bg-white/70 rounded-full"></span>
            <span>{displayLabel}</span>
          </div>

          {/* Main Title */}
          <h2 className="font-noto-arabic font-normal text-2xl sm:text-3xl md:text-[36px] lg:text-[46px] text-white leading-[1.3] tracking-tight px-2 text-balance">
            {displayTitle}
          </h2>

          {/* Subtitle */}
          <p className="font-noto-arabic font-normal text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed text-balance">
            {displayDesc}
          </p>
        </ScrollReveal>

        {/* 4 Time Units Grid */}
        <div className="grid grid-cols-2 min-[480px]:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-xs min-[480px]:max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          {timeUnits.map((unit, idx) => (
            <ScrollReveal
              key={idx}
              animation="zoom-in"
              delay={idx * 100}
              duration={750}
              className="h-full"
            >
              <div
                className="w-full aspect-square sm:aspect-auto sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-2xl sm:rounded-[24px] bg-white/[0.06] border border-white/10 shadow-md flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 transition-colors hover:bg-white/[0.1] hover:border-white/20 p-2 sm:p-4 mx-auto"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl text-white font-mono font-bold select-none">
                  {unit.value}
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
