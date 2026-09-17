import React from 'react';

export const OrnamentSymbols: React.FC = () => (
  <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
    <symbol id="ornVine" viewBox="0 0 100 100">
      <path
        d="M6 94 C 6 58, 27 54, 21 28 C 15 8, 42 4, 62 14 C 78 22, 72 42, 55 46 C 44 49, 41 38, 50 31"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="62" cy="14" r="3.4" fill="currentColor" />
      <circle cx="21" cy="28" r="2.8" fill="currentColor" />
      <circle cx="47" cy="47" r="2.2" fill="currentColor" />
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
      className={`absolute w-14 h-14 sm:w-20 sm:h-20 pointer-events-none z-10 opacity-50 ${getPositionClasses()} ${className}`}
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
