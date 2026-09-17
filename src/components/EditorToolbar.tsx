import React, { useState } from 'react';
import {
  Edit3,
  Eye,
  Sliders,
  Sparkles,
  CheckCircle2,
  DoorOpen,
  ChevronDown,
  RotateCcw,
  Palette,
} from 'lucide-react';
import { WeddingData, WeddingTheme } from '../types';
import { THEME_PRESETS } from '../data/defaultInvitation';

interface EditorToolbarProps {
  isEditable: boolean;
  onToggleEditable: () => void;
  onOpenDrawer: () => void;
  onReplayGate: () => void;
  onOpenFinalise: () => void;
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
  onReset: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isEditable,
  onToggleEditable,
  onOpenDrawer,
  onReplayGate,
  onOpenFinalise,
  currentThemeId,
  onSelectTheme,
  onReset,
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const currentTheme =
    THEME_PRESETS.find((t) => t.id === currentThemeId) || THEME_PRESETS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md text-white border-b border-white/10 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-lg font-sans">
      {/* Left: App title & Mode indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-['Great_Vibes',cursive] text-2xl text-amber-300 leading-none">
            I &amp; K
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-slate-300 font-semibold border-l border-white/20 pl-2">
            Invitation Studio
          </span>
        </div>

        {/* Edit / Preview Pill */}
        <div className="flex items-center bg-slate-800 rounded-full p-0.5 border border-white/10 text-xs">
          <button
            onClick={() => !isEditable && onToggleEditable()}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              isEditable
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Mode</span>
          </button>
          <button
            onClick={() => isEditable && onToggleEditable()}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              !isEditable
                ? 'bg-sky-500 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Final View</span>
          </button>
        </div>
      </div>

      {/* Center / Right: Quick Actions */}
      <div className="flex items-center gap-2">
        {/* Open Edit Drawer button */}
        <button
          onClick={onOpenDrawer}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-white/15 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Open complete details editor drawer"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Edit Details</span>
        </button>

        {/* Theme Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-white/15 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Change color theme"
          >
            <Palette className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden lg:inline">{currentTheme.name.split('&')[0]}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {showThemeMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowThemeMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-white/15 rounded-lg shadow-xl py-1 z-30 text-xs">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 border-b border-white/10 font-bold">
                  Color Themes
                </div>
                {THEME_PRESETS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTheme(t.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-700 transition-colors cursor-pointer ${
                      currentThemeId === t.id
                        ? 'text-amber-300 font-semibold bg-slate-700/50'
                        : 'text-slate-300'
                    }`}
                  >
                    <span>{t.name}</span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 ml-2"
                      style={{ backgroundColor: t.accent }}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Replay Gate Animation */}
        <button
          onClick={onReplayGate}
          className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-white/15 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Test entrance gate animation"
        >
          <DoorOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Gate Entrance</span>
        </button>

        {/* Finalise CTA */}
        <button
          onClick={onOpenFinalise}
          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          title="Finalise and export invitation"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Finalise</span>
        </button>
      </div>
    </header>
  );
};
