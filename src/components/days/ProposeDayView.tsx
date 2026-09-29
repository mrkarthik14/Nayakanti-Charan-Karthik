import React, { useState } from 'react';
import { DayMeta, AppInteractions } from '../../types';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface ProposeDayViewProps {
  meta: DayMeta;
  partnerName: string;
  senderName: string;
  data: AppInteractions['propose'];
  onUpdate: (data: Partial<AppInteractions['propose']>) => void;
  onMarkCompleted: () => void;
}

export const ProposeDayView: React.FC<ProposeDayViewProps> = ({
  meta,
  partnerName,
  senderName,
  data,
  onUpdate,
  onMarkCompleted,
}) => {
  const [boxOpen, setBoxOpen] = useState<boolean>(data.accepted || false);
  const [accepted, setAccepted] = useState<boolean>(data.accepted || false);
  const [loveLevel, setLoveLevel] = useState<number>(data.loveLevel || 100);
  const [personalVow, setPersonalVow] = useState<string>(data.secretNote || '');
  
  // Playful dodging button state
  const [dodgePos, setDodgePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dodgeMessage, setDodgeMessage] = useState<string>('');

  const DODGE_RESPONSES = [
    'Nice try! Your heart already whispered yes!',
    'கண்மணி (Kanmani), you can’t escape true love!',
    'Shortcut denied! True love is destiny!',
    'Only the YES button works for souls in love!',
    'Even the stars aligned for us today!',
  ];

  const handleOpenBox = () => {
    soundFx.playChime(1.2);
    setBoxOpen(!boxOpen);
  };

  const handleAcceptYes = () => {
    soundFx.playLoveHarp();
    setAccepted(true);
    setBoxOpen(true);
    onUpdate({
      accepted: true,
      loveLevel: loveLevel,
      secretNote: personalVow,
      acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    onMarkCompleted();

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#BA1A48', '#FFD9E2', '#7D5700', '#FFDEAC', '#FF4D6D'],
    });
  };

  const handleDodgeHover = () => {
    soundFx.playPop();
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    setDodgePos({ x: randomX, y: randomY });
    const randomMsg = DODGE_RESPONSES[Math.floor(Math.random() * DODGE_RESPONSES.length)];
    setDodgeMessage(randomMsg);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Title & Tamil Endearment */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] text-xs font-semibold">
          <span className="material-symbols-rounded text-sm">favorite</span>
          <span>Day 2 · {meta.date} · {meta.tamilTitle}</span>
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
            <span className="material-symbols-rounded text-2xl">diamond</span>
          </div>
          <div className="space-y-3">
            <h3 className="m3-title-large text-[var(--md-sys-color-on-surface)]">
              An Eternal Invitation
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

      {/* 3. Interactive Ring Box & Proposal Experience */}
      <div className="rounded-[28px] bg-[var(--md-sys-color-surface-container)] p-6 sm:p-8 border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs text-center max-w-2xl mx-auto space-y-6">
        
        <div className="text-xs uppercase tracking-wider font-bold text-[var(--md-sys-color-outline)]">
          The Sacred Question
        </div>

        {/* Velvet Ring Box Representation */}
        <div className="relative inline-flex flex-col items-center justify-center my-2">
          
          {/* Subtle light aura */}
          <div className="absolute w-40 h-40 bg-[var(--md-sys-color-tertiary-container)]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Interactive Velvet Ring Box */}
          <button
            onClick={handleOpenBox}
            className="group relative focus-visible:outline-none"
            title="Click to open or close the ring box"
          >
            <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-3xl transition-all duration-500 flex flex-col items-center justify-center p-4 border shadow-md ${
              boxOpen 
                ? 'bg-gradient-to-b from-[#4A0E17] to-[#2B050B] border-[#D4A373]' 
                : 'bg-gradient-to-b from-[#7A1D2E] to-[#4A0E17] border-[#8C2E3E] hover:scale-105'
            }`}>
              
              {boxOpen ? (
                /* Opened Box with Radiant Ring */
                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                  <div className="relative">
                    {/* Golden Solitaire Sparkle */}
                    <div className="w-16 h-16 rounded-full border-4 border-[#D4AF37] flex items-center justify-center shadow-lg bg-black/30">
                      <span className="material-symbols-rounded text-2xl text-[#FFF3B0] animate-pulse">
                        diamond
                      </span>
                    </div>
                    {/* Ring Cushion slit */}
                    <div className="w-20 h-2 bg-black/60 rounded-full mt-2 mx-auto" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#E6BE8A] tracking-wider mt-2">
                    Forever & Always
                  </span>
                </div>
              ) : (
                /* Closed Velvet Box with Gold Clasp */
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-6 rounded-full bg-[#D4AF37] shadow-sm flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#7A1D2E]" />
                  </div>
                  <span className="text-xs font-semibold text-[#FFD9DF]">
                    Tap to Open Ring Box
                  </span>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* The Eternal Question */}
        <div className="space-y-2">
          <h4 className="m3-headline-small text-[var(--md-sys-color-on-surface)]">
            Will you be my forever Valentine, {partnerName || 'Kanmani'}?
          </h4>
          <p className="text-xs sm:text-sm text-[var(--md-sys-color-on-surface-variant)]">
            நீயே என் நிழல், நீயே என் நிஜம் · (You are my shadow, you are my truth)
          </p>
        </div>

        {/* Buttons: Yes vs Playfully Dodging Button */}
        <div className="relative pt-2 pb-4 flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[70px]">
          
          {/* Definite YES Button */}
          <button
            onClick={handleAcceptYes}
            className="m3-state-layer px-6 sm:px-8 py-3.5 rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 scale-105 active:scale-95"
          >
            <span className="material-symbols-rounded text-xl">favorite</span>
            <span>Yes, A Thousand Times Yes! (ஆம்!)</span>
          </button>

          {/* Playful Dodging No/Maybe Button */}
          <div className="relative">
            <button
              onMouseEnter={handleDodgeHover}
              onClick={handleDodgeHover}
              style={{
                transform: `translate(${dodgePos.x}px, ${dodgePos.y}px)`,
                transition: 'transform 0.2s cubic-bezier(0.2, 0.0, 0, 1.0)',
              }}
              className="px-5 py-2.5 rounded-full bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-outline)] text-xs font-semibold hover:bg-[var(--md-sys-color-surface-container-highest)] border border-[var(--md-sys-color-outline-variant)]/50 cursor-pointer select-none"
            >
              Let me think... (யோசிக்கிறேன்)
            </button>
          </div>
        </div>

        {/* Quip from dodging */}
        {dodgeMessage && (
          <div className="text-xs text-[var(--md-sys-color-primary)] font-semibold italic animate-in fade-in">
            {dodgeMessage}
          </div>
        )}

        {/* Accepted Confirmation State */}
        {accepted && (
          <div className="p-4 rounded-2xl bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] border border-[var(--md-sys-color-primary)]/30 space-y-2 animate-in zoom-in-95">
            <div className="flex items-center justify-center gap-1.5 font-bold text-sm">
              <span className="material-symbols-rounded text-lg text-[var(--md-sys-color-primary)]">
                verified
              </span>
              <span>Proposal Joyfully Accepted by {partnerName || 'Beloved'}!</span>
            </div>
            <p className="text-xs opacity-90">
              "Two souls, one destiny. Recorded forever in your Valentine Journey."
            </p>
          </div>
        )}

        {/* Love Intensity Thermometer */}
        <div className="pt-4 border-t border-[var(--md-sys-color-outline-variant)]/30 space-y-3 text-left">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[var(--md-sys-color-on-surface)] flex items-center gap-1">
              <span className="material-symbols-rounded text-sm text-[var(--md-sys-color-primary)]">
                vital_signs
              </span>
              <span>Love Affection Intensity</span>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] font-bold">
              {loveLevel}% {loveLevel >= 500 ? '❤️ (Infinite Love)' : ''}
            </span>
          </div>

          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={loveLevel}
            onChange={(e) => {
              const val = Number(e.target.value);
              setLoveLevel(val);
              onUpdate({ loveLevel: val });
            }}
            className="w-full accent-[var(--md-sys-color-primary)] cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-[var(--md-sys-color-outline)] font-medium">
            <span>100% (Pure Devotion)</span>
            <span>500% (Soul Tied)</span>
            <span>1000% (To Infinity & Beyond!)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
