import React, { useState } from 'react';
import { DayMeta, AppInteractions } from '../../types';
import { ROSE_PALETTES } from '../../data/daysData';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface RoseDayViewProps {
  meta: DayMeta;
  partnerName: string;
  senderName: string;
  data: AppInteractions['rose'];
  onUpdate: (data: Partial<AppInteractions['rose']>) => void;
  onMarkCompleted: () => void;
}

export const RoseDayView: React.FC<RoseDayViewProps> = ({
  meta,
  partnerName,
  senderName,
  data,
  onUpdate,
  onMarkCompleted,
}) => {
  const [selectedColorId, setSelectedColorId] = useState<typeof data.selectedColor>(
    data.selectedColor || 'crimson'
  );
  const [bloomCount, setBloomCount] = useState<number>(data.petalsGathered || 0);
  const [isBlooming, setIsBlooming] = useState<boolean>(false);
  const [customWish, setCustomWish] = useState<string>('');
  const [sentSuccess, setSentSuccess] = useState<boolean>(data.bouquetSent || false);

  const activePalette = ROSE_PALETTES.find((p) => p.id === selectedColorId) || ROSE_PALETTES[0];

  const handleColorChange = (id: typeof selectedColorId) => {
    setSelectedColorId(id);
    soundFx.playChime(1.1);
    onUpdate({ selectedColor: id });
  };

  const handlePluckPetal = () => {
    const newCount = bloomCount + 1;
    setBloomCount(newCount);
    setIsBlooming(true);
    soundFx.playChime(1.0 + (newCount % 5) * 0.1);
    setTimeout(() => setIsBlooming(false), 500);

    onUpdate({ petalsGathered: newCount });
    onMarkCompleted();
  };

  const handleSendBouquet = () => {
    soundFx.playLoveHarp();
    setSentSuccess(true);
    onUpdate({
      selectedColor: selectedColorId,
      petalsGathered: Math.max(bloomCount, 12),
      bouquetSent: true,
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    onMarkCompleted();

    // Trigger romantic rose petal confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: [activePalette.colorHex, activePalette.accentHex, '#FFD9E2', '#FFFFFF'],
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Title & Tamil Endearment */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] text-xs font-semibold">
          <span className="material-symbols-rounded text-sm">local_florist</span>
          <span>Day 1 · {meta.date} · {meta.tamilTitle}</span>
        </div>
        <h2 className="m3-display-small text-[var(--md-sys-color-on-surface)]">
          {meta.title}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-[var(--md-sys-color-secondary)] tracking-wide">
          {meta.tamilMeaning}
        </p>
      </div>

      {/* 2. Main Romantic Message Card (Material 3 Elevated Card) */}
      <div className="relative rounded-[28px] bg-[var(--md-sys-color-surface-container-low)] p-6 sm:p-8 shadow-[var(--md-sys-elevation-1)] border border-[var(--md-sys-color-outline-variant)]/40 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--md-sys-color-primary-container)]/30 rounded-bl-[100px] pointer-events-none" />
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] flex-shrink-0 flex items-center justify-center shadow-sm">
            <span className="material-symbols-rounded text-2xl">local_florist</span>
          </div>
          <div className="space-y-3">
            <h3 className="m3-title-large text-[var(--md-sys-color-on-surface)]">
              Whispers of a Fresh Bloom
            </h3>
            <p className="m3-body-large text-[var(--md-sys-color-on-surface-variant)] leading-relaxed">
              {meta.romanticMessage(partnerName)}
            </p>
            {/* Serif quote */}
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

      {/* 3. Interactive Rose Garden & Customizer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Interactive Blooming Rose Display */}
        <div className="md:col-span-6 rounded-[28px] bg-[var(--md-sys-color-surface-container)] p-6 flex flex-col items-center justify-center text-center border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs min-h-[360px]">
          
          <div className="text-xs uppercase tracking-wider font-bold text-[var(--md-sys-color-outline)] mb-3">
            Interactive Blossom Experience
          </div>

          {/* Rose Graphic (Animated SVG) */}
          <div 
            onClick={handlePluckPetal}
            className="cursor-pointer group relative p-4 transition-transform duration-300 hover:scale-105 active:scale-95"
            title="Tap the rose to gather petals!"
          >
            {/* Floating glow aura */}
            <div 
              className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-500"
              style={{ backgroundColor: activePalette.colorHex }}
            />

            <svg
              width="180"
              height="200"
              viewBox="0 0 180 200"
              className={`relative z-10 transition-transform duration-500 ${isBlooming ? 'scale-110' : ''}`}
            >
              {/* Stem and Leaves */}
              <path
                d="M 90 95 Q 85 140 92 190"
                stroke={activePalette.stemHex}
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 88 135 Q 60 130 50 115 Q 70 120 88 135"
                fill={activePalette.stemHex}
              />
              <path
                d="M 90 155 Q 120 150 130 135 Q 110 140 90 155"
                fill={activePalette.stemHex}
              />

              {/* Rose Petals with Layered Gradient */}
              <g className="transition-all duration-500">
                {/* Outer Petals */}
                <ellipse cx="65" cy="75" rx="30" ry="24" fill={activePalette.colorHex} opacity="0.9" />
                <ellipse cx="115" cy="75" rx="30" ry="24" fill={activePalette.colorHex} opacity="0.9" />
                <ellipse cx="90" cy="55" rx="34" ry="26" fill={activePalette.colorHex} opacity="0.95" />
                
                {/* Core Swirl Petals */}
                <ellipse cx="80" cy="70" rx="22" ry="18" fill={activePalette.accentHex} />
                <ellipse cx="100" cy="70" rx="22" ry="18" fill={activePalette.accentHex} />
                <circle cx="90" cy="65" r="16" fill={activePalette.colorHex} />
                <path
                  d="M 82 65 C 84 58, 96 58, 98 65 C 98 72, 82 74, 90 78"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.8"
                />
              </g>
            </svg>

            {/* Tap prompt */}
            <div className="mt-2 text-xs font-semibold text-[var(--md-sys-color-primary)] flex items-center justify-center gap-1">
              <span className="material-symbols-rounded text-sm">touch_app</span>
              <span>Tap Rose to Bloom Petals</span>
            </div>
          </div>

          {/* Petal Count Meter */}
          <div className="mt-4 px-4 py-2 rounded-full bg-[var(--md-sys-color-surface-container-high)] text-xs font-semibold text-[var(--md-sys-color-on-surface)] flex items-center gap-2">
            <span className="material-symbols-rounded text-sm text-[var(--md-sys-color-primary)]">
              spa
            </span>
            <span>Petals Gathered: <strong>{bloomCount}</strong></span>
          </div>
        </div>

        {/* Right: Rose Palette Selection & Send Bouquet */}
        <div className="md:col-span-6 rounded-[28px] bg-[var(--md-sys-color-surface-container-low)] p-6 flex flex-col justify-between border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs">
          
          <div className="space-y-4">
            <h4 className="m3-title-medium text-[var(--md-sys-color-on-surface)] flex items-center gap-2">
              <span className="material-symbols-rounded text-lg text-[var(--md-sys-color-primary)]">
                palette
              </span>
              <span>Choose Your Rose Variety</span>
            </h4>

            {/* 4 Palette Options */}
            <div className="grid grid-cols-2 gap-2.5">
              {ROSE_PALETTES.map((palette) => {
                const isSelected = selectedColorId === palette.id;
                return (
                  <button
                    key={palette.id}
                    onClick={() => handleColorChange(palette.id as typeof selectedColorId)}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[var(--md-sys-color-primary-container)] border-[var(--md-sys-color-primary)] shadow-xs scale-[1.02]'
                        : 'bg-[var(--md-sys-color-surface)] border-[var(--md-sys-color-outline-variant)]/40 hover:bg-[var(--md-sys-color-surface-container)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: palette.colorHex }}
                      />
                      {isSelected && (
                        <span className="text-[10px] font-bold text-[var(--md-sys-color-primary)]">
                          Active
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--md-sys-color-on-surface)]">
                        {palette.name}
                      </div>
                      <div className="text-[10px] text-[var(--md-sys-color-outline)] font-medium">
                        {palette.tamilName}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Meaning card */}
            <div className="p-3.5 rounded-2xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)]/30 space-y-1">
              <div className="text-xs font-semibold text-[var(--md-sys-color-primary)]">
                Significance: {activePalette.meaning}
              </div>
              <p className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                {activePalette.description}
              </p>
            </div>

            {/* Optional note */}
            <div>
              <label className="block text-xs font-semibold text-[var(--md-sys-color-on-surface-variant)] mb-1">
                Optional Sweet Note for {partnerName || 'En Anbe'}
              </label>
              <input
                type="text"
                value={customWish}
                onChange={(e) => setCustomWish(e.target.value)}
                placeholder="e.g., Happy Rose Day to my favorite human!"
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)] text-xs text-[var(--md-sys-color-on-surface)] outline-none focus:border-[var(--md-sys-color-primary)] focus:ring-1 focus:ring-[var(--md-sys-color-primary)]"
              />
            </div>
          </div>

          {/* Send Bouquet Action */}
          <div className="pt-4 mt-4 border-t border-[var(--md-sys-color-outline-variant)]/30 flex flex-col gap-2">
            <button
              onClick={handleSendBouquet}
              className="m3-state-layer w-full py-3 rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-rounded text-lg">send</span>
              <span>
                {sentSuccess ? 'Send Another Fresh Bouquet' : `Send ${activePalette.name} to ${partnerName || 'Beloved'}`}
              </span>
            </button>

            {sentSuccess && (
              <div className="text-center text-xs text-[var(--md-sys-color-secondary)] font-medium flex items-center justify-center gap-1.5 animate-in fade-in">
                <span className="material-symbols-rounded text-sm">check_circle</span>
                <span>Virtual Rose Bouquet successfully presented with all your love!</span>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
