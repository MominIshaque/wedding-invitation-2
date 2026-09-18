import React, { useState, useEffect } from 'react';
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

function playGateChime() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const startTime = ctx.currentTime + idx * 0.08;
      const duration = 1.5;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.045, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch {
    // Non-blocking fallback
  }
}

export const GateScreen: React.FC<GateScreenProps> = ({
  data,
  isOpen,
  onOpen,
  isEditable,
  onUpdateGate,
}) => {
  const [isMounted, setIsMounted] = useState(!isOpen);

  useEffect(() => {
    if (!isOpen) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 1150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted && isOpen) {
    return null;
  }

  const handleOpenClick = () => {
    playGateChime();
    onOpen();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex overflow-hidden ${
        isOpen ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-hidden={isOpen}
    >
      {/* Left gate door */}
      <div
        className={`relative flex-1 h-full transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform overflow-hidden ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, var(--gate-bg) 0%, var(--gate-bg-2) 100%)',
        }}
      >
        {/* Left half of single outer frame - seamlessly joins at center */}
        <div className="absolute top-4 bottom-4 left-4 right-0 sm:top-8 sm:bottom-8 sm:left-8 border-t border-b border-l border-[var(--gate-line)]/50 pointer-events-none" />
        <div className="absolute top-6 bottom-6 left-6 right-0 sm:top-11 sm:bottom-11 sm:left-11 border-t border-b border-l border-[var(--gate-line)]/25 pointer-events-none" />

        {/* Outer simple & clean corner accents for unified gate */}
        <CornerOrnament position="tl" className="!top-4 !left-4 sm:!top-8 sm:!left-8 !w-14 !h-14 sm:!w-20 sm:!h-20 md:!w-24 md:!h-24 !opacity-70 text-[var(--gold)]" />
        <CornerOrnament position="bl" className="!bottom-4 !left-4 sm:!bottom-8 sm:!left-8 !w-14 !h-14 sm:!w-20 sm:!h-20 md:!w-24 md:!h-24 !opacity-70 text-[var(--gold)]" />
      </div>

      {/* Right gate door */}
      <div
        className={`relative flex-1 h-full transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform overflow-hidden ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, var(--gate-bg) 0%, var(--gate-bg-2) 100%)',
        }}
      >
        {/* Right half of single outer frame - seamlessly joins at center */}
        <div className="absolute top-4 bottom-4 right-4 left-0 sm:top-8 sm:bottom-8 sm:right-8 border-t border-b border-r border-[var(--gate-line)]/50 pointer-events-none" />
        <div className="absolute top-6 bottom-6 right-6 left-0 sm:top-11 sm:bottom-11 sm:right-11 border-t border-b border-r border-[var(--gate-line)]/25 pointer-events-none" />

        {/* Outer simple & clean corner accents for unified gate */}
        <CornerOrnament position="tr" className="!top-4 !right-4 sm:!top-8 sm:!right-8 !w-14 !h-14 sm:!w-20 sm:!h-20 md:!w-24 md:!h-24 !opacity-70 text-[var(--gold)]" />
        <CornerOrnament position="br" className="!bottom-4 !right-4 sm:!bottom-8 sm:!right-8 !w-14 !h-14 sm:!w-20 sm:!h-20 md:!w-24 md:!h-24 !opacity-70 text-[var(--gold)]" />
      </div>

      {/* Center content badge */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 text-[var(--gate-ink)] transition-all duration-500 ${
          isOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Bismillah Arabic */}
        <div className="mb-3">
          <InlineEdit
            value={data.gate.bismillahArabic}
            onChange={(v) => onUpdateGate('bismillahArabic', v)}
            isEditable={isEditable}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--gold)] font-serif tracking-wide drop-shadow-xs"
            labelTooltip="Bismillah Arabic"
          />
        </div>

        {/* Bismillah English */}
        <div className="mb-6 sm:mb-8">
          <InlineEdit
            value={data.gate.bismillahEnglish}
            onChange={(v) => onUpdateGate('bismillahEnglish', v)}
            isEditable={isEditable}
            className="text-xs sm:text-base md:text-lg tracking-[0.2em] italic opacity-85 uppercase font-serif"
            labelTooltip="Bismillah English Translation"
          />
        </div>

        {/* Couple Names */}
        <h1 className="font-['Great_Vibes',cursive] text-6xl sm:text-8xl md:text-9xl lg:text-[104px] font-normal leading-tight m-0 text-[var(--accent)] flex items-center justify-center gap-3 sm:gap-6 flex-wrap drop-shadow-xs">
          <InlineEdit
            value={data.gate.shortGroomName}
            onChange={(v) => onUpdateGate('shortGroomName', v)}
            isEditable={isEditable}
            labelTooltip="Groom Short Name"
          />
          <span className="text-[var(--gold)] font-['Cormorant_Garamond',serif] text-3xl sm:text-5xl md:text-6xl px-2 sm:px-4 font-serif">
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
        <p className="mt-3 sm:mt-4 mb-8 sm:mb-12 italic tracking-wider opacity-90 text-xl sm:text-2xl md:text-3xl font-serif text-[var(--gate-ink)]">
          <InlineEdit
            value={data.gate.tagline}
            onChange={(v) => onUpdateGate('tagline', v)}
            isEditable={isEditable}
            labelTooltip="Gate Tagline"
          />
        </p>

        {/* Open Invitation CTA Button */}
        <button
          onClick={handleOpenClick}
          className="cursor-pointer bg-transparent border-2 border-[var(--gold)] text-[var(--gate-ink)] hover:bg-[var(--gold)] hover:text-white px-10 py-4 sm:px-14 sm:py-5 text-lg sm:text-2xl tracking-widest font-serif font-medium transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95"
          aria-label="Open the wedding invitation"
        >
          {data.gate.buttonText || 'Open the Invitation'}
        </button>

        {isEditable && (
          <p className="mt-5 text-xs sm:text-sm tracking-wider text-[var(--gold)] uppercase font-sans">
            ✦ Preview Gate Entrance (Click Open to view Invitation Card)
          </p>
        )}
      </div>
    </div>
  );
};
