import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number; // in milliseconds
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDuration = 1800,
}) => {
  useEffect(() => {
    // Notify instant HTML preloader that React has mounted
    if (typeof window !== 'undefined') {
      if (typeof (window as any).__ODST_SPLASH_DONE__ === 'function') {
        (window as any).__ODST_SPLASH_DONE__();
      }
    }

    const timer = setTimeout(() => {
      onComplete?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [onComplete, minDuration]);

  // The visual splash screen is natively rendered by index.html at 0ms (0 latency / zero white flash)
  return null;
};

