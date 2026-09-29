import React, { useState } from 'react';
import { DayMeta, AppInteractions } from '../../types';
import { VOWS_LIST } from '../../data/daysData';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface PromiseDayViewProps {
  meta: DayMeta;
  partnerName: string;
  senderName: string;
  data: AppInteractions['promise'];
  onUpdate: (data: Partial<AppInteractions['promise']>) => void;
  onMarkCompleted: () => void;
}

export const PromiseDayView: React.FC<PromiseDayViewProps> = ({
  meta,
  partnerName,
  senderName,
  data,
  onUpdate,
  onMarkCompleted,
}) => {
  const [sealed, setSealed] = useState<string[]>(data.sealedVows || []);
  const [customVow, setCustomVow] = useState<string>(data.customVow || '');
  const [customSealed, setCustomSealed] = useState<boolean>(
    data.sealedVows?.includes('custom_vow') || false
  );

  const toggleSeal = (vowId: string) => {
    soundFx.playSealStamp();
    let updated = [...sealed];
    if (updated.includes(vowId)) {
      updated = updated.filter((id) => id !== vowId);
    } else {
      updated.push(vowId);
    }
    setSealed(updated);
    onUpdate({ sealedVows: updated, customVow });

    if (updated.length >= 3) {
      onMarkCompleted();
    }
    if (updated.length === VOWS_LIST.length) {
      soundFx.playLoveHarp();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#BA1A48', '#7D5700', '#FFDEAC', '#FFD9DF'],
      });
    }
  };

  const handleSealCustom = () => {
    if (!customVow.trim()) return;
    soundFx.playSealStamp();
    setCustomSealed(true);
    let updated = [...sealed];
    if (!updated.includes('custom_vow')) {
      updated.push('custom_vow');
    }
    setSealed(updated);
    onUpdate({ sealedVows: updated, customVow });
    onMarkCompleted();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Title & Tamil Endearment */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] text-xs font-semibold">
          <span className="material-symbols-rounded text-sm">handshake</span>
          <span>Day 5 · {meta.date} · {meta.tamilTitle}</span>
        </div>
        <h2 className="m3-display-small text-[var(--md-sys-color-on-surface)]">
          {meta.title}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-[var(--md-sys-color-secondary)] tracking-wide">
          {meta.tamilMeaning}
        </p>
      </div>

      {/* 2. Main Romantic Message Card */}
      <div className="relative rounded-[28px] bg-[var(--md-sys-color-surface-container-low)] p-6 sm:p-8 shadow-[var(--md-sys-elevation-1)] border border-[var(--md-sys-color-outline-variant)]/40 overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] flex-shrink-0 flex items-center justify-center shadow-sm">
            <span className="material-symbols-rounded text-2xl">verified_user</span>
          </div>
          <div className="space-y-3">
            <h3 className="m3-title-large text-[var(--md-sys-color-on-surface)]">
              Sacred Vows Etched in Time
            </h3>
            <p className="m3-body-large text-[var(--md-sys-color-on-surface-variant)] leading-relaxed">
              {meta.romanticMessage(partnerName)}
            </p>
            <div className="p-3 sm:p-4 rounded-2xl bg-[var(--md-sys-color-surface-container)] border-l-4 border-[var(--md-sys-color-primary)] space-y-1">
              <p className="font-serif-quote italic text-sm sm:text-base text-[var(--md-sys-color-on-surface)]">
                "{meta.poeticVerseTamil}"
              </p>
              <p className="text-xs text-[var(--md-sys-color-outline)] font-medium">
                — {meta.poeticVerseEnglish}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Vows List with Wax Stamp Sealing */}
      <div className="rounded-[28px] bg-[var(--md-sys-color-surface-container)] p-6 sm:p-8 border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--md-sys-color-outline-variant)]/30 pb-4">
          <div>
            <h4 className="m3-title-medium text-[var(--md-sys-color-on-surface)]">
              Vows for {partnerName || 'Uyire'}
            </h4>
            <p className="text-xs text-[var(--md-sys-color-outline)]">
              Tap the wax seal button beside each promise to stamp it with devotion
            </p>
          </div>
          <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] text-xs font-semibold flex items-center gap-1.5">
            <span className="material-symbols-rounded text-sm">approval</span>
            <span>{sealed.length} of {VOWS_LIST.length + 1} Vows Sealed</span>
          </div>
        </div>

        {/* The 4 Curated Sacred Vows */}
        <div className="space-y-3.5">
          {VOWS_LIST.map((vow) => {
            const isSealed = sealed.includes(vow.id);

            return (
              <div
                key={vow.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSealed
                    ? 'bg-[var(--md-sys-color-surface-container-high)] border-[var(--md-sys-color-primary)] shadow-xs'
                    : 'bg-[var(--md-sys-color-surface)] border-[var(--md-sys-color-outline-variant)]/40 hover:bg-[var(--md-sys-color-surface-container-low)]'
                }`}
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--md-sys-color-primary)]">
                      {vow.title}
                    </span>
                    <span className="text-[11px] text-[var(--md-sys-color-outline)] font-medium">
                      ({vow.tamilTitle})
                    </span>
                  </div>
                  <p className="text-sm text-[var(--md-sys-color-on-surface)] leading-relaxed">
                    "{vow.text}"
                  </p>
                </div>

                {/* Wax Stamp Seal Button */}
                <button
                  onClick={() => toggleSeal(vow.id)}
                  className={`m3-state-layer flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-xs ${
                    isSealed
                      ? 'bg-[#8C1D30] text-white shadow-sm ring-2 ring-[#BA1A48]/40'
                      : 'bg-[var(--md-sys-color-surface-container-highest)] hover:bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-surface-variant)]'
                  }`}
                  title="Click to stamp wax seal"
                >
                  <span className="material-symbols-rounded text-base">
                    {isSealed ? 'verified' : 'history_edu'}
                  </span>
                  <span>{isSealed ? 'SEALED WITH LOVE' : 'Stamp Wax Seal'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* 5th Vow: Custom Vow by User */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--md-sys-color-surface-container-high)] border border-[var(--md-sys-color-outline-variant)]/40 space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-base text-[var(--md-sys-color-primary)]">
              edit_note
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--md-sys-color-primary)]">
              Personal Vow from {senderName || 'Your Heart'} to {partnerName || 'Uyire'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={customVow}
              onChange={(e) => setCustomVow(e.target.value)}
              placeholder="e.g., I promise to make you chai whenever you are tired and love you without conditions."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)] text-xs text-[var(--md-sys-color-on-surface)] outline-none focus:border-[var(--md-sys-color-primary)] focus:ring-1 focus:ring-[var(--md-sys-color-primary)]"
            />
            <button
              onClick={handleSealCustom}
              disabled={!customVow.trim()}
              className={`m3-state-layer px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                customSealed
                  ? 'bg-[#8C1D30] text-white'
                  : customVow.trim()
                  ? 'bg-[var(--md-sys-color-primary)] text-white hover:shadow-md'
                  : 'bg-black/10 text-black/40 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-rounded text-sm">
                {customSealed ? 'verified' : 'history_edu'}
              </span>
              <span>{customSealed ? 'SEALED' : 'Seal My Vow'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
