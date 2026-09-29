import React from 'react';
import { soundFx } from '../utils/audio';

interface TopAppBarProps {
  partnerName: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenPersonalize: () => void;
  onReset: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  partnerName,
  isMuted,
  onToggleMute,
  onOpenPersonalize,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--md-sys-color-surface-container-low)]/90 backdrop-blur-md border-b border-[var(--md-sys-color-outline-variant)]/60 transition-shadow duration-300 shadow-[var(--md-sys-elevation-1)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] flex items-center justify-center shadow-sm">
            <span className="material-symbols-rounded text-2xl text-[var(--md-sys-color-primary)]">
              favorite
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-[var(--md-sys-color-on-surface)]">
                Valentine’s Week
              </h1>
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
                காதல் வாரம்
              </span>
            </div>
            <p className="text-xs text-[var(--md-sys-color-outline)] font-medium">
              Google Material 3 · 7 Days of Affection
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Personalized Partner Chip / Button */}
          <button
            onClick={() => {
              soundFx.playChime(1.1);
              onOpenPersonalize();
            }}
            className="m3-state-layer flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--md-sys-color-surface-container-high)] hover:bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface)] text-xs sm:text-sm font-semibold transition-all border border-[var(--md-sys-color-outline-variant)]/40 focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)]"
            title="Personalize Partner Name"
          >
            <span className="material-symbols-rounded text-base text-[var(--md-sys-color-primary)]">
              person
            </span>
            <span className="max-w-[100px] sm:max-w-[140px] truncate">
              {partnerName ? partnerName : 'Personalize'}
            </span>
            <span className="material-symbols-rounded text-sm text-[var(--md-sys-color-outline)]">
              edit
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              soundFx.playChime(isMuted ? 1.2 : 0.8);
            }}
            className="m3-state-layer w-10 h-10 rounded-full flex items-center justify-center text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-highest)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)]"
            title={isMuted ? 'Unmute romantic sound effects' : 'Mute romantic sound effects'}
            aria-label="Toggle Sound"
          >
            <span className="material-symbols-rounded text-xl">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* Reset Progress */}
          <button
            onClick={() => {
              if (window.confirm('Reset all Valentine Week interactions and restart fresh?')) {
                soundFx.playChime(0.7);
                onReset();
              }
            }}
            className="m3-state-layer w-10 h-10 rounded-full flex items-center justify-center text-[var(--md-sys-color-outline)] hover:text-[var(--md-sys-color-error)] hover:bg-[var(--md-sys-color-error-container)]/30 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-error)]"
            title="Reset All Progress"
            aria-label="Reset interactions"
          >
            <span className="material-symbols-rounded text-xl">
              restart_alt
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
