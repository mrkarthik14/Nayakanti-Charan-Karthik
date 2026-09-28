import React from 'react';

interface AssistantIconProps {
  size?: number;
  className?: string;
}

/**
 * AssistantIcon
 * Tailored personal assistant emblem in Orange (#E8500A), Black (#0D0D0D), and White (#FFFFFF).
 * Features a high-contrast geometric AI intelligence spark, precision perimeter ring, and neural core.
 */
export const AssistantIcon: React.FC<AssistantIconProps> = ({ size = 24, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 rounded-full select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* 1. Deep Obsidian Black Base */}
        <circle cx="16" cy="16" r="15" fill="#0D0D0D" />

        {/* 2. Vivid Orange Precision Boundary */}
        <circle cx="16" cy="16" r="14" stroke="#E8500A" strokeWidth="2" />

        {/* 3. Subtle White Calibration Axis Marks */}
        <line x1="16" y1="3" x2="16" y2="5.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="16" y1="26.5" x2="16" y2="29" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="3" y1="16" x2="5.5" y2="16" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="26.5" y1="16" x2="29" y2="16" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

        {/* 4. Pure White 4-Point Intelligence Spark */}
        <path
          d="M16 6.5L18.8 13.2L25.5 16L18.8 18.8L16 25.5L13.2 18.8L6.5 16L13.2 13.2L16 6.5Z"
          fill="#FFFFFF"
        />

        {/* 5. Inner Orange Core / Neural Eye */}
        <circle cx="16" cy="16" r="3.4" fill="#E8500A" />

        {/* 6. Pure White Central Singular Focus Point */}
        <circle cx="16" cy="16" r="1.3" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
