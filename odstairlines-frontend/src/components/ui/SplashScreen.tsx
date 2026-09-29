import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number; // in milliseconds
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDuration = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isDeparting, setIsDeparting] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // Progress from 0 to 1
      const p = Math.min(1, elapsed / minDuration);
      // Apply smooth ease-in-out cubic for realistic flight acceleration
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setProgress(eased);

      if (p >= 1) {
        clearInterval(interval);
        setIsDeparting(true);

        setTimeout(() => {
          setIsFadingOut(true);
        }, 300);

        setTimeout(() => {
          setIsRemoved(true);
          onComplete?.();
        }, 850);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  if (isRemoved) return null;

  // Exact Quadratic Bézier Curve Coordinates in SVG space (1000 x 450)
  const P0 = { x: 80, y: 370 };   // Flight Origin
  const P1 = { x: 460, y: 360 };  // Curve Control Point
  const P2 = { x: 920, y: 90 };   // Flight Destination

  const t = progress;

  // Calculate current airplane position on curve
  const currentX = Math.pow(1 - t, 2) * P0.x + 2 * (1 - t) * t * P1.x + Math.pow(t, 2) * P2.x;
  const currentY = Math.pow(1 - t, 2) * P0.y + 2 * (1 - t) * t * P1.y + Math.pow(t, 2) * P2.y;

  // Calculate exact tangent vector (direction of flight)
  const dx = 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
  const dy = 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);

  // Tangent angle: in SVG coords, Math.atan2(dy, dx) returns angle from +X axis.
  // Since default plane points UP (-90 deg), add 90 deg to align nose with tangent.
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

  // Sub-curve control point Q1 for exact dynamic trail drawing up to current (x, y)
  const Q1x = (1 - t) * P0.x + t * P1.x;
  const Q1y = (1 - t) * P0.y + t * P1.y;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden select-none transition-all duration-700 ease-out bg-[#080D24] ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #121A45 0%, #0A102E 55%, #050818 100%)',
      }}
      aria-hidden={isRemoved}
    >
      {/* Ambient Radial Sky Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#E87729]/10 blur-[140px]"></div>
      </div>

      {/* Flight Canvas: SVG Airplane and Flight Path in Synchronized Coordinates */}
      <div className="relative w-full max-w-4xl px-4 sm:px-8">
        <svg
          className="w-full h-auto overflow-visible drop-shadow-2xl"
          viewBox="0 0 1000 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glowing Orange to White Trail Gradient */}
            <linearGradient id="flightPathGlowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E87729" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#E87729" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFA559" stopOpacity="1" />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonPathGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Airplane Gradients */}
            <linearGradient id="planeFuselage" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="planeWing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="odstOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA057" />
              <stop offset="100%" stopColor="#E87729" />
            </linearGradient>
            <linearGradient id="cockpitGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1333" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="engineContrail" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#E87729" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#E87729" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Full Dotted Planned Route Line */}
          <path
            d={`M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2.5"
            strokeDasharray="6 8"
          />

          {/* 2. Dynamic Glowing Flight Trail ending at Airplane Tail */}
          {t > 0.01 && (
            <path
              d={`M ${P0.x} ${P0.y} Q ${Q1x} ${Q1y} ${currentX} ${currentY}`}
              fill="none"
              stroke="url(#flightPathGlowGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#neonPathGlow)"
            />
          )}

          {/* 3. Origin Point Indicator */}
          <circle cx={P0.x} cy={P0.y} r="4" fill="#E87729" />
          <circle cx={P0.x} cy={P0.y} r="9" fill="#E87729" opacity="0.25" className="animate-ping" />

          {/* 4. The Airplane - Perfectly Positioned and Angled along the Flight Path */}
          <g
            transform={`translate(${currentX}, ${currentY}) rotate(${angleDeg}) ${
              isDeparting ? 'scale(1.25)' : 'scale(1)'
            }`}
            className="transition-transform duration-75"
          >
            {/* Jet Engine Contrail Streaming from Behind Engines */}
            <path
              d="M -11 16 L -11 46 M 11 16 L 11 46"
              stroke="url(#engineContrail)"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Main Wings */}
            <path
              d="M 0 -2 L -42 16 L -39 21 L 0 6 L 39 21 L 42 16 Z"
              fill="url(#planeWing)"
              stroke="#94A3B8"
              strokeWidth="0.6"
            />

            {/* ODST Orange Wingtips */}
            <path d="M -42 16 L -44 12 L -39 19 Z" fill="url(#odstOrange)" />
            <path d="M 42 16 L 44 12 L 39 19 Z" fill="url(#odstOrange)" />

            {/* Twin Turbofan Engines */}
            <rect x="-14" y="6" width="6" height="12" rx="3" fill="#64748B" />
            <rect x="-13" y="7" width="4" height="3" rx="1.5" fill="#334155" />
            <circle cx="-11" cy="18" r="2" fill="#E87729" className="animate-pulse" />

            <rect x="8" y="6" width="6" height="12" rx="3" fill="#64748B" />
            <rect x="9" y="7" width="4" height="3" rx="1.5" fill="#334155" />
            <circle cx="11" cy="18" r="2" fill="#E87729" className="animate-pulse" />

            {/* Horizontal Tail Stabilizers */}
            <path
              d="M 0 30 L -18 39 L -17 42 L 0 35 L 17 42 L 18 39 Z"
              fill="url(#planeWing)"
            />

            {/* Aerodynamic Fuselage Body */}
            <path
              d="M 0 -34 C -5 -26, -7 -10, -7 24 C -7 33, -3 38, 0 42 C 3 38, 7 33, 7 24 C 7 -10, 5 -26, 0 -34 Z"
              fill="url(#planeFuselage)"
              stroke="#CBD5E1"
              strokeWidth="0.5"
            />

            {/* Cockpit Windshield */}
            <path
              d="M -3.5 -24 C -2 -26, 2 -26, 3.5 -24 L 4 -20 C 2 -19, -2 -19, -4 -20 Z"
              fill="url(#cockpitGlass)"
            />

            {/* Spine Accent */}
            <line x1="0" y1="-14" x2="0" y2="20" stroke="#242E69" strokeWidth="1" strokeLinecap="round" />

            {/* Vertical Tail Fin (ODST Signature Orange) */}
            <path
              d="M -1.5 20 L 1.5 20 L 2 36 L -2 36 Z"
              fill="url(#odstOrange)"
            />

            {/* Strobe Navigation Lights */}
            {/* Left (Red) */}
            <circle cx="-43" cy="15" r="1.5" fill="#EF4444" className="animate-ping" />
            {/* Right (Green) */}
            <circle cx="43" cy="15" r="1.5" fill="#22C55E" className="animate-ping" />
            {/* Top Beacon (White) */}
            <circle cx="0" cy="2" r="1.8" fill="#FFFFFF" className="animate-pulse" />
          </g>
        </svg>
      </div>
    </div>
  );
};
