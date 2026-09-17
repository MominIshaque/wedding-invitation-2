import React, { useState } from 'react';
import { WeddingData } from '../types';
import { generateStandaloneHtml } from '../utils/exportHtml';
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  Eye,
  FileCode,
  Share2,
} from 'lucide-react';

interface FinaliseModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onEnterGuestMode: () => void;
}

export const FinaliseModal: React.FC<FinaliseModalProps> = ({
  isOpen,
  onClose,
  data,
  onEnterGuestMode,
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  if (!isOpen) return null;

  // Handle Download HTML
  const handleDownloadHtml = () => {
    const htmlContent = generateStandaloneHtml(data);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding-invitation-${data.gate.shortGroomName.toLowerCase()}-${data.gate.shortBrideName.toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Copy WhatsApp Text
  const handleCopyWhatsApp = async () => {
    const eventsText = data.events
      .map(
        (e) =>
          `✨ *${e.name} ${e.subtitle || ''}*\n🗓️ ${e.dayOfWeek}, ${e.dayNumber} ${e.month} ${e.year} (${e.hijriDate})\n⏰ ${e.timeAndDetails}\n📍 *${e.venueName}*, ${e.venueAddress}\n`
      )
      .join('\n');

    const message = `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ\n\n*Wedding Invitation*\n\n${data.hero.invitersText}\n\n🤵 *${data.hero.groomName} ${data.hero.groomDegree}*\n${data.hero.groomParentage} ${data.hero.groomGrandfather}\n\nWITH\n\n👰 *${data.hero.brideName} ${data.hero.brideDegree}*\n${data.hero.brideParentage}\n\n💍 *Wedding Celebrations:*\n${eventsText}\n\nWith Best Compliments from:\n${data.footer.complimentsFrom}\n\nInsha'Allah!`;

    await navigator.clipboard.writeText(message);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  // Handle Copy Raw HTML
  const handleCopyRawHtml = async () => {
    const htmlContent = generateStandaloneHtml(data);
    await navigator.clipboard.writeText(htmlContent);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  // Handle Print / PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden z-10 font-sans border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <span>Finalise &amp; Export Invitation</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ready to share with family, guests, and relatives.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Options */}
        <div className="p-6 space-y-4">
          {/* Action 1: Download Standalone HTML */}
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 hover:bg-sky-50 transition-colors flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-sky-950 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-sky-600" />
                Download Standalone HTML File
              </h3>
              <p className="text-xs text-slate-600">
                Single self-contained file with gate animation, countdown, and
                styling. Open in any browser or host anywhere!
              </p>
            </div>
            <button
              onClick={handleDownloadHtml}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors shadow-xs cursor-pointer"
            >
              Download
            </button>
          </div>

          {/* Action 2: Copy WhatsApp Message */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-emerald-600" />
                Copy WhatsApp Invitation Text
              </h3>
              <p className="text-xs text-slate-500">
                Formatted text with emojis, bride &amp; groom details, and
                dates for quick WhatsApp sending.
              </p>
            </div>
            <button
              onClick={handleCopyWhatsApp}
              className={`px-4 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
                copiedText
                  ? 'bg-emerald-600 text-white'
                  : 'border border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Text
                </>
              )}
            </button>
          </div>

          {/* Action 3: View Pristine Guest Preview */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-purple-600" />
                View as Guest (Clean Preview)
              </h3>
              <p className="text-xs text-slate-500">
                Hide all edit markers and toolbars to view the final pristine
                invitation card.
              </p>
            </div>
            <button
              onClick={() => {
                onEnterGuestMode();
                onClose();
              }}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer"
            >
              Preview
            </button>
          </div>

          {/* Action 4: Print / Save PDF & Copy HTML */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handlePrint}
              className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Print / Save PDF
            </button>
            <button
              onClick={handleCopyRawHtml}
              className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-slate-500" />
              {copiedHtml ? 'Copied HTML!' : 'Copy Raw HTML'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
