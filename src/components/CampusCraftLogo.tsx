'use client';

import React from 'react';

interface CampusCraftLogoProps {
  variant?: 'navbar' | 'primary' | 'symbol' | 'dark';
  className?: string;
  subtitle?: string;
  showSubtitle?: boolean;
}

const PALETTE = {
  espresso: '#30251F',
  structural: '#4A372C',
  wood: '#8A6F5A',
  sand: '#D4C7B8',
  champagne: '#C9AD8D',
  cream: '#FFF9F0',
};

/**
 * CampusCraft artisan-collegiate crest.
 * One integrated mark: mortarboard geometry, botanical sprout from the cap jewel,
 * and a tassel that resolves into a needle / chisel.
 */
export const CampusCraftSymbol: React.FC<{
  size?: number;
  isDark?: boolean;
  className?: string;
}> = ({
  size = 36,
  isDark = false,
  className = '',
}) => {
 return (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-label="CampusCraft Logo Symbol"
  >
    <circle
      cx="24"
      cy="24"
      r="22"
      fill={isDark ? '#24352C' : '#FFFDF7'}
      stroke={isDark ? '#A8CBB7' : '#D5E2D8'}
      strokeWidth="1.5"
    />

    {/* Graduation cap */}
    <path
      d="M8 22L24 14L40 22L24 30L8 22Z"
      fill={isDark ? '#FFFDF7' : '#5F9275'}
    />

    {/* Cap center */}
    <circle
      cx="24"
      cy="22"
      r="2"
      fill={isDark ? '#A8CBB7' : '#24352C'}
    />

    {/* Growing stem */}
    <path
      d="M24 20V8"
      stroke={isDark ? '#A8CBB7' : '#5F9275'}
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Left leaf */}
    <path
      d="M24 13C19 12 17 9 18 6C22 7 24 10 24 13Z"
      fill="#A8CBB7"
    />

    {/* Right leaf */}
    <path
      d="M24 11C28 10 31 7 30 5C26 6 24 8 24 11Z"
      fill="#5F9275"
    />

    {/* Tassel */}
    <path
      d="M24 22C30 23 35 26 35 31C35 35 33 38 34 41"
      stroke={isDark ? '#A8CBB7' : '#5F9275'}
      strokeWidth="1.7"
      strokeLinecap="round"
    />

    <path
      d="M34 39L36 43L34 45L32 43L34 39Z"
      fill={isDark ? '#A8CBB7' : '#5F9275'}
    />
  </svg>
);
};

export const CampusCraftLogo: React.FC<CampusCraftLogoProps> = ({
  variant = 'navbar',
  className = '',
  subtitle,
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark';
  const tagline = subtitle || 'STUDENT CREATOR ATELIER • ASIET';

  if (variant === 'symbol') {
    return <CampusCraftSymbol size={36} isDark={false} className={className} />;
  }

  if (variant === 'primary') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        <CampusCraftSymbol size={52} isDark={isDark} />
        <div className="space-y-0.5">
          <div className="flex items-center justify-center tracking-tight">
            <span
              className={`font-headline-sm text-[28px] font-bold ${isDark ? 'text-[#FFF9F0]' : 'text-[#30251F]'}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              CAMPUS
            </span>
            <span
              className="font-headline-sm text-[28px] font-bold text-[#8A6F5A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              CRAFT
            </span>
          </div>

          {showSubtitle && (
            <div className="flex items-center justify-center gap-1.5 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A6F5A]"></span>
              <p
                className={`text-[10px] uppercase font-bold tracking-[0.2em] ${
                  isDark ? 'text-[#D4C7B8]' : 'text-[#4A372C]'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {tagline}
              </p>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A6F5A]"></span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-space-sm ${className}`}>
      <CampusCraftSymbol size={36} isDark={isDark} />
      <div className="text-left">
        <div className="flex items-baseline tracking-tight">
          <span
            className={`text-headline-sm font-headline-sm leading-tight font-bold ${
              isDark ? 'text-[#FFF9F0]' : 'text-[#30251F]'
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            CAMPUS
          </span>
          <span
            className="text-headline-sm font-headline-sm leading-tight font-bold text-[#8A6F5A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            CRAFT
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 -mt-0.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-container shrink-0"></span>
            <span
              className="text-[10px] font-label-sm text-on-surface-variant tracking-wider uppercase truncate max-w-[200px] sm:max-w-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {tagline}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
