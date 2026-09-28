import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Editorial Geometric Theme Toggle
 * Displays:
 * [ ◐ DARK ] in dark mode
 * [ ◑ LIGHT ] in light mode
 * Compact, tactile, animated, and fully keyboard accessible (ENTER / SPACE).
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-technical text-xs tracking-wider transition-all duration-300 cursor-pointer active:scale-95 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
        isDark
          ? 'bg-[#141414] hover:bg-[#1E1E1E] border-white/15 text-[#F2F0EC] hover:border-white/30 focus-visible:ring-offset-[#0D0D0D]'
          : 'bg-[#F2F0EC] hover:bg-[#E6E4DF] border-black/15 text-[#141414] hover:border-black/30 focus-visible:ring-offset-white'
      } ${className}`}
      aria-label="Switch between light and dark theme"
      title={`Current: ${isDark ? 'Dark Mode' : 'Light Mode'}. Click to switch.`}
    >
      {/* Editorial geometric state icon [ ◐ / ◑ ] */}
      <span className="relative flex items-center justify-center w-3.5 h-3.5 text-[#E8500A] transition-transform duration-300 group-hover:rotate-180">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Outer circle */}
          <circle
            cx="8"
            cy="8"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Half filled disc */}
          {isDark ? (
            /* Left half filled for DARK mode ◐ */
            <path
              d="M8,1.5 A6.5,6.5 0 0,0 8,14.5 Z"
              fill="currentColor"
            />
          ) : (
            /* Right half filled for LIGHT mode ◑ */
            <path
              d="M8,1.5 A6.5,6.5 0 0,1 8,14.5 Z"
              fill="currentColor"
            />
          )}
        </svg>
      </span>

      {/* Monospace Editorial Text */}
      <span className="font-semibold tracking-[0.16em] uppercase text-[11px]">
        {isDark ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
};
