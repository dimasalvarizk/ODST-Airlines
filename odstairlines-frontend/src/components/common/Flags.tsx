import React from 'react';

interface FlagProps {
  className?: string;
}

export const IndonesiaFlag: React.FC<FlagProps> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    className={`${className} rounded-[3px] shadow-sm shrink-0 border border-white/20 overflow-hidden inline-block align-middle`}
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="30" height="10" fill="#E11424" />
    <rect y="10" width="30" height="10" fill="#FFFFFF" />
  </svg>
);

export const UKFlag: React.FC<FlagProps> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    className={`${className} rounded-[3px] shadow-sm shrink-0 border border-white/20 overflow-hidden inline-block align-middle`}
    viewBox="0 0 60 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="uk-flag-clip-common">
      <rect width="60" height="30" rx="3" />
    </clipPath>
    <g clipPath="url(#uk-flag-clip-common)">
      <path d="M0 0h60v30H0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export const SaudiFlag: React.FC<FlagProps> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    className={`${className} rounded-[3px] shadow-sm shrink-0 border border-white/20 overflow-hidden inline-block align-middle`}
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="30" height="20" fill="#006C35" rx="3" />
    <path
      d="M7 13.5h16M7 13.5l2-1.5M7 13.5l2 1.5"
      stroke="#FFFFFF"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="15"
      y="9.5"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="5"
      fontWeight="bold"
      fontFamily="'Noto Sans Arabic', sans-serif"
    >
      لا إله إلا الله
    </text>
  </svg>
);
