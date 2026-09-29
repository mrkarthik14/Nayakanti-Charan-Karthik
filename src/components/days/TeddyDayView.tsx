import React, { useState } from 'react';
import { DayMeta, AppInteractions } from '../../types';
import { soundFx } from '../../utils/audio';

interface TeddyDayViewProps {
  meta: DayMeta;
  partnerName: string;
  senderName: string;
  data: AppInteractions['teddy'];
  onUpdate: (data: Partial<AppInteractions['teddy']>) => void;
  onMarkCompleted: () => void;
}

export const TeddyDayView: React.FC<TeddyDayViewProps> = ({
  meta,
  partnerName,
  senderName,
  data,
  onUpdate,
  onMarkCompleted,
}) => {
  const [squeezes, setSqueezes] = useState<number>(data.squeezes || 0);
  const [accessory, setAccessory] = useState<typeof data.accessory>(data.accessory || 'bowtie');
  const [furTone, setFurTone] = useState<typeof data.furTone>(data.furTone || 'caramel');
  const [isSqueezed, setIsSqueezed] = useState<boolean>(false);

  const FUR_COLORS = {
    caramel: { body: '#C88A58', shadow: '#A46635', inner: '#E7BD98' },
    honey: { body: '#E5A93C', shadow: '#B87B19', inner: '#F8D88E' },
    mocha: { body: '#7F5539', shadow: '#583620', inner: '#B08968' },
    classic: { body: '#DDB892', shadow: '#B08968', inner: '#EDE0D4' },
  };

  const activeFur = FUR_COLORS[furTone] || FUR_COLORS.caramel;

  const handleSqueeze = () => {
    soundFx.playHeartbeat();
    const nextCount = squeezes + 1;
    setSqueezes(nextCount);
    setIsSqueezed(true);
    setTimeout(() => setIsSqueezed(false), 300);

    onUpdate({
      squeezes: nextCount,
      accessory,
      furTone,
    });
    onMarkCompleted();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Title & Tamil Endearment */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] text-xs font-semibold">
          <span className="material-symbols-rounded text-sm">pets</span>
          <span>Day 4 · {meta.date} · {meta.tamilTitle}</span>
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
            <span className="material-symbols-rounded text-2xl">sentiment_satisfied</span>
          </div>
          <div className="space-y-3">
            <h3 className="m3-title-large text-[var(--md-sys-color-on-surface)]">
              Warmest Fluffy Guardian
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

      {/* 3. Interactive Squeeze-a-Teddy Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Plush Teddy Graphic with Heartbeat */}
        <div className="md:col-span-6 rounded-[28px] bg-[var(--md-sys-color-surface-container)] p-6 flex flex-col items-center justify-center border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs min-h-[380px]">
          
          <div className="text-xs uppercase tracking-wider font-bold text-[var(--md-sys-color-outline)] mb-2">
            Tap Teddy to Squeeze & Hear Heartbeat
          </div>

          {/* Interactive SVG Teddy */}
          <div
            onClick={handleSqueeze}
            className={`cursor-pointer group relative p-2 transition-transform duration-300 select-none ${
              isSqueezed ? 'scale-90 rotate-2' : 'hover:scale-105'
            }`}
            title="Squeeze Teddy!"
          >
            {/* Pulsing warmth halo */}
            <div className="absolute inset-0 rounded-full blur-2xl bg-[var(--md-sys-color-primary-container)]/50 opacity-60" />

            <svg width="200" height="220" viewBox="0 0 200 220" className="relative z-10">
              {/* Ears */}
              <circle cx="55" cy="55" r="24" fill={activeFur.body} />
              <circle cx="55" cy="55" r="14" fill={activeFur.inner} />
              <circle cx="145" cy="55" r="24" fill={activeFur.body} />
              <circle cx="145" cy="55" r="14" fill={activeFur.inner} />

              {/* Body */}
              <ellipse cx="100" cy="145" rx="55" ry="60" fill={activeFur.body} />
              <ellipse cx="100" cy="150" rx="36" ry="40" fill={activeFur.inner} />

              {/* Legs/Paws */}
              <ellipse cx="58" cy="190" rx="22" ry="16" fill={activeFur.body} />
              <circle cx="58" cy="190" r="10" fill={activeFur.inner} />
              <ellipse cx="142" cy="190" rx="22" ry="16" fill={activeFur.body} />
              <circle cx="142" cy="190" r="10" fill={activeFur.inner} />

              {/* Head */}
              <circle cx="100" cy="85" r="48" fill={activeFur.body} />
              {/* Snout */}
              <ellipse cx="100" cy="98" rx="22" ry="16" fill={activeFur.inner} />
              {/* Nose */}
              <polygon points="94,92 106,92 100,100" fill="#2B151C" />
              {/* Mouth */}
              <path d="M 100 100 Q 94 108 90 104" stroke="#2B151C" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 100 100 Q 106 108 110 104" stroke="#2B151C" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Eyes with twinkle */}
              <circle cx="80" cy="78" r="6" fill="#1C1B1F" />
              <circle cx="78" cy="76" r="2" fill="#FFFFFF" />
              <circle cx="120" cy="78" r="6" fill="#1C1B1F" />
              <circle cx="118" cy="76" r="2" fill="#FFFFFF" />
              {/* Blush cheeks */}
              <ellipse cx="72" cy="92" rx="7" ry="4" fill="#FF8FA3" opacity="0.6" />
              <ellipse cx="128" cy="92" rx="7" ry="4" fill="#FF8FA3" opacity="0.6" />

              {/* Arms */}
              <ellipse cx="50" cy="135" rx="16" ry="26" transform="rotate(20 50 135)" fill={activeFur.body} />
              <ellipse cx="150" cy="135" rx="16" ry="26" transform="rotate(-20 150 135)" fill={activeFur.body} />

              {/* Active Accessories */}
              {accessory === 'bowtie' && (
                <g transform="translate(100, 116)">
                  <polygon points="0,0 -16,-8 -16,8" fill="#BA1A48" />
                  <polygon points="0,0 16,-8 16,8" fill="#BA1A48" />
                  <circle cx="0" cy="0" r="4" fill="#743444" />
                </g>
              )}
              {accessory === 'heart' && (
                <g transform="translate(100, 142)">
                  <path d="M 0 -5 C -8 -15, -18 -4, 0 12 C 18 -4, 8 -15, 0 -5" fill="#BA1A48" />
                  <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">LUV</text>
                </g>
              )}
              {accessory === 'rose' && (
                <g transform="translate(145, 125)">
                  <circle cx="0" cy="0" r="9" fill="#BA1A48" />
                  <circle cx="-1" cy="-1" r="5" fill="#FF758F" />
                  <path d="M 0 8 Q -4 18 -8 24" stroke="#2D6A4F" strokeWidth="3" fill="none" />
                </g>
              )}
              {accessory === 'scarf' && (
                <g transform="translate(100, 118)">
                  <rect x="-42" y="-4" width="84" height="12" rx="6" fill="#BA1A48" />
                  <rect x="12" y="4" width="14" height="30" rx="4" fill="#BA1A48" />
                  <line x1="12" y1="32" x2="26" y2="32" stroke="#FFF" strokeWidth="2" strokeDasharray="2 2" />
                </g>
              )}
            </svg>

            {/* Squeeze Heartbeat Hint */}
            <div className="mt-2 text-xs font-semibold text-[var(--md-sys-color-primary)] flex items-center justify-center gap-1.5">
              <span className="material-symbols-rounded text-base animate-pulse">favorite</span>
              <span>Tap to Squeeze & Hear Heartbeat</span>
            </div>
          </div>

          {/* Squeeze Counter Meter */}
          <div className="mt-3 px-4 py-2 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] text-xs font-bold flex items-center gap-2">
            <span className="material-symbols-rounded text-sm">volunteer_activism</span>
            <span>Cuddles Given to {partnerName || 'Chellam'}: <strong>{squeezes}</strong></span>
          </div>

        </div>

        {/* Right: Customization Controls */}
        <div className="md:col-span-6 rounded-[28px] bg-[var(--md-sys-color-surface-container-low)] p-6 flex flex-col justify-between border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs space-y-4">
          
          <div className="space-y-4">
            <h4 className="m3-title-medium text-[var(--md-sys-color-on-surface)] flex items-center gap-2">
              <span className="material-symbols-rounded text-lg text-[var(--md-sys-color-primary)]">
                styler
              </span>
              <span>Dress Up {partnerName ? `${partnerName}'s` : 'Your'} Teddy</span>
            </h4>

            {/* Accessory Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-wider">
                Accessories
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bowtie', name: 'Ruby Bowtie', icon: 'app_registration' },
                  { id: 'heart', name: 'Love Badge', icon: 'favorite' },
                  { id: 'rose', name: 'Rose in Paw', icon: 'local_florist' },
                  { id: 'scarf', name: 'Cozy Scarf', icon: 'dry_cleaning' },
                ].map((acc) => {
                  const isSelected = accessory === acc.id;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        soundFx.playChime(1.1);
                        setAccessory(acc.id as typeof accessory);
                        onUpdate({ accessory: acc.id as typeof accessory });
                      }}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-[var(--md-sys-color-primary-container)] border-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary-container)] font-bold'
                          : 'bg-[var(--md-sys-color-surface)] border-[var(--md-sys-color-outline-variant)]/40 hover:bg-[var(--md-sys-color-surface-container)]'
                      }`}
                    >
                      <span className="material-symbols-rounded text-sm text-[var(--md-sys-color-primary)]">
                        {acc.icon}
                      </span>
                      <span>{acc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fur Tone Selector */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-wider">
                Teddy Fur Tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'caramel', name: 'Caramel Honey', hex: '#C88A58' },
                  { id: 'honey', name: 'Golden Honey', hex: '#E5A93C' },
                  { id: 'mocha', name: 'Mocha Espresso', hex: '#7F5539' },
                  { id: 'classic', name: 'Classic Cream', hex: '#DDB892' },
                ].map((tone) => {
                  const isSelected = furTone === tone.id;
                  return (
                    <button
                      key={tone.id}
                      onClick={() => {
                        soundFx.playChime(1.1);
                        setFurTone(tone.id as typeof furTone);
                        onUpdate({ furTone: tone.id as typeof furTone });
                      }}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-[var(--md-sys-color-secondary-container)] border-[var(--md-sys-color-secondary)] text-[var(--md-sys-color-on-secondary-container)] font-bold'
                          : 'bg-[var(--md-sys-color-surface)] border-[var(--md-sys-color-outline-variant)]/40'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: tone.hex }} />
                      <span>{tone.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cuddle Summary Footer */}
          <div className="pt-4 border-t border-[var(--md-sys-color-outline-variant)]/30">
            <p className="text-xs text-[var(--md-sys-color-outline)] italic">
              "A stuffed companion, but the hugs and heartbeats it carries for {partnerName || 'Chellam'} are 100% genuine."
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
