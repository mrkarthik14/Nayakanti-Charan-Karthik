import React, { useState } from 'react';
import { DayMeta, AppInteractions } from '../../types';
import { CHOCOLATE_ITEMS } from '../../data/daysData';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface ChocolateDayViewProps {
  meta: DayMeta;
  partnerName: string;
  senderName: string;
  data: AppInteractions['chocolate'];
  onUpdate: (data: Partial<AppInteractions['chocolate']>) => void;
  onMarkCompleted: () => void;
}

export const ChocolateDayView: React.FC<ChocolateDayViewProps> = ({
  meta,
  partnerName,
  senderName,
  data,
  onUpdate,
  onMarkCompleted,
}) => {
  const [unwrapped, setUnwrapped] = useState<string[]>(data.unwrappedIds || []);
  const [selectedChoc, setSelectedChoc] = useState<string>(
    CHOCOLATE_ITEMS[0].id
  );

  const handleUnwrap = (id: string) => {
    soundFx.playPop();
    let updated = [...unwrapped];
    if (!updated.includes(id)) {
      updated.push(id);
      setUnwrapped(updated);
      onUpdate({ unwrappedIds: updated });
    }
    setSelectedChoc(id);

    if (updated.length === CHOCOLATE_ITEMS.length) {
      soundFx.playLoveHarp();
      onMarkCompleted();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7B4B27', '#E6BE8A', '#800E26', '#FFD9E2'],
      });
    }
  };

  const activeItem = CHOCOLATE_ITEMS.find((c) => c.id === selectedChoc) || CHOCOLATE_ITEMS[0];
  const allTasted = unwrapped.length === CHOCOLATE_ITEMS.length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Title & Tamil Endearment */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] text-xs font-semibold">
          <span className="material-symbols-rounded text-sm">cake</span>
          <span>Day 3 · {meta.date} · {meta.tamilTitle}</span>
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
            <span className="material-symbols-rounded text-2xl">cookie</span>
          </div>
          <div className="space-y-3">
            <h3 className="m3-title-large text-[var(--md-sys-color-on-surface)]">
              Sweetest Moments of Life
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

      {/* 3. Artisan Chocolate Box Container */}
      <div className="rounded-[28px] bg-[var(--md-sys-color-surface-container)] p-6 sm:p-8 border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--md-sys-color-outline-variant)]/30 pb-4">
          <div>
            <h4 className="m3-title-medium text-[var(--md-sys-color-on-surface)]">
              Artisan Chocolate Selection for {partnerName || 'Thangam'}
            </h4>
            <p className="text-xs text-[var(--md-sys-color-outline)]">
              Tap each chocolate to unwrap its secret loving memory
            </p>
          </div>
          {/* Progress chip */}
          <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] text-xs font-semibold flex items-center gap-1.5">
            <span className="material-symbols-rounded text-sm">done_all</span>
            <span>Tasted {unwrapped.length} of {CHOCOLATE_ITEMS.length}</span>
          </div>
        </div>

        {/* 4 Chocolates Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHOCOLATE_ITEMS.map((choc, idx) => {
            const isUnwrapped = unwrapped.includes(choc.id);
            const isSelected = selectedChoc === choc.id;

            return (
              <button
                key={choc.id}
                onClick={() => handleUnwrap(choc.id)}
                className={`relative group rounded-2xl p-4 transition-all duration-300 flex flex-col items-center text-center border ${
                  isSelected
                    ? 'bg-[var(--md-sys-color-surface-container-highest)] border-[var(--md-sys-color-primary)] shadow-md scale-105'
                    : 'bg-[var(--md-sys-color-surface)] border-[var(--md-sys-color-outline-variant)]/40 hover:bg-[var(--md-sys-color-surface-container-high)]'
                }`}
              >
                {/* Number tag */}
                <span className="text-[10px] uppercase font-bold text-[var(--md-sys-color-outline)] tracking-wider mb-2">
                  Piece {idx + 1}
                </span>

                {/* Chocolate Visual */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center my-2">
                  {isUnwrapped ? (
                    /* Unwrapped Delicacy */
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-md flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:rotate-6"
                      style={{ backgroundColor: choc.color }}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-dashed opacity-60 flex items-center justify-center text-[10px] text-white font-bold"
                        style={{ borderColor: choc.accent }}
                      >
                        ♥
                      </div>
                    </div>
                  ) : (
                    /* Wrapped with Gold/Silver Foil */
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#D4AF37] via-[#FFF3B0] to-[#AA771C] shadow-md flex flex-col items-center justify-center border border-amber-200 animate-pulse">
                      <span className="material-symbols-rounded text-lg text-amber-900">
                        lock
                      </span>
                      <span className="text-[9px] uppercase font-bold text-amber-950">
                        Tap Foil
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold text-[var(--md-sys-color-on-surface)]">
                    {choc.name}
                  </div>
                  <div className="text-[10px] text-[var(--md-sys-color-outline)] font-medium">
                    {choc.tamilTitle}
                  </div>
                </div>

                {isUnwrapped && (
                  <span className="mt-2 text-[10px] font-semibold text-[var(--md-sys-color-primary)] flex items-center gap-1">
                    <span className="material-symbols-rounded text-xs">sentiment_satisfied</span>
                    <span>Tasted</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Chocolate Detail Card */}
        {activeItem && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--md-sys-color-surface-container-high)] border border-[var(--md-sys-color-outline-variant)]/30 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--md-sys-color-primary)]">
                Flavor Profile: {activeItem.flavour}
              </span>
              <span className="text-xs font-semibold text-[var(--md-sys-color-outline)]">
                {activeItem.tamilTitle}
              </span>
            </div>
            <p className="text-sm text-[var(--md-sys-color-on-surface)] leading-relaxed italic">
              "{activeItem.message}"
            </p>
          </div>
        )}

        {/* Unlocked Reward upon tasting all 4 */}
        {allTasted && (
          <div className="p-4 rounded-2xl bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] border border-[var(--md-sys-color-primary)]/30 text-center space-y-1.5 animate-in zoom-in-95">
            <div className="font-bold text-sm flex items-center justify-center gap-1.5">
              <span className="material-symbols-rounded text-lg text-[var(--md-sys-color-primary)]">
                workspace_premium
              </span>
              <span>All Sweet Memories Unwrapped!</span>
            </div>
            <p className="text-xs opacity-90">
              "No chocolate in the universe holds a fraction of the sweetness you pour into my life, {partnerName || 'Thangam'}."
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
