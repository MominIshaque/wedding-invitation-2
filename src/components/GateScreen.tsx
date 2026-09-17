import React from 'react';
import { WeddingData } from '../types';
import { CornerOrnament } from './Ornaments';
import { InlineEdit } from './InlineEdit';

interface GateScreenProps {
  data: WeddingData;
  isOpen: boolean;
  onOpen: () => void;
  isEditable: boolean;
  onUpdateGate: (field: keyof WeddingData['gate'], val: string) => void;
}

export const GateScreen: React.FC<GateScreenProps> = ({
  data,
  isOpen,
  onOpen,
  isEditable,
  onUpdateGate,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex pointer-events-auto transition-all duration-1000 ${
        isOpen ? 'pointer-events-none opacity-0 invisible' : 'opacity-100 visible'
      }`}
      aria-hidden={isOpen}
    >
      {/* Left gate door */}
      <div
        className={`relative flex-1 h-full border-r border-[var(--gate-line)] transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          background: `
            repeating-linear-gradient(45deg, transparent 0 18px, var(--gate-line) 18px 19px, transparent 19px 36px),
            repeating-linear-gradient(-45deg, transparent 0 18px, var(--gate-line) 18px 19px, transparent 19px 36px),
            linear-gradient(160deg, var(--gate-bg), var(--gate-bg-2))
          `,
        }}
      >
        <CornerOrnament position="tl" className="!top-6 !left-6 !w-16 !h-16" />
        <CornerOrnament position="bl" className="!bottom-6 !left-6 !w-16 !h-16" />
      </div>

      {/* Right gate door */}
      <div
        className={`relative flex-1 h-full border-l border-[var(--gate-line)] transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          background: `
            repeating-linear-gradient(45deg, transparent 0 18px, var(--gate-line) 18px 19px, transparent 19px 36px),
            repeating-linear-gradient(-45deg, transparent 0 18px, var(--gate-line) 18px 19px, transparent 19px 36px),
            linear-gradient(160deg, var(--gate-bg), var(--gate-bg-2))
          `,
        }}
      >
        <CornerOrnament position="tr" className="!top-6 !right-6 !w-16 !h-16" />
        <CornerOrnament position="br" className="!bottom-6 !right-6 !w-16 !h-16" />
      </div>

      {/* Center content badge */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 text-[var(--gate-ink)] transition-all duration-500 ${
          isOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Glowing 8-point geometric Islamic star */}
        <div className="relative mb-5">
          <svg
            className="w-20 h-20 text-[var(--gold)] animate-pulse"
            viewBox="0 0 120 120"
            aria-hidden="true"
          >
            <use href="#ornStar" />
          </svg>
        </div>

        {/* Bismillah Arabic */}
        <div className="mb-2">
          <InlineEdit
            value={data.gate.bismillahArabic}
            onChange={(v) => onUpdateGate('bismillahArabic', v)}
            isEditable={isEditable}
            className="text-lg sm:text-2xl text-[var(--gold)] font-serif tracking-wide"
            labelTooltip="Bismillah Arabic"
          />
        </div>

        {/* Bismillah English */}
        <div className="mb-6">
          <InlineEdit
            value={data.gate.bismillahEnglish}
            onChange={(v) => onUpdateGate('bismillahEnglish', v)}
            isEditable={isEditable}
            className="text-xs sm:text-sm tracking-widest italic opacity-75 uppercase font-serif"
            labelTooltip="Bismillah English Translation"
          />
        </div>

        {/* Couple Names */}
        <h1 className="font-['Great_Vibes',cursive] text-4xl sm:text-6xl md:text-7xl font-normal leading-tight m-0 text-[var(--accent)] flex items-center justify-center gap-3 flex-wrap">
          <InlineEdit
            value={data.gate.shortGroomName}
            onChange={(v) => onUpdateGate('shortGroomName', v)}
            isEditable={isEditable}
            labelTooltip="Groom Short Name"
          />
          <span className="text-[var(--gold)] font-['Cormorant_Garamond',serif] text-[0.6em] px-1 font-serif">
            &amp;
          </span>
          <InlineEdit
            value={data.gate.shortBrideName}
            onChange={(v) => onUpdateGate('shortBrideName', v)}
            isEditable={isEditable}
            labelTooltip="Bride Short Name"
          />
        </h1>

        {/* Tagline */}
        <p className="mt-2 mb-8 italic tracking-wider opacity-85 text-base sm:text-lg font-serif">
          <InlineEdit
            value={data.gate.tagline}
            onChange={(v) => onUpdateGate('tagline', v)}
            isEditable={isEditable}
            labelTooltip="Gate Tagline"
          />
        </p>

        {/* Open Invitation CTA Button */}
        <button
          onClick={onOpen}
          className="cursor-pointer bg-transparent border border-[var(--gold)] text-[var(--gate-ink)] hover:bg-[var(--gold)] hover:text-white px-8 py-3.5 text-base sm:text-lg tracking-widest font-serif transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          aria-label="Open the wedding invitation"
        >
          {data.gate.buttonText || 'Open the Invitation'}
        </button>

        {isEditable && (
          <p className="mt-4 text-xs tracking-wider text-[var(--gold)] uppercase font-sans">
            ✦ Preview Gate Entrance (Click Open to view Invitation Card)
          </p>
        )}
      </div>
    </div>
  );
};
