import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface SectionHeaderProps {
  monoLabel: string;
  counter?: string;
  titleLines: string[];
  description?: string;
  className?: string;
}

/**
 * SectionHeader
 * Follows the precise editorial motion rhythm:
 * 1. Tiny monospace label + counter (opacity 0 → 1, translateY 8px → 0, 300-450ms)
 * 2. Counter reveals with grey → orange accent transition
 * 3. Large display headline reveals line-by-line with 60-80ms stagger
 * 4. Muted supporting paragraph fades smoothly (opacity 0 → 1, translateY 10px → 0)
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  monoLabel,
  counter,
  titleLines,
  description,
  className = 'mb-16'
}) => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${className}`}>
      {/* Left: Monospace Label, Counter, and Line-by-Line Headline */}
      <div className="lg:col-span-7">
        {/* Step 1 & 2: Mono Label + Counter */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, letterSpacing: '0.28em' }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, letterSpacing: '0.25em' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: easeCurve }}
          className="flex items-center justify-between mb-3 max-w-sm"
        >
          <span className="font-technical text-xs tracking-[0.25em] text-[#E8500A] uppercase font-bold">
            {monoLabel}
          </span>
          {counter && (
            <span
              className={`font-technical text-xs font-semibold tracking-wider transition-colors duration-500 ${
                isDark ? 'text-white/40' : 'text-black/40'
              }`}
            >
              {counter}
            </span>
          )}
        </motion.div>

        {/* Step 3: Large Display Headline line-by-line */}
        <h2
          className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[0.98] select-none ${
            isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
          }`}
        >
          {titleLines.map((line, idx) => (
            <motion.span
              key={idx}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.07,
                ease: easeCurve
              }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* Step 4: Supporting Muted Paragraph */}
      {description && (
        <div className="lg:col-span-5 flex flex-col justify-end lg:pt-8">
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeCurve }}
            className={`text-base sm:text-lg leading-relaxed font-normal ${
              isDark ? 'text-[#8A8A8A]' : 'text-[#555555]'
            }`}
          >
            {description}
          </motion.p>
        </div>
      )}
    </div>
  );
};
