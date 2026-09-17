import React, { useState, useEffect } from 'react';
import { WeddingData, WeddingEvent } from '../types';
import { CornerOrnament, CardDivider } from './Ornaments';
import { InlineEdit } from './InlineEdit';
import { MapPin, Plus, Trash2, Calendar, Clock, Share2, Sparkles } from 'lucide-react';

interface InvitationCardProps {
  data: WeddingData;
  isEditable: boolean;
  onUpdateHero: (field: keyof WeddingData['hero'], val: string) => void;
  onUpdateMonogram: (field: keyof WeddingData['monogram'], val: string) => void;
  onUpdateFooter: (field: keyof WeddingData['footer'], val: string) => void;
  onUpdateEventsTitle: (val: string) => void;
  onUpdateEvent: (id: string, field: keyof WeddingEvent, val: string) => void;
  onAddEvent: () => void;
  onDeleteEvent: (id: string) => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  data,
  isEditable,
  onUpdateHero,
  onUpdateMonogram,
  onUpdateFooter,
  onUpdateEventsTitle,
  onUpdateEvent,
  onAddEvent,
  onDeleteEvent,
}) => {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(data.footer.countdownTargetIso).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (isNaN(targetTime) || diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isPast: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [data.footer.countdownTargetIso]);

  // WhatsApp share url generator
  const getWhatsAppShareUrl = () => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const text = `${data.footer.shareMessageTemplate}\n${pageUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <article
      id="invitation-card"
      className="relative w-full max-w-[960px] mx-auto bg-[var(--paper)] shadow-[var(--shadow)] border border-[var(--line)] overflow-hidden transition-all duration-300 font-serif"
    >
      {/* Outer double border rings */}
      <div className="absolute inset-[10px] sm:inset-[15px] border border-[var(--line)] pointer-events-none z-10" />
      <div className="absolute inset-[15px] sm:inset-[21px] border border-[var(--line-soft)] pointer-events-none z-10" />

      {/* 4 Corner Ornaments */}
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      {/* HERO SECTION */}
      <section className="relative z-20 px-6 sm:px-16 pt-16 sm:pt-24 pb-12 text-center flex flex-col justify-center">
        {/* Arabic Bismillah */}
        <div className="text-2xl sm:text-4xl text-[var(--ink)] mb-1 font-serif tracking-wide" dir="rtl">
          <InlineEdit
            value={data.hero.bismillahArabic}
            onChange={(v) => onUpdateHero('bismillahArabic', v)}
            isEditable={isEditable}
            labelTooltip="Arabic Bismillah"
          />
        </div>

        {/* English Bismillah */}
        <div className="text-xs sm:text-sm tracking-[0.12em] text-[var(--muted)] italic font-serif">
          <InlineEdit
            value={data.hero.bismillahEnglish}
            onChange={(v) => onUpdateHero('bismillahEnglish', v)}
            isEditable={isEditable}
            labelTooltip="Bismillah English Translation"
          />
        </div>

        <CardDivider />

        {/* Under Guardianship */}
        <p className="text-base sm:text-lg tracking-wider italic text-[var(--muted)] my-1">
          <InlineEdit
            value={data.hero.guardianLabel}
            onChange={(v) => onUpdateHero('guardianLabel', v)}
            isEditable={isEditable}
            labelTooltip="Guardian Prefix Label"
          />
        </p>
        <p className="text-xl sm:text-3xl font-semibold mb-6 text-[var(--ink)]">
          <InlineEdit
            value={data.hero.guardianName}
            onChange={(v) => onUpdateHero('guardianName', v)}
            isEditable={isEditable}
            labelTooltip="Guardian Name"
          />{' '}
          <span className="text-base sm:text-lg font-normal tracking-wide text-[var(--muted)]">
            <InlineEdit
              value={data.hero.guardianDegree}
              onChange={(v) => onUpdateHero('guardianDegree', v)}
              isEditable={isEditable}
              labelTooltip="Guardian Degree"
            />
          </span>
        </p>

        {/* Request Invitation Lines */}
        <div className="max-w-[640px] mx-auto mb-8 text-base sm:text-xl leading-relaxed italic text-[var(--muted)] whitespace-pre-line">
          <InlineEdit
            value={data.hero.invitersText}
            onChange={(v) => onUpdateHero('invitersText', v)}
            isEditable={isEditable}
            multiline
            labelTooltip="Invitation Invitation Body / Parents Text"
          />
        </div>

        {/* GROOM NAME */}
        <div className="my-2">
          <h1 className="font-['Great_Vibes',cursive] text-4xl sm:text-6xl md:text-7xl font-normal leading-tight text-[var(--accent)]">
            <InlineEdit
              value={data.hero.groomName}
              onChange={(v) => onUpdateHero('groomName', v)}
              isEditable={isEditable}
              labelTooltip="Groom Full Name"
            />{' '}
            <span className="font-serif text-sm sm:text-xl tracking-normal text-[var(--muted)] align-middle">
              <InlineEdit
                value={data.hero.groomDegree}
                onChange={(v) => onUpdateHero('groomDegree', v)}
                isEditable={isEditable}
                labelTooltip="Groom Degree"
              />
            </span>
          </h1>

          {/* Groom Parents */}
          <p className="mt-2 mb-4 text-sm sm:text-base italic text-[var(--ink)] flex items-center justify-center gap-1.5 flex-wrap">
            <InlineEdit
              value={data.hero.groomParentage}
              onChange={(v) => onUpdateHero('groomParentage', v)}
              isEditable={isEditable}
              labelTooltip="Groom Father"
            />
            <InlineEdit
              value={data.hero.groomGrandfather}
              onChange={(v) => onUpdateHero('groomGrandfather', v)}
              isEditable={isEditable}
              labelTooltip="Groom Grandfather"
            />
          </p>
        </div>

        {/* WITH ORNAMENT */}
        <div className="inline-flex items-center justify-center gap-3 my-2 text-sm sm:text-base tracking-[0.18em] font-semibold text-[var(--ink)]">
          <span className="text-[var(--gold)] text-xs">✦</span>
          <span>WITH</span>
          <span className="text-[var(--gold)] text-xs">✦</span>
        </div>

        {/* BRIDE NAME */}
        <div className="my-2">
          <h2 className="font-['Great_Vibes',cursive] text-4xl sm:text-6xl md:text-7xl font-normal leading-tight text-[var(--accent)]">
            <InlineEdit
              value={data.hero.brideName}
              onChange={(v) => onUpdateHero('brideName', v)}
              isEditable={isEditable}
              labelTooltip="Bride Full Name"
            />{' '}
            <span className="font-serif text-sm sm:text-xl tracking-normal text-[var(--muted)] align-middle">
              <InlineEdit
                value={data.hero.brideDegree}
                onChange={(v) => onUpdateHero('brideDegree', v)}
                isEditable={isEditable}
                labelTooltip="Bride Degree"
              />
            </span>
          </h2>

          {/* Bride Parents */}
          <p className="mt-2 mb-4 text-sm sm:text-base italic text-[var(--muted)]">
            <InlineEdit
              value={data.hero.brideParentage}
              onChange={(v) => onUpdateHero('brideParentage', v)}
              isEditable={isEditable}
              labelTooltip="Bride Father / Family"
            />
          </p>
        </div>

        <CardDivider />

        <div className="text-sm tracking-widest italic text-[var(--muted)]">
          <InlineEdit
            value={data.hero.closingWord}
            onChange={(v) => onUpdateHero('closingWord', v)}
            isEditable={isEditable}
            labelTooltip="Hero Closing Word"
          />
        </div>
      </section>

      {/* MONOGRAM SECTION */}
      <section className="relative z-20 text-center py-8 px-6 bg-gradient-to-b from-transparent via-[var(--cream)] to-transparent">
        <div className="flex items-center justify-center gap-3 text-[var(--gold)] opacity-70 text-lg mb-2">
          <span>❧</span>
          <span className="text-2xl">✿</span>
          <span>❧</span>
        </div>

        <div className="font-['Great_Vibes',cursive] text-5xl sm:text-7xl md:text-8xl text-[var(--accent)] leading-none flex items-center justify-center gap-2">
          <InlineEdit
            value={data.monogram.groomInitial}
            onChange={(v) => onUpdateMonogram('groomInitial', v)}
            isEditable={isEditable}
            labelTooltip="Groom Initial"
          />
          <span className="text-[var(--gold)] font-['Cormorant_Garamond',serif] italic text-[0.45em] px-2 font-serif">
            &amp;
          </span>
          <InlineEdit
            value={data.monogram.brideInitial}
            onChange={(v) => onUpdateMonogram('brideInitial', v)}
            isEditable={isEditable}
            labelTooltip="Bride Initial"
          />
        </div>

        <p className="max-w-[480px] mx-auto mt-3 italic text-[var(--muted)] text-base sm:text-lg leading-relaxed">
          <InlineEdit
            value={data.monogram.quote}
            onChange={(v) => onUpdateMonogram('quote', v)}
            isEditable={isEditable}
            multiline
            labelTooltip="Monogram Tagline / Quote"
          />
        </p>
      </section>

      {/* WEDDING EVENTS TIMELINE */}
      <section className="relative z-20 px-4 sm:px-12 py-12">
        <div className="text-center mb-10">
          <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-medium tracking-[0.1em] uppercase text-[var(--ink)]">
            <InlineEdit
              value={data.eventsTitle}
              onChange={onUpdateEventsTitle}
              isEditable={isEditable}
              labelTooltip="Events Section Header"
            />
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-[820px] mx-auto">
          {/* Vertical dividing center line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--line-soft)] via-[var(--gold)] to-[var(--line-soft)] -translate-x-1/2 pointer-events-none" />

          {/* Event items list */}
          <div className="space-y-8 md:space-y-0">
            {data.events.map((evt, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={evt.id}
                  className={`relative md:w-1/2 pl-14 pr-3 sm:pr-6 md:px-10 pb-10 ${
                    isEven
                      ? 'md:left-1/2 md:text-left'
                      : 'md:left-0 md:text-right md:pr-10 md:pl-0'
                  }`}
                >
                  {/* Timeline diamond node */}
                  <span
                    className={`absolute top-6 w-3.5 h-3.5 bg-[var(--paper)] border-2 border-[var(--gold)] rotate-45 z-10 ${
                      isEven
                        ? 'left-6 md:left-[-7px]'
                        : 'left-6 md:right-[-7px] md:left-auto'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Event Card */}
                  <div className="inline-block text-center p-6 sm:p-7 border border-[var(--line)] bg-[var(--cream)] shadow-sm max-w-[360px] w-full rounded-sm relative group">
                    {/* Event Delete action (only in Edit mode and if more than 1 event) */}
                    {isEditable && data.events.length > 1 && (
                      <button
                        onClick={() => onDeleteEvent(evt.id)}
                        className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Delete this event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Title */}
                    <h3 className="font-['Playfair_Display',serif] text-2xl tracking-wide text-[var(--ink)] m-0">
                      <InlineEdit
                        value={evt.name}
                        onChange={(v) => onUpdateEvent(evt.id, 'name', v)}
                        isEditable={isEditable}
                        labelTooltip="Event Name"
                      />{' '}
                      {evt.subtitle && (
                        <small className="text-sm font-normal text-[var(--muted)] font-serif block sm:inline">
                          <InlineEdit
                            value={evt.subtitle}
                            onChange={(v) => onUpdateEvent(evt.id, 'subtitle', v)}
                            isEditable={isEditable}
                            labelTooltip="Event Subtitle (e.g. Dinner)"
                          />
                        </small>
                      )}
                    </h3>

                    {/* Day */}
                    <div className="uppercase text-sm tracking-[0.18em] text-[var(--muted)] my-2">
                      <InlineEdit
                        value={evt.dayOfWeek}
                        onChange={(v) => onUpdateEvent(evt.id, 'dayOfWeek', v)}
                        isEditable={isEditable}
                        labelTooltip="Day of Week"
                      />
                    </div>

                    {/* Date big banner */}
                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="font-['Playfair_Display',serif] text-5xl leading-none text-[var(--accent)] font-semibold">
                        <InlineEdit
                          value={evt.dayNumber}
                          onChange={(v) => onUpdateEvent(evt.id, 'dayNumber', v)}
                          isEditable={isEditable}
                          labelTooltip="Day Number (e.g. 18)"
                        />
                      </div>
                      <div className="text-left leading-tight text-sm tracking-wider uppercase font-serif">
                        <strong className="block text-base text-[var(--ink)] font-semibold">
                          <InlineEdit
                            value={evt.month}
                            onChange={(v) => onUpdateEvent(evt.id, 'month', v)}
                            isEditable={isEditable}
                            labelTooltip="Month (e.g. October)"
                          />
                        </strong>
                        <span className="text-[var(--muted)]">
                          <InlineEdit
                            value={evt.year}
                            onChange={(v) => onUpdateEvent(evt.id, 'year', v)}
                            isEditable={isEditable}
                            labelTooltip="Year (e.g. 2026)"
                          />
                        </span>
                      </div>
                    </div>

                    {/* Hijri Date */}
                    <div className="text-sm italic text-[var(--muted)] mb-3">
                      <InlineEdit
                        value={evt.hijriDate}
                        onChange={(v) => onUpdateEvent(evt.id, 'hijriDate', v)}
                        isEditable={isEditable}
                        labelTooltip="Hijri Date / Time Reference"
                      />
                    </div>

                    {/* Venue & Timing */}
                    <p className="text-base sm:text-lg leading-relaxed text-[var(--ink)] mb-4">
                      <span className="block text-sm text-[var(--muted)] italic">
                        <InlineEdit
                          value={evt.timeAndDetails}
                          onChange={(v) => onUpdateEvent(evt.id, 'timeAndDetails', v)}
                          isEditable={isEditable}
                          labelTooltip="Event Time & Prayer Detail"
                        />
                      </span>
                      <strong className="block font-semibold text-lg text-[var(--accent)]">
                        <InlineEdit
                          value={evt.venueName}
                          onChange={(v) => onUpdateEvent(evt.id, 'venueName', v)}
                          isEditable={isEditable}
                          labelTooltip="Venue Name"
                        />
                      </strong>
                      <span className="block text-sm text-[var(--ink)]">
                        <InlineEdit
                          value={evt.venueAddress}
                          onChange={(v) => onUpdateEvent(evt.id, 'venueAddress', v)}
                          isEditable={isEditable}
                          labelTooltip="Venue Address"
                        />
                      </span>
                    </p>

                    {/* Google Map Link */}
                    {evt.mapsUrl && (
                      <a
                        href={evt.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold)] hover:text-white transition-colors text-xs tracking-wider uppercase font-serif"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        View Location
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Event Button in Edit Mode */}
          {isEditable && (
            <div className="text-center mt-6">
              <button
                onClick={onAddEvent}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--cream)] border border-dashed border-[var(--gold)] text-[var(--accent)] hover:bg-[var(--line-soft)] text-sm uppercase tracking-wider font-sans rounded transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Ceremony (e.g. Mehndi / Reception)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER & COUNTDOWN */}
      <footer className="relative z-20 text-center px-6 pb-16 pt-4">
        <p className="font-['Great_Vibes',cursive] text-3xl sm:text-4xl text-[var(--accent)] mb-1">
          <InlineEdit
            value={data.footer.complimentsHeader}
            onChange={(v) => onUpdateFooter('complimentsHeader', v)}
            isEditable={isEditable}
            labelTooltip="Compliments Header"
          />
        </p>
        <p className="text-base sm:text-lg italic text-[var(--muted)] m-0">
          <InlineEdit
            value={data.footer.complimentsFrom}
            onChange={(v) => onUpdateFooter('complimentsFrom', v)}
            isEditable={isEditable}
            labelTooltip="Relatives & Friends Text"
          />
        </p>

        {/* Live Countdown Clock */}
        <div className="max-w-[540px] mx-auto my-8 py-5 border-y border-[var(--line)]">
          <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] mb-3 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <InlineEdit
              value={data.footer.countdownLabel}
              onChange={(v) => onUpdateFooter('countdownLabel', v)}
              isEditable={isEditable}
              labelTooltip="Countdown Header Label"
            />
          </div>

          <div className="flex justify-center items-center gap-4 sm:gap-8">
            <div className="min-w-[58px]">
              <b className="block font-['Playfair_Display',serif] text-2xl sm:text-3xl font-medium text-[var(--ink)]">
                {String(timeLeft.days).padStart(2, '0')}
              </b>
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Days</span>
            </div>
            <span className="text-[var(--gold)] text-xl font-light">:</span>
            <div className="min-w-[58px]">
              <b className="block font-['Playfair_Display',serif] text-2xl sm:text-3xl font-medium text-[var(--ink)]">
                {String(timeLeft.hours).padStart(2, '0')}
              </b>
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Hours</span>
            </div>
            <span className="text-[var(--gold)] text-xl font-light">:</span>
            <div className="min-w-[58px]">
              <b className="block font-['Playfair_Display',serif] text-2xl sm:text-3xl font-medium text-[var(--ink)]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </b>
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Minutes</span>
            </div>
            <span className="text-[var(--gold)] text-xl font-light">:</span>
            <div className="min-w-[58px]">
              <b className="block font-['Playfair_Display',serif] text-2xl sm:text-3xl font-medium text-[var(--ink)]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </b>
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Seconds</span>
            </div>
          </div>

          {isEditable && (
            <p className="mt-2 text-[11px] text-[var(--muted)] font-sans">
              Countdown targets: {data.footer.countdownTargetIso} (configurable in Edit Panel)
            </p>
          )}
        </div>

        {/* Share Invitation button */}
        <div className="mt-6">
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold)] hover:text-white transition-all text-sm tracking-wider uppercase font-serif shadow-sm hover:shadow"
          >
            <Share2 className="w-4 h-4 text-[var(--gold)] group-hover:text-white" />
            Share Invitation via WhatsApp
          </a>
        </div>

        <a
          href="#top"
          className="inline-block mt-7 text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors uppercase tracking-widest font-sans"
        >
          ↑ Back to top
        </a>
      </footer>
    </article>
  );
};
