import React, { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number; // in milliseconds
  forceShow?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDuration = 1600,
  forceShow = false,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const planeRef = useRef<SVGGElement | null>(null);
  const trailRef = useRef<SVGPathElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Immediately skip splash on internal admin paths
    if (typeof window !== 'undefined') {
      const path = (window.location.pathname || '').toLowerCase();
      if (!forceShow && (path.startsWith('/internal-odst-gate') || path.startsWith('/admin'))) {
        onComplete?.();
        return;
      }

      // 2. Check if the initial HTML preloader (#odst-splash) is active in DOM
      const htmlSplash = document.getElementById('odst-splash');
      if (htmlSplash && htmlSplash.style.display !== 'none') {
        if (typeof (window as any).__ODST_SPLASH_DONE__ === 'function') {
          (window as any).__ODST_SPLASH_DONE__();
        }
        const timer = setTimeout(() => {
          onComplete?.();
        }, minDuration);
        return () => clearTimeout(timer);
      }
    }

    // 3. If #odst-splash is not active in DOM (e.g. SPA navigation to Contact), render the React splash
    setIsRendered(true);

    const P0 = { x: 80, y: 370 };
    const P1 = { x: 460, y: 360 };
    const P2 = { x: 920, y: 90 };
    const startTime = performance.now();

    const easeInOutCubic = (x: number) => {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / minDuration);
      const p = easeInOutCubic(rawProgress);

      const currentX = Math.pow(1 - p, 2) * P0.x + 2 * (1 - p) * p * P1.x + Math.pow(p, 2) * P2.x;
      const currentY = Math.pow(1 - p, 2) * P0.y + 2 * (1 - p) * p * P1.y + Math.pow(p, 2) * P2.y;
      const dx = 2 * (1 - p) * (P1.x - P0.x) + 2 * p * (P2.x - P1.x);
      const dy = 2 * (1 - p) * (P1.y - P0.y) + 2 * p * (P2.y - P1.y);
      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      const Q1x = (1 - p) * P0.x + p * P1.x;
      const Q1y = (1 - p) * P0.y + p * P1.y;

      if (planeRef.current) {
        planeRef.current.setAttribute(
          'transform',
          `translate(${currentX.toFixed(2)}, ${currentY.toFixed(2)}) rotate(${angleDeg.toFixed(1)})`
        );
      }
      if (trailRef.current && p > 0.01) {
        trailRef.current.setAttribute(
          'd',
          `M ${P0.x} ${P0.y} Q ${Q1x.toFixed(2)} ${Q1y.toFixed(2)} ${currentX.toFixed(2)} ${currentY.toFixed(2)}`
        );
      }

      if (rawProgress >= 1) {
        if (planeRef.current) {
          const cur = planeRef.current.getAttribute('transform') || '';
          planeRef.current.setAttribute('transform', `${cur} scale(1.2)`);
        }
        setTimeout(() => {
          setIsFading(true);
        }, 120);
        setTimeout(() => {
          setIsRendered(false);
          onComplete?.();
        }, 750);
        return;
      }

      animFrameId.current = requestAnimationFrame(updateFrame);
    };

    animFrameId.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [onComplete, minDuration, forceShow]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#080D24] overflow-hidden pointer-events-auto transition-all duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 65% 35%, #18234D 0%, #0B1333 45%, #080D24 100%)',
      }}
      aria-label="ODST Airlines Transition"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none -top-48 -right-48"
        style={{
          background: 'radial-gradient(circle, rgba(232,119,41,0.18) 0%, rgba(36,46,105,0.05) 60%, transparent 80%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative w-full max-w-[1000px] px-4 sm:px-8 aspect-[1000/450] flex items-center justify-center">
        <svg
          className="w-full h-auto overflow-visible drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          viewBox="0 0 1000 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="reactFlightPathGlowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E87729" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#E87729" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFA559" stopOpacity="1" />
            </linearGradient>

            <filter id="reactNeonPathGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="reactPlaneFuselage" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="reactPlaneWing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="reactOdstOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA057" />
              <stop offset="100%" stopColor="#E87729" />
            </linearGradient>
            <linearGradient id="reactCockpitGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1333" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="reactEngineContrail" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#E87729" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#E87729" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Planned Track */}
          <path
            d="M 80 370 Q 460 360 920 90"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2.5"
            strokeDasharray="6 8"
          />

          {/* Dynamic Flight Trail */}
          <path
            ref={trailRef}
            d="M 80 370 Q 80 370 80 370"
            fill="none"
            stroke="url(#reactFlightPathGlowGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#reactNeonPathGlow)"
          />

          {/* Origin Point Indicator */}
          <circle cx="80" cy="370" r="4" fill="#E87729" />
          <circle cx="80" cy="370" r="9" fill="#E87729" opacity="0.25" className="animate-ping" />

          {/* Airplane */}
          <g ref={planeRef} transform="translate(80, 370) rotate(88)">
            {/* Contrail */}
            <path
              d="M -11 16 L -11 46 M 11 16 L 11 46"
              stroke="url(#reactEngineContrail)"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Main Wings */}
            <path
              d="M 0 -2 L -42 16 L -39 21 L 0 6 L 39 21 L 42 16 Z"
              fill="url(#reactPlaneWing)"
              stroke="#94A3B8"
              strokeWidth="0.6"
            />
            {/* Orange Wingtips */}
            <path d="M -42 16 L -44 12 L -39 19 Z" fill="url(#reactOdstOrange)" />
            <path d="M 42 16 L 44 12 L 39 19 Z" fill="url(#reactOdstOrange)" />

            {/* Twin Turbofan Engines */}
            <rect x="-14" y="6" width="6" height="12" rx="3" fill="#64748B" />
            <rect x="-13" y="7" width="4" height="3" rx="1.5" fill="#334155" />
            <circle cx="-11" cy="18" r="2" fill="#E87729" className="animate-pulse" />

            <rect x="8" y="6" width="6" height="12" rx="3" fill="#64748B" />
            <rect x="9" y="7" width="4" height="3" rx="1.5" fill="#334155" />
            <circle cx="11" cy="18" r="2" fill="#E87729" className="animate-pulse" />

            {/* Horizontal Tail */}
            <path
              d="M 0 30 L -18 39 L -17 42 L 0 35 L 17 42 L 18 39 Z"
              fill="url(#reactPlaneWing)"
            />

            {/* Fuselage */}
            <path
              d="M 0 -34 C -5 -26, -7 -10, -7 24 C -7 33, -3 38, 0 42 C 3 38, 7 33, 7 24 C 7 -10, 5 -26, 0 -34 Z"
              fill="url(#reactPlaneFuselage)"
              stroke="#CBD5E1"
              strokeWidth="0.5"
            />

            {/* Cockpit */}
            <path
              d="M -3.5 -24 C -2 -26, 2 -26, 3.5 -24 L 4 -20 C 2 -19, -2 -19, -4 -20 Z"
              fill="url(#reactCockpitGlass)"
            />

            {/* Spine */}
            <line x1="0" y1="-14" x2="0" y2="20" stroke="#242E69" strokeWidth="1" strokeLinecap="round" />

            {/* Tail Fin */}
            <path d="M -1.5 20 L 1.5 20 L 2 36 L -2 36 Z" fill="url(#reactOdstOrange)" />

            {/* Strobe Navigation Lights */}
            <circle cx="-43" cy="15" r="1.5" fill="#EF4444" className="animate-ping" />
            <circle cx="43" cy="15" r="1.5" fill="#22C55E" className="animate-ping" />
            <circle cx="0" cy="2" r="1.8" fill="#FFFFFF" className="animate-pulse" />
          </g>
        </svg>
      </div>
    </div>
  );
};

