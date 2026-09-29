import React, { useState } from 'react';
import { DayMeta, AppInteractions } from '../../types';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface ValentineDayViewProps {
  meta: DayMeta;
  partnerName: string;
  senderName: string;
  interactions: AppInteractions;
  onMarkCompleted: () => void;
}

export const ValentineDayView: React.FC<ValentineDayViewProps> = ({
  meta,
  partnerName,
  senderName,
  interactions,
  onMarkCompleted,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const displayPartner = partnerName || 'En Anbe';
  const displaySender = senderName || 'Your Devoted Valentine';

  const triggerCelebration = () => {
    soundFx.playLoveHarp();
    onMarkCompleted();

    // Multistage grand fireworks confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#BA1A48', '#FF758F', '#7D5700', '#FFDEAC', '#FFD9DF', '#FFFFFF'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleCopyLetter = () => {
    soundFx.playChime(1.3);
    const letter = `Happy Valentine's Day, ${displayPartner}! ❤️\n\n` +
      `"You are the poetry my soul hummed long before I learned the words. Nee En Vaanam (நீ என் வானம் - You are my endless sky).\n\n` +
      `Throughout our Valentine's journey:\n` +
      `🌹 Rose Presented: ${interactions.rose.selectedColor.toUpperCase()} Rose with ${interactions.rose.petalsGathered} petals\n` +
      `💍 Proposal: ${interactions.propose.accepted ? 'YES! Infinite Love (' + interactions.propose.loveLevel + '%)' : 'Forever in Heart'}\n` +
      `🍫 Sweet Moments: ${interactions.chocolate.unwrappedIds.length} Artisan Chocolates Shared\n` +
      `🧸 Cuddles Given: ${interactions.teddy.squeezes} Warm Heartbeats\n` +
      `📜 Vows Sealed: ${interactions.promise.sealedVows.length} Sacred Promises\n` +
      `🤗 Hugs Delivered: ${interactions.hug.totalHugsGiven || 1} Soul Embraces\n\n` +
      `With all my heart,\n${displaySender}`;

    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Title & Tamil Endearment */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] text-xs font-semibold">
          <span className="material-symbols-rounded text-sm">stars</span>
          <span>Day 7 · {meta.date} · {meta.tamilTitle}</span>
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
            <span className="material-symbols-rounded text-2xl">favorite</span>
          </div>
          <div className="space-y-3">
            <h3 className="m3-title-large text-[var(--md-sys-color-on-surface)]">
              The Grand Celebration of Our Love
            </h3>
            <p className="m3-body-large text-[var(--md-sys-color-on-surface-variant)] leading-relaxed">
              {meta.romanticMessage(displayPartner)}
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

      {/* 3. Love Journey Summary & Interactive Certificate */}
      <div className="rounded-[28px] bg-gradient-to-b from-[var(--md-sys-color-surface-container)] to-[var(--md-sys-color-surface-container-high)] p-6 sm:p-10 border-2 border-[var(--md-sys-color-tertiary-container)] shadow-[var(--md-sys-elevation-2)] relative overflow-hidden">
        
        {/* Certificate Watermark / Background Motifs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--md-sys-color-primary-container)]/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[var(--md-sys-color-tertiary-container)]/30 blur-2xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 border-b border-[var(--md-sys-color-outline-variant)]/40 pb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--md-sys-color-tertiary-container)] text-[var(--md-sys-color-on-tertiary-container)] shadow-sm mx-auto mb-1">
            <span className="material-symbols-rounded text-3xl text-[var(--md-sys-color-tertiary)]">
              workspace_premium
            </span>
          </div>
          <span className="text-xs uppercase tracking-widest font-extrabold text-[var(--md-sys-color-tertiary)]">
            Official Valentine's Week Passport
          </span>
          <h3 className="font-serif-quote text-2xl sm:text-3xl font-bold text-[var(--md-sys-color-on-surface)]">
            Certificate of Eternal Affection
          </h3>
          <p className="text-xs sm:text-sm text-[var(--md-sys-color-outline)]">
            Conferred with unconditional love upon <strong>{displayPartner}</strong> by <strong>{displaySender}</strong>
          </p>
        </div>

        {/* Synthesis of 6 Days Interactions */}
        <div className="py-6 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          
          {/* Day 1: Rose Summary */}
          <div className="p-3.5 rounded-2xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)]/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--md-sys-color-primary)]">
              <span className="material-symbols-rounded text-base">local_florist</span>
              <span>Rose Day</span>
            </div>
            <div className="text-xs font-semibold text-[var(--md-sys-color-on-surface)] capitalize">
              {interactions.rose.selectedColor} Rose
            </div>
            <p className="text-[11px] text-[var(--md-sys-color-outline)]">
              {interactions.rose.petalsGathered} petals bloomed for {displayPartner}
            </p>
          </div>

          {/* Day 2: Propose Summary */}
          <div className="p-3.5 rounded-2xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)]/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--md-sys-color-primary)]">
              <span className="material-symbols-rounded text-base">diamond</span>
              <span>Propose Day</span>
            </div>
            <div className="text-xs font-semibold text-[var(--md-sys-color-on-surface)]">
              {interactions.propose.accepted ? 'Answer: YES! (ஆம்)' : 'Question Awaiting'}
            </div>
            <p className="text-[11px] text-[var(--md-sys-color-outline)]">
              Love Intensity: {interactions.propose.loveLevel}%
            </p>
          </div>

          {/* Day 3: Chocolate Summary */}
          <div className="p-3.5 rounded-2xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)]/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--md-sys-color-primary)]">
              <span className="material-symbols-rounded text-base">cake</span>
              <span>Chocolate Day</span>
            </div>
            <div className="text-xs font-semibold text-[var(--md-sys-color-on-surface)]">
              {interactions.chocolate.unwrappedIds.length} Truffles Unwrapped
            </div>
            <p className="text-[11px] text-[var(--md-sys-color-outline)]">
              Sweetest cocoa moments savored
            </p>
          </div>

          {/* Day 4: Teddy Summary */}
          <div className="p-3.5 rounded-2xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)]/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--md-sys-color-primary)]">
              <span className="material-symbols-rounded text-base">pets</span>
              <span>Teddy Day</span>
            </div>
            <div className="text-xs font-semibold text-[var(--md-sys-color-on-surface)]">
              {interactions.teddy.squeezes} Heartbeat Cuddles
            </div>
            <p className="text-[11px] text-[var(--md-sys-color-outline)]">
              Wearing {interactions.teddy.accessory}
            </p>
          </div>

          {/* Day 5: Promise Summary */}
          <div className="p-3.5 rounded-2xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)]/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--md-sys-color-primary)]">
              <span className="material-symbols-rounded text-base">handshake</span>
              <span>Promise Day</span>
            </div>
            <div className="text-xs font-semibold text-[var(--md-sys-color-on-surface)]">
              {interactions.promise.sealedVows.length} Vows Sealed
            </div>
            <p className="text-[11px] text-[var(--md-sys-color-outline)]">
              Wax stamped with loyalty & truth
            </p>
          </div>

          {/* Day 6: Hug Summary */}
          <div className="p-3.5 rounded-2xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)]/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--md-sys-color-primary)]">
              <span className="material-symbols-rounded text-base">volunteer_activism</span>
              <span>Hug Day</span>
            </div>
            <div className="text-xs font-semibold text-[var(--md-sys-color-on-surface)]">
              {interactions.hug.totalHugsGiven || 1} Warm Embraces
            </div>
            <p className="text-[11px] text-[var(--md-sys-color-outline)]">
              100% Soul-Warming Resonance
            </p>
          </div>

        </div>

        {/* Certificate Signatures */}
        <div className="pt-6 border-t border-[var(--md-sys-color-outline-variant)]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="font-serif-quote italic text-xl font-bold text-[var(--md-sys-color-primary)]">
              {displaySender}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--md-sys-color-outline)] font-semibold">
              Signed by Devoted Heart
            </div>
          </div>

          {/* Central Wax Seal Motif */}
          <div className="w-16 h-16 rounded-full bg-[#8C1D30] text-white flex flex-col items-center justify-center shadow-md ring-4 ring-[#BA1A48]/30">
            <span className="material-symbols-rounded text-2xl">favorite</span>
            <span className="text-[8px] font-extrabold uppercase tracking-tighter">ETERNAL</span>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-serif-quote italic text-xl font-bold text-[var(--md-sys-color-secondary)]">
              {displayPartner}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--md-sys-color-outline)] font-semibold">
              Cherished Beloved
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Confetti Launch */}
          <button
            onClick={triggerCelebration}
            className="m3-state-layer w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-rounded text-lg">celebration</span>
            <span>Shower Valentine Confetti!</span>
          </button>

          {/* Copy Romantic Letter */}
          <button
            onClick={handleCopyLetter}
            className="m3-state-layer w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--md-sys-color-surface-container-highest)] hover:bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-surface)] font-semibold text-sm border border-[var(--md-sys-color-outline-variant)]/50 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-rounded text-lg">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Romantic Note Copied!' : 'Copy Romantic Letter'}</span>
          </button>

          {/* Print / Save Keepsake */}
          <button
            onClick={() => window.print()}
            className="m3-state-layer w-full sm:w-auto px-5 py-3.5 rounded-full bg-[var(--md-sys-color-surface)] hover:bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-outline)] font-medium text-sm border border-[var(--md-sys-color-outline-variant)]/40 transition-all flex items-center justify-center gap-1.5"
            title="Print or Save as PDF"
          >
            <span className="material-symbols-rounded text-lg">print</span>
            <span>Print Keepsake</span>
          </button>
        </div>

      </div>

    </div>
  );
};
