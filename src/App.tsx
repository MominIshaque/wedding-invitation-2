import React, { useState, useEffect, useMemo } from 'react';
import { WeddingData, WeddingEvent } from './types';
import { DEFAULT_INVITATION_DATA, THEME_PRESETS } from './data/defaultInvitation';
import { OrnamentSymbols } from './components/Ornaments';
import { GateScreen } from './components/GateScreen';
import { InvitationCard } from './components/InvitationCard';
import { EditorToolbar } from './components/EditorToolbar';
import { EditDrawer } from './components/EditDrawer';
import { FinaliseModal } from './components/FinaliseModal';
import { Edit3, CheckCircle2, Sliders, Sparkles, MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'wedding_invitation_data_v2';

export default function App() {
  // Load initial data with localStorage fallback
  const [data, setData] = useState<WeddingData>(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('wedding_invitation_data_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.hero) {
          delete parsed.hero.guardianLabel;
          delete parsed.hero.guardianName;
          delete parsed.hero.guardianDegree;
        }
        return {
          ...DEFAULT_INVITATION_DATA,
          ...parsed,
          hero: {
            ...DEFAULT_INVITATION_DATA.hero,
            ...(parsed.hero || {}),
          },
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_INVITATION_DATA;
  });

  // Mode states - Final published application starts in clean Guest view
  const [isEditable, setIsEditable] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('edit') === 'true' || params.get('mode') === 'edit';
    }
    return false;
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isFinaliseModalOpen, setIsFinaliseModalOpen] = useState<boolean>(false);
  // Gate starts closed on initial load so visitors experience the royal entrance gate
  const [isGateOpen, setIsGateOpen] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setHasUnsavedChanges(true);
      const timer = setTimeout(() => setHasUnsavedChanges(false), 1200);
      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, [data]);

  // Compute theme styles
  const activeTheme = useMemo(() => {
    return THEME_PRESETS.find((t) => t.id === data.themeId) || THEME_PRESETS[0];
  }, [data.themeId]);

  const themeCssVariables = useMemo(() => {
    if (data.isDarkMode) {
      return {
        '--ink': '#e4eff7',
        '--muted': '#a9c4d8',
        '--gold': activeTheme.gold,
        '--accent': '#9ecbe8',
        '--paper': '#0f1e2b',
        '--cream': '#16283a',
        '--line': 'rgba(127,184,222,0.32)',
        '--line-soft': 'rgba(127,184,222,0.16)',
        '--shadow': '0 26px 90px rgba(0,0,0,0.6)',
        '--page-1': '#0a161f',
        '--page-2': '#101f2c',
        '--gate-bg': '#0f1e2b',
        '--gate-bg-2': '#16283a',
        '--gate-line': 'rgba(127,184,222,0.45)',
        '--gate-ink': '#e4eff7',
      } as React.CSSProperties;
    }

    return {
      '--ink': activeTheme.ink,
      '--muted': activeTheme.muted,
      '--gold': activeTheme.gold,
      '--accent': activeTheme.accent,
      '--paper': activeTheme.paper,
      '--cream': activeTheme.cream,
      '--line': activeTheme.line,
      '--line-soft': activeTheme.lineSoft,
      '--shadow': '0 26px 80px rgba(40,80,110,0.16)',
      '--page-1': activeTheme.page1,
      '--page-2': activeTheme.page2,
      '--gate-bg': activeTheme.gateBg,
      '--gate-bg-2': activeTheme.gateBg2,
      '--gate-line': activeTheme.gateLine,
      '--gate-ink': activeTheme.gateInk,
    } as React.CSSProperties;
  }, [activeTheme, data.isDarkMode]);

  // Update handlers
  const handleUpdateGate = (field: keyof WeddingData['gate'], val: string) => {
    setData((prev) => ({
      ...prev,
      gate: { ...prev.gate, [field]: val },
    }));
  };

  const handleUpdateHero = (field: keyof WeddingData['hero'], val: string) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: val },
    }));
  };

  const handleUpdateMonogram = (field: keyof WeddingData['monogram'], val: string) => {
    setData((prev) => ({
      ...prev,
      monogram: { ...prev.monogram, [field]: val },
    }));
  };

  const handleUpdateFooter = (field: keyof WeddingData['footer'], val: string) => {
    setData((prev) => ({
      ...prev,
      footer: { ...prev.footer, [field]: val },
    }));
  };

  const handleUpdateEventsTitle = (val: string) => {
    setData((prev) => ({ ...prev, eventsTitle: val }));
  };

  const handleUpdateEvent = (id: string, field: keyof WeddingEvent, val: string) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    }));
  };

  const handleAddEvent = () => {
    const newEvt: WeddingEvent = {
      id: `event-${Date.now()}`,
      name: 'Reception',
      subtitle: '',
      dayOfWeek: 'Tuesday',
      dayNumber: '20',
      month: 'October',
      year: '2026',
      hijriDate: 'after Namaz-e-Isha (8:00 pm)',
      timeAndDetails: '8:00 PM onwards',
      venueName: 'Royal Palace Banquet',
      venueAddress: 'Station Road, Aurangabad.',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aurangabad',
    };
    setData((prev) => ({
      ...prev,
      events: [...prev.events, newEvt],
    }));
  };

  const handleDeleteEvent = (id: string) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset all invitation details back to original template?')) {
      setData(DEFAULT_INVITATION_DATA);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  // WhatsApp Floating Share URL
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${data.footer.shareMessageTemplate}\n${typeof window !== 'undefined' ? window.location.href : ''}`
  )}`;

  return (
    <div
      style={themeCssVariables}
      className="min-h-screen text-[var(--ink)] transition-colors duration-300 relative flex flex-col font-serif select-auto"
    >
      {/* Background radial gradients matching wedding card theme */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(164,123,75,0.09), transparent 25%),
            radial-gradient(circle at 85% 80%, rgba(112,65,65,0.08), transparent 28%),
            linear-gradient(var(--page-1), var(--page-2))
          `,
        }}
      />

      {/* SVG Definitions for Ornaments */}
      <OrnamentSymbols />

      {/* Top Floating Control Bar - Only visible in Edit Mode */}
      {isEditable && (
        <EditorToolbar
          isEditable={isEditable}
          onToggleEditable={() => setIsEditable(!isEditable)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onReplayGate={() => setIsGateOpen(false)}
          onOpenFinalise={() => setIsFinaliseModalOpen(true)}
          currentThemeId={data.themeId}
          onSelectTheme={(themeId) => setData((prev) => ({ ...prev, themeId }))}
          onReset={handleReset}
        />
      )}

      {/* Edit Mode Notice Banner */}
      {isEditable && (
        <div className="bg-amber-50/90 backdrop-blur-xs border-b border-amber-200 text-amber-950 px-4 py-2 text-xs font-sans flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-semibold">Edit Mode Active:</span>
            <span className="hidden sm:inline">
              Click directly on any name, ceremony, or date below to edit in real time, or open the detailed editor.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sliders className="w-3 h-3" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={() => setIsFinaliseModalOpen(true)}
              className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Finalise</span>
            </button>
          </div>
        </div>
      )}

      {/* Animated Entrance Gate Screen */}
      <GateScreen
        data={data}
        isOpen={isGateOpen}
        onOpen={() => setIsGateOpen(true)}
        isEditable={isEditable}
        onUpdateGate={handleUpdateGate}
      />

      {/* Main Wedding Invitation Card */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <InvitationCard
          data={data}
          isEditable={isEditable}
          onUpdateHero={handleUpdateHero}
          onUpdateMonogram={handleUpdateMonogram}
          onUpdateFooter={handleUpdateFooter}
          onUpdateEventsTitle={handleUpdateEventsTitle}
          onUpdateEvent={handleUpdateEvent}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onReplayGate={() => setIsGateOpen(false)}
        />
      </main>

      {/* Floating WhatsApp Action Button */}
      {isGateOpen && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-5 bottom-5 z-40 w-13 h-13 rounded-full bg-[var(--gold)] hover:bg-[var(--accent)] text-white flex items-center justify-center shadow-xl transition-transform hover:-translate-y-1 active:scale-95 no-print"
          title="Share invitation via WhatsApp"
          aria-label="Share invitation via WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      )}

      {/* Edit Drawer Panel */}
      <EditDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={data}
        onUpdateData={setData}
        onReset={handleReset}
        onFinaliseClick={() => {
          setIsDrawerOpen(false);
          setIsFinaliseModalOpen(true);
        }}
      />

      {/* Finalise & Export Modal */}
      <FinaliseModal
        isOpen={isFinaliseModalOpen}
        onClose={() => setIsFinaliseModalOpen(false)}
        data={data}
        onEnterGuestMode={() => setIsEditable(false)}
      />
    </div>
  );
}
