import React, { useState, useRef, useEffect } from 'react';
import { DayMeta, AppInteractions } from '../../types';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface HugDayViewProps {
  meta: DayMeta;
  partnerName: string;
  senderName: string;
  data: AppInteractions['hug'];
  onUpdate: (data: Partial<AppInteractions['hug']>) => void;
  onMarkCompleted: () => void;
}

export const HugDayView: React.FC<HugDayViewProps> = ({
  meta,
  partnerName,
  senderName,
  data,
  onUpdate,
  onMarkCompleted,
}) => {
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(data.completedHug ? 100 : 0);
  const [hugCount, setHugCount] = useState<number>(data.totalHugsGiven || 0);
  const [completedHug, setCompletedHug] = useState<boolean>(data.completedHug || false);

  const timerRef = useRef<number | null>(null);

  const startHolding = () => {
    setIsHolding(true);
    soundFx.playWarmthHum(2500);

    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds to full hug

    const step = () => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentPct);

      if (currentPct < 100) {
        timerRef.current = window.requestAnimationFrame(step);
      } else {
        // Complete!
        setIsHolding(false);
        setCompletedHug(true);
        const newCount = hugCount + 1;
        setHugCount(newCount);
        soundFx.playLoveHarp();
        onUpdate({
          completedHug: true,
          totalHugsGiven: newCount,
          warmthEnergy: 100,
        });
        onMarkCompleted();

        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#BA1A48', '#FF758F', '#FFD9DF', '#FFD9E2'],
        });
      }
    };

    timerRef.current = window.requestAnimationFrame(step);
  };

  const stopHolding = () => {
    if (timerRef.current) {
      window.cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
    setIsHolding(false);
    if (!completedHug) {
      setProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.cancelAnimationFrame(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Title & Tamil Endearment */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] text-xs font-semibold">
          <span className="material-symbols-rounded text-sm">volunteer_activism</span>
          <span>Day 6 · {meta.date} · {meta.tamilTitle}</span>
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
            <span className="material-symbols-rounded text-2xl">favorite_border</span>
          </div>
          <div className="space-y-3">
            <h3 className="m3-title-large text-[var(--md-sys-color-on-surface)]">
              The Sanctuary of an Embrace
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

      {/* 3. Interactive Hold-to-Hug Experience */}
      <div className="rounded-[28px] bg-[var(--md-sys-color-surface-container)] p-6 sm:p-10 border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs text-center max-w-xl mx-auto space-y-6">
        
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider font-bold text-[var(--md-sys-color-outline)]">
            Interactive Warmth Transfer
          </div>
          <h4 className="m3-title-medium text-[var(--md-sys-color-on-surface)]">
            Press & Hold to Send a Warm Hug to {partnerName || 'Azhage'}
          </h4>
          <p className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
            Hold down the glowing heart button for 2.5 seconds until warmth reaches 100%
          </p>
        </div>

        {/* Circular Progress & Hug Button */}
        <div className="relative inline-flex items-center justify-center my-4">
          
          {/* Radial Warmth Glow Aura */}
          <div
            className="absolute rounded-full blur-2xl transition-all duration-300 pointer-events-none"
            style={{
              width: `${160 + progress}px`,
              height: `${160 + progress}px`,
              backgroundColor: isHolding ? '#FF4D6D' : '#BA1A48',
              opacity: isHolding ? 0.5 : 0.2,
            }}
          />

          {/* SVG Progress Ring */}
          <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-[var(--md-sys-color-surface-container-high)]"
            />
            {/* Progress Stroke */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#BA1A48"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - progress / 100)}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-75"
            />
          </svg>

          {/* Center Interactive Button */}
          <button
            onMouseDown={startHolding}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchStart={startHolding}
            onTouchEnd={stopHolding}
            className={`absolute w-36 h-36 rounded-full flex flex-col items-center justify-center text-white font-bold transition-all duration-300 shadow-lg cursor-pointer select-none focus-visible:outline-none ${
              isHolding
                ? 'scale-110 bg-gradient-to-tr from-[#9B123A] to-[#E0265E] shadow-2xl'
                : completedHug
                ? 'bg-gradient-to-tr from-[#BA1A48] to-[#FF4D6D]'
                : 'bg-gradient-to-tr from-[#743444] to-[#BA1A48] hover:scale-105'
            }`}
          >
            <span className={`material-symbols-rounded text-4xl mb-1 ${isHolding ? 'animate-bounce' : ''}`}>
              volunteer_activism
            </span>
            <span className="text-xs uppercase tracking-wider font-extrabold">
              {isHolding ? 'Holding Close...' : completedHug ? 'Embraced' : 'Hold to Hug'}
            </span>
            <span className="text-[11px] font-medium opacity-90">
              {progress}%
            </span>
          </button>
        </div>

        {/* State / Success Message */}
        {completedHug && (
          <div className="p-4 rounded-2xl bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] border border-[var(--md-sys-color-primary)]/30 space-y-1.5 animate-in zoom-in-95">
            <div className="font-bold text-sm flex items-center justify-center gap-1.5">
              <span className="material-symbols-rounded text-lg text-[var(--md-sys-color-primary)]">
                favorite
              </span>
              <span>100% Soul Hug Delivered!</span>
            </div>
            <p className="text-xs opacity-90">
              "Even when oceans separate our hands, our hearts beat in synchronous sanctuary."
            </p>
          </div>
        )}

        {/* Total Hugs Count */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-[var(--md-sys-color-outline)]">
          <span className="material-symbols-rounded text-base text-[var(--md-sys-color-primary)]">
            all_inclusive
          </span>
          <span>Warm Hugs Shared with {partnerName || 'Azhage'}: <strong>{hugCount}</strong></span>
        </div>

      </div>

    </div>
  );
};
