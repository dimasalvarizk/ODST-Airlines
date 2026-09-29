import { useState } from 'react';
import { SplashScreen } from '../components/ui/SplashScreen';
import { Navbar } from '../components/layout/Navbar';
import { LaunchHero } from '../components/sections/LaunchHero';
import { IntroSection } from '../components/sections/IntroSection';
import { KeyFeaturesSection } from '../components/sections/KeyFeaturesSection';
import { HajjUmrahSection } from '../components/sections/HajjUmrahSection';
import { LaunchCountdownSection } from '../components/sections/LaunchCountdownSection';
import { BookingTeaserSection } from '../components/sections/BookingTeaserSection';
import { SocialChannelsSection } from '../components/sections/SocialChannelsSection';
import { PartnershipSection } from '../components/sections/PartnershipSection';
import { ClosingStatementSection } from '../components/sections/ClosingStatementSection';
import { FooterSection } from '../components/layout/FooterSection';
import { NewsletterModal } from '../components/ui/NewsletterModal';

export const LandingPage: React.FC = () => {
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  const handleExploreVision = () => {
    const aboutElem = document.getElementById('about');
    if (aboutElem) {
      const navOffset = 80;
      const elemPos = aboutElem.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elemPos - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenNewsModal = () => {
    setNewsletterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#242E69] flex flex-col justify-between selection:bg-[#E87729] selection:text-white">
      {/* Aviation Airplane Splash Screen / Intro Loading Screen */}
      <SplashScreen />

      {/* Fixed Sticky Navbar with smooth scrolling & 3-language selector */}
      <Navbar />

      {/* 1. Launch Hero Section */}
      <LaunchHero
        onExploreVision={handleExploreVision}
        onFollowNews={handleOpenNewsModal}
      />

      {/* 2. Introduction: "نقرّب المسافات. ونحترم معنى الرحلة." */}
      <IntroSection />

      {/* 3. Key Features: "أساس رحلة حديثة" (3 Cards: Fares, Routes, Fleet) */}
      <KeyFeaturesSection />

      {/* 4. Hajj & Umrah Dedication */}
      <HajjUmrahSection />

      {/* 5. Live Launch Countdown Timer */}
      <LaunchCountdownSection onNotifyMe={handleOpenNewsModal} />

      {/* 6. Booking Teaser Section: "معلومات الحجز" / "Informasi Pemesanan" */}
      <BookingTeaserSection onLearnMore={handleOpenNewsModal} />

      {/* 7. Social Channels Section: "حلّقوا معنا من الآن" / "Tetap Terhubung" */}
      <SocialChannelsSection />

      {/* 8. Strategic Partnership (Manazil Al Mokhtara Group) */}
      <PartnershipSection />

      {/* 9. Closing Statement: "من إندونيسيا إلى المملكة — رحلة تبدأ بالنية وتصل بالعناية." */}
      <ClosingStatementSection onNotifyMe={handleOpenNewsModal} />

      {/* 10. Brand Footer */}
      <FooterSection />

      {/* Newsletter / Launch Alert Modal */}
      <NewsletterModal
        isOpen={newsletterOpen}
        onClose={() => setNewsletterOpen(false)}
      />
    </div>
  );
};
