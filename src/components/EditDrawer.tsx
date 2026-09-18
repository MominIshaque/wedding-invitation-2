import React, { useState } from 'react';
import { WeddingData, WeddingEvent } from '../types';
import { THEME_PRESETS } from '../data/defaultInvitation';
import {
  X,
  Users,
  Calendar,
  FileText,
  Palette,
  Plus,
  Trash2,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface EditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onUpdateData: (updater: (prev: WeddingData) => WeddingData) => void;
  onReset: () => void;
  onFinaliseClick: () => void;
}

type TabType = 'couple' | 'events' | 'texts' | 'theme';

export const EditDrawer: React.FC<EditDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  onReset,
  onFinaliseClick,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('couple');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="relative w-full max-w-xl h-full bg-white text-slate-800 shadow-2xl flex flex-col z-10 font-sans animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <span>Card Details Editor</span>
              <span className="text-xs font-normal px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full">
                Live Preview
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates reflect instantly on the card.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onFinaliseClick}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded text-xs font-medium flex items-center gap-1 transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Finalise
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
              title="Close editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-3 gap-1 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('couple')}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'couple'
                ? 'border-sky-600 text-sky-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Couple &amp; Family
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'events'
                ? 'border-sky-600 text-sky-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Events ({data.events.length})
          </button>
          <button
            onClick={() => setActiveTab('texts')}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'texts'
                ? 'border-sky-600 text-sky-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Invocations &amp; Texts
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'theme'
                ? 'border-sky-600 text-sky-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Palette &amp; Themes
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* TAB 1: COUPLE & FAMILY */}
          {activeTab === 'couple' && (
            <div className="space-y-6">
              {/* Groom Section */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900">
                  Groom Information
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={data.hero.groomName}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, groomName: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={data.hero.groomDegree}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, groomDegree: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Father Lineage (S/o)
                  </label>
                  <input
                    type="text"
                    value={data.hero.groomParentage}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, groomParentage: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Grandfather Lineage
                  </label>
                  <input
                    type="text"
                    value={data.hero.groomGrandfather}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          groomGrandfather: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Bride Section */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                  Bride Information
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={data.hero.brideName}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, brideName: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={data.hero.brideDegree}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, brideDegree: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Parent Lineage (D/o)
                  </label>
                  <input
                    type="text"
                    value={data.hero.brideParentage}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, brideParentage: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Gate & Monogram Names */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Gate Display &amp; Monogram
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Short Groom Name (Gate)
                    </label>
                    <input
                      type="text"
                      value={data.gate.shortGroomName}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          gate: { ...prev.gate, shortGroomName: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Short Bride Name (Gate)
                    </label>
                    <input
                      type="text"
                      value={data.gate.shortBrideName}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          gate: { ...prev.gate, shortBrideName: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Groom Monogram Initial
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={data.monogram.groomInitial}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          monogram: {
                            ...prev.monogram,
                            groomInitial: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Bride Monogram Initial
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={data.monogram.brideInitial}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          monogram: {
                            ...prev.monogram,
                            brideInitial: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded text-center font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Monogram Family Quote
                  </label>
                  <textarea
                    rows={2}
                    value={data.monogram.quote}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        monogram: { ...prev.monogram, quote: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVENTS & CEREMONIES */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={data.eventsTitle}
                  onChange={(e) =>
                    onUpdateData((prev) => ({
                      ...prev,
                      eventsTitle: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-sky-500 focus:outline-none"
                />
              </div>

              {data.events.map((evt, idx) => (
                <div
                  key={evt.id}
                  className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 relative"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-semibold text-xs text-sky-900 uppercase tracking-wider">
                      Ceremony #{idx + 1}: {evt.name || 'Untitled'}
                    </span>
                    {data.events.length > 1 && (
                      <button
                        onClick={() =>
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.filter((e) => e.id !== evt.id),
                          }))
                        }
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Ceremony Name
                      </label>
                      <input
                        type="text"
                        value={evt.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.map((item) =>
                              item.id === evt.id ? { ...item, name: val } : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                        placeholder="e.g. Nikah, Walima"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Subtitle (optional)
                      </label>
                      <input
                        type="text"
                        value={evt.subtitle || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.map((item) =>
                              item.id === evt.id
                                ? { ...item, subtitle: val }
                                : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                        placeholder="e.g. (Dinner)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Day
                      </label>
                      <input
                        type="text"
                        value={evt.dayOfWeek}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.map((item) =>
                              item.id === evt.id
                                ? { ...item, dayOfWeek: val }
                                : item
                            ),
                          }));
                        }}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded"
                        placeholder="Sunday"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Date Num
                      </label>
                      <input
                        type="text"
                        value={evt.dayNumber}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.map((item) =>
                              item.id === evt.id
                                ? { ...item, dayNumber: val }
                                : item
                            ),
                          }));
                        }}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded"
                        placeholder="18"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Month
                      </label>
                      <input
                        type="text"
                        value={evt.month}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.map((item) =>
                              item.id === evt.id ? { ...item, month: val } : item
                            ),
                          }));
                        }}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded"
                        placeholder="October"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        value={evt.year}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.map((item) =>
                              item.id === evt.id ? { ...item, year: val } : item
                            ),
                          }));
                        }}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded"
                        placeholder="2026"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Hijri / Prayer Reference
                      </label>
                      <input
                        type="text"
                        value={evt.hijriDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.map((item) =>
                              item.id === evt.id
                                ? { ...item, hijriDate: val }
                                : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                        placeholder="6th Jamadiul Awwal 1448 H."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Time &amp; Details
                      </label>
                      <input
                        type="text"
                        value={evt.timeAndDetails}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateData((prev) => ({
                            ...prev,
                            events: prev.events.map((item) =>
                              item.id === evt.id
                                ? { ...item, timeAndDetails: val }
                                : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                        placeholder="after Namaz-e-Asar"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      value={evt.venueName}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateData((prev) => ({
                          ...prev,
                          events: prev.events.map((item) =>
                            item.id === evt.id ? { ...item, venueName: val } : item
                          ),
                        }));
                      }}
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                      placeholder="e.g. Jama Masjid"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Venue Address
                    </label>
                    <input
                      type="text"
                      value={evt.venueAddress}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateData((prev) => ({
                          ...prev,
                          events: prev.events.map((item) =>
                            item.id === evt.id
                              ? { ...item, venueAddress: val }
                              : item
                          ),
                        }));
                      }}
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                      placeholder="e.g. Buddi Lane, Aurangabad."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Google Maps URL
                    </label>
                    <input
                      type="text"
                      value={evt.mapsUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateData((prev) => ({
                          ...prev,
                          events: prev.events.map((item) =>
                            item.id === evt.id ? { ...item, mapsUrl: val } : item
                          ),
                        }));
                      }}
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const newEvt: WeddingEvent = {
                    id: `event-${Date.now()}`,
                    name: 'Reception',
                    subtitle: '',
                    dayOfWeek: 'Tuesday',
                    dayNumber: '20',
                    month: 'October',
                    year: '2026',
                    hijriDate: 'after Namaz-e-Isha (8:30 pm)',
                    timeAndDetails: '8:30 PM onwards',
                    venueName: 'Royal Palace Banquet',
                    venueAddress: 'Station Road, Aurangabad.',
                    mapsUrl:
                      'https://www.google.com/maps/search/?api=1&query=Aurangabad',
                  };
                  onUpdateData((prev) => ({
                    ...prev,
                    events: [...prev.events, newEvt],
                  }));
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-dashed border-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Another Ceremony
              </button>
            </div>
          )}

          {/* TAB 3: GUARDIANS & TEXTS */}
          {activeTab === 'texts' && (
            <div className="space-y-5">
              {/* Islamic Header */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Islamic Invocations
                </h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Bismillah (Arabic)
                  </label>
                  <input
                    type="text"
                    value={data.hero.bismillahArabic}
                    dir="rtl"
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          bismillahArabic: e.target.value,
                        },
                        gate: {
                          ...prev.gate,
                          bismillahArabic: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-base font-serif border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Bismillah Translation (English)
                  </label>
                  <input
                    type="text"
                    value={data.hero.bismillahEnglish}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          bismillahEnglish: e.target.value,
                        },
                        gate: {
                          ...prev.gate,
                          bismillahEnglish: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Closing Word
                  </label>
                  <input
                    type="text"
                    value={data.hero.closingWord}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, closingWord: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                    placeholder="Insha'Allah"
                  />
                </div>
              </div>

              {/* Parents Request Lines */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Invitation Request Body
                </h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Inviting Parents &amp; Graceful Presence Note
                  </label>
                  <textarea
                    rows={4}
                    value={data.hero.invitersText}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, invitersText: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                  />
                </div>
              </div>

              {/* Compliments & Countdown */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Compliments &amp; Countdown Target
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Compliments Heading
                    </label>
                    <input
                      type="text"
                      value={data.footer.complimentsHeader}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            complimentsHeader: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Compliments Line
                    </label>
                    <input
                      type="text"
                      value={data.footer.complimentsFrom}
                      onChange={(e) =>
                        onUpdateData((prev) => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            complimentsFrom: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Countdown Target ISO (e.g. 2026-10-18T16:30:00+05:30)
                  </label>
                  <input
                    type="text"
                    value={data.footer.countdownTargetIso}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          countdownTargetIso: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    WhatsApp Share Message
                  </label>
                  <textarea
                    rows={2}
                    value={data.footer.shareMessageTemplate}
                    onChange={(e) =>
                      onUpdateData((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          shareMessageTemplate: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PALETTE & THEMES */}
          {activeTab === 'theme' && (
            <div className="space-y-5">
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Theme Palette
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = data.themeId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() =>
                          onUpdateData((prev) => ({
                            ...prev,
                            themeId: preset.id,
                          }))
                        }
                        className={`p-3.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/60 ring-2 ring-sky-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-sm text-slate-900">
                            {preset.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span
                              className="w-5 h-5 rounded-full border border-black/10"
                              style={{ backgroundColor: preset.ink }}
                              title="Text Ink"
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-black/10"
                              style={{ backgroundColor: preset.accent }}
                              title="Accent"
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-black/10"
                              style={{ backgroundColor: preset.gold }}
                              title="Gold Ornaments"
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-black/10"
                              style={{ backgroundColor: preset.cream }}
                              title="Cream Card Background"
                            />
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dark Mode toggle */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">
                    Night Mode / Dark Theme
                  </p>
                  <p className="text-xs text-slate-500">
                    Switch between royal light parchment and midnight dark view.
                  </p>
                </div>
                <button
                  onClick={() =>
                    onUpdateData((prev) => ({
                      ...prev,
                      isDarkMode: !prev.isDarkMode,
                    }))
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    data.isDarkMode ? 'bg-sky-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      data.isDarkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Original Details
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded text-xs font-medium transition-colors cursor-pointer"
            >
              Close Editor
            </button>
            <button
              onClick={onFinaliseClick}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Finalise &amp; Export
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
