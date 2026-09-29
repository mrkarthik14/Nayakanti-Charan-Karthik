import React, { useRef } from 'react';
import { ValentineDayId } from '../types';
import { DAYS_METADATA } from '../data/daysData';
import { soundFx } from '../utils/audio';

interface DaySelectorProps {
  activeDay: ValentineDayId;
  onSelectDay: (id: ValentineDayId) => void;
  completedDays: Record<ValentineDayId, boolean>;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  activeDay,
  onSelectDay,
  completedDays,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDayClick = (id: ValentineDayId) => {
    soundFx.playChime(1.0);
    onSelectDay(id);
  };

  return (
    <nav
      aria-label="Valentine Days Navigation"
      className="w-full bg-[var(--md-sys-color-surface-container)] border-b border-[var(--md-sys-color-outline-variant)]/40 px-2 py-3 sm:py-3.5 transition-all"
    >
      <div className="max-w-5xl mx-auto relative flex items-center">
        
        {/* Scrollable Container for 7 Days */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full px-2 py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DAYS_METADATA.map((day) => {
            const isActive = activeDay === day.id;
            const isCompleted = completedDays[day.id];

            return (
              <button
                key={day.id}
                onClick={() => handleDayClick(day.id)}
                className={`group relative flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)] ${
                  isActive
                    ? 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] shadow-[var(--md-sys-elevation-2)] scale-[1.02]'
                    : 'bg-[var(--md-sys-color-surface-container-high)] hover:bg-[var(--md-sys-color-surface-container-highest)] text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Icon with active or completed indicator */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`material-symbols-rounded text-xl sm:text-2xl transition-transform duration-300 ${
                      isActive ? 'text-[var(--md-sys-color-primary)] scale-110' : 'text-[var(--md-sys-color-outline)] group-hover:text-[var(--md-sys-color-on-surface)]'
                    }`}
                  >
                    {day.icon}
                  </span>
                  
                  {/* Completion badge */}
                  {isCompleted && (
                    <span
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--md-sys-color-secondary)] text-white flex items-center justify-center text-[9px] shadow-sm font-bold"
                      title="Interacted / Completed"
                    >
                      ✓
                    </span>
                  )}
                </div>

                {/* Day Info */}
                <div className="text-left flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-70">
                      {day.date}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--md-sys-color-primary)] animate-pulse" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold tracking-tight leading-tight">
                    {day.title}
                  </span>
                </div>

                {/* Subtitle tooltip on hover/active */}
                <span className="hidden md:inline-block text-[11px] font-medium opacity-60 ml-0.5">
                  ({day.tamilTitle})
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </nav>
  );
};
