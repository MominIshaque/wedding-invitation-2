import React from 'react';

export const OrnamentSymbols: React.FC = () => (
  <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
    {/* Simple, Clean & Aesthetic Corner Accent */}
    <symbol id="ornVine" viewBox="0 0 100 100">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer primary corner bracket */}
        <path d="M 64 10 L 10 10 L 10 64" strokeWidth="1.3" />
        {/* Inner delicate pinstripe */}
        <path d="M 46 18 L 18 18 L 18 46" strokeWidth="0.8" opacity="0.65" />
      </g>
      {/* Subtle diamond point */}
      <polygon points="18,15 21,18 18,21 15,18" fill="currentColor" />
    </symbol>
    <symbol id="ornStar" viewBox="0 0 120 120">
      <g fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="30" y="30" width="60" height="60" />
        <rect x="30" y="30" width="60" height="60" transform="rotate(45 60 60)" />
      </g>
      <circle cx="60" cy="60" r="5" fill="currentColor" />
    </symbol>
  </svg>
);

export const CornerOrnament: React.FC<{
  position: 'tl' | 'tr' | 'bl' | 'br';
  className?: string;
}> = ({ position, className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'tl':
        return '';
      case 'tr':
        return 'scaleX(-1)';
      case 'bl':
        return 'scaleY(-1)';
      case 'br':
        return 'scale(-1, -1)';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'tl':
        return 'top-4 sm:top-7 left-4 sm:left-7';
      case 'tr':
        return 'top-4 sm:top-7 right-4 sm:right-7';
      case 'bl':
        return 'bottom-4 sm:bottom-7 left-4 sm:left-7';
      case 'br':
        return 'bottom-4 sm:bottom-7 right-4 sm:right-7';
    }
  };

  return (
    <svg
      className={`absolute w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 pointer-events-none z-10 opacity-60 ${getPositionClasses()} ${className}`}
      style={{
        transform: getTransform(),
        color: 'var(--gold)',
      }}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <use href="#ornVine" />
    </svg>
  );
};

export const CardDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`my-5 mx-auto w-36 flex items-center gap-2.5 text-[var(--gold)] ${className}`}>
    <span className="h-[1px] flex-1 bg-[var(--line)]" />
    <span className="w-2.5 h-2.5 border border-[var(--gold)] rotate-45 shrink-0" />
    <span className="h-[1px] flex-1 bg-[var(--line)]" />
  </div>
);
