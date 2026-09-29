import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PortraitComposition } from './PortraitComposition';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onViewWorkClick: () => void;
  onConnectClick: () => void;
  onFilterCategory?: (category: string) => void;
}

/**
 * Editorial HeroSection
 * 
 * Orchestrated Sequence Entrance:
 * 1. Background / Canvas appears first (0ms)
 * 2. NCK logo / Eyebrow (200 → 700ms)
 * 3. Main headline line-by-line reveal (350 → 1100ms)
 * 4. Supporting text fades upward (700 → 1200ms)
 * 5. CTA buttons reveal (850 → 1300ms)
 * 6. Profile photo appears slightly after typography (500 → 1300ms)
 * 7. One coordinated, restrained entrance
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewWorkClick,
  onConnectClick,
  onFilterCategory
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // Abstract project activity line chart points
  const chartPoints = [
    { x: 0, y: 38 },
    { x: 30, y: 34 },
    { x: 60, y: 45 },
    { x: 90, y: 28 },
    { x: 120, y: 52 },
    { x: 150, y: 40 },
    { x: 180, y: 68 },
    { x: 210, y: 55 },
    { x: 240, y: 78 },
    { x: 270, y: 72 },
    { x: 300, y: 88 }
  ];

  const svgPath = chartPoints.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${90 - curr.y}` : `${acc} L ${curr.x} ${90 - curr.y}`;
  }, '');

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Engineering Statements */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Step 2: Micro Eyebrow (200 -> 700ms) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeCurve }}
              className="inline-flex items-center gap-2.5 mb-3"
            >
              <span className="w-2 h-2 rounded-none bg-[#E8500A]" />
              <span
                className={`font-technical text-xs tracking-[0.25em] font-semibold ${
                  isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                }`}
              >
                NCK / DATA × AI × ENGINEERING
              </span>
            </motion.div>

            {/* Personal Identity Subtitle (250 -> 750ms) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: easeCurve }}
              className="mb-4"
            >
              <span
                className={`font-technical text-sm sm:text-base tracking-[0.22em] font-bold uppercase transition-colors ${
                  isDark ? 'text-white' : 'text-[#121212]'
                }`}
              >
                NAYAKANTI CHARAN KARTHIK
              </span>
            </motion.div>

            {/* Step 3: Display Headline revealed line-by-line with 3D-print physical typography (350 -> 1100ms) */}
            <h1
              className="hero-typography-3d text-5xl sm:text-6xl md:text-7xl xl:text-[84px] font-bold tracking-tight leading-[0.94] mb-6 select-none"
            >
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35, ease: easeCurve }}
                className="block"
              >
                BUILDING
              </motion.span>
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45, ease: easeCurve }}
                className="block"
              >
                WITH
              </motion.span>
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.55, ease: easeCurve }}
                className="inline-flex items-center gap-3"
              >
                <span>DATA.</span>
                <span className="inline-block w-4 sm:w-6 h-9 sm:h-14 bg-[#E8500A] cursor-3d-block animate-cursor-blink translate-y-[-2px]" />
              </motion.span>
            </h1>

            {/* Step 4: Supporting Statement fades upward (700 -> 1200ms) */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.7, ease: easeCurve }}
              className={`text-lg md:text-xl max-w-xl leading-relaxed mb-6 font-normal ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#555555]'
              }`}
            >
              Data, machine learning and software systems built around real problems.
            </motion.p>

            {/* Core Competencies Line */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.78, ease: easeCurve }}
              className={`font-technical text-xs md:text-sm tracking-wider mb-8 flex flex-wrap items-center gap-y-2 ${
                isDark ? 'text-[#F2F0EC]/80' : 'text-[#222222]'
              }`}
            >
              <span>Python</span>
              <span className="mx-2 text-[#E8500A]">·</span>
              <span>SQL</span>
              <span className="mx-2 text-[#E8500A]">·</span>
              <span>Machine Learning</span>
              <span className="mx-2 text-[#E8500A]">·</span>
              <span>AI</span>
              <span className="mx-2 text-[#E8500A]">·</span>
              <span>Analytics</span>
              <span className="mx-2 text-[#E8500A]">·</span>
              <span>Engineering</span>
            </motion.div>

            {/* Step 5: CTA buttons reveal (850 -> 1300ms) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85, ease: easeCurve }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={onViewWorkClick}
                className={`px-6 py-3.5 font-technical text-xs font-semibold tracking-widest rounded-[14px] transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 flex items-center gap-2 group cursor-pointer border ${
                  isDark
                    ? 'bg-[#141414] hover:bg-[#1f1f1f] text-[#F2F0EC] border-white/20 hover:border-white/40 focus-visible:ring-offset-[#141414]'
                    : 'bg-white hover:bg-neutral-100 text-[#141414] border-black/15 hover:border-black/30 shadow-sm focus-visible:ring-offset-white'
                }`}
              >
                <span>VIEW WORK</span>
                <span className="text-[#E8500A] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>

              <button
                onClick={onConnectClick}
                className={`px-7 py-3.5 bg-[#E8500A] hover:bg-[#d04506] text-white font-technical text-xs font-semibold tracking-widest rounded-full transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#E8500A]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 cursor-pointer ${
                  isDark ? 'focus-visible:ring-offset-[#141414]' : 'focus-visible:ring-offset-white'
                }`}
              >
                CONNECT
              </button>
            </motion.div>

            {/* HERO DATA CARDS (Saturated Orange Stat Card + Control Card) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.95, ease: easeCurve }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 max-w-xl"
            >
              {/* Vivid Orange Statistical Card */}
              <div className="sm:col-span-7 bg-[#E8500A] text-white p-5 rounded-[18px] shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-technical text-[10px] tracking-[0.2em] uppercase text-white/80">
                      CURRENT MODE
                    </span>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                  <div className="text-3xl font-bold tracking-tight text-white">BUILDING</div>
                  <div className="font-technical text-[9px] tracking-wider text-white/90 mt-0.5">
                    DATA / AI / ML / ENGINEERING
                  </div>
                </div>

                {/* Animated Project Activity Line Chart */}
                <div className="mt-4 pt-2 border-t border-white/20">
                  <div className="flex justify-between items-center mb-1 font-technical text-[9px] text-white/80">
                    <span>ITERATIVE VELOCITY</span>
                    <span className="font-semibold">+88.4%</span>
                  </div>
                  <svg viewBox="0 0 300 80" className="w-full h-12 overflow-visible">
                    <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
                    <path
                      d={svgPath}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="300" cy="2" r="4" fill="#ffffff" />
                  </svg>
                  <div className="flex justify-between text-[8px] font-technical text-white/70 mt-1">
                    <span>HYPOTHESIZE</span>
                    <span>EXPERIMENT</span>
                    <span>DEPLOY</span>
                  </div>
                </div>
              </div>

              {/* Black / White Control Card */}
              <div
                className={`sm:col-span-5 p-5 rounded-[18px] flex flex-col justify-between border transition-colors ${
                  isDark
                    ? 'bg-[#0D0D0D] border-white/10 text-[#F2F0EC]'
                    : 'bg-white border-black/10 text-[#141414] shadow-sm'
                }`}
              >
                <div>
                  <div
                    className={`font-technical text-[10px] tracking-[0.2em] uppercase mb-2 ${
                      isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                    }`}
                  >
                    ACTIVE DOMAINS
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {['ML', 'ANALYTICS', 'AI', 'FULL-STACK'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTag(tag);
                          if (onFilterCategory) onFilterCategory(tag);
                        }}
                        className={`font-technical text-[10px] tracking-wider px-2 py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 cursor-pointer ${
                          isDark ? 'focus-visible:ring-offset-[#0D0D0D]' : 'focus-visible:ring-offset-white'
                        } ${
                          selectedTag === tag
                            ? 'bg-[#E8500A] text-white font-semibold'
                            : isDark
                            ? 'bg-white/5 text-[#8A8A8A] hover:text-white'
                            : 'bg-black/5 text-[#606060] hover:text-black'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`pt-3 border-t flex flex-col gap-1.5 font-technical text-[10px] tracking-wider ${
                    isDark ? 'border-white/10' : 'border-black/10'
                  }`}
                >
                  <a
                    href="#work"
                    className={`flex items-center justify-between py-1 px-1 rounded transition-colors hover:text-[#E8500A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                      isDark ? 'text-[#F2F0EC] focus-visible:ring-offset-[#0D0D0D]' : 'text-[#141414] focus-visible:ring-offset-white'
                    }`}
                  >
                    <span>CASE STUDIES</span>
                    <span>→</span>
                  </a>
                  <a
                    href="https://github.com/mrkarthik14"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between py-1 px-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                      isDark
                        ? 'text-[#8A8A8A] hover:text-white focus-visible:ring-offset-[#0D0D0D]'
                        : 'text-[#606060] hover:text-black focus-visible:ring-offset-white'
                    }`}
                  >
                    <span>GITHUB PROOF</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>

          {/* RIGHT COLUMN: Step 6: Real Profile Photograph (reveals 500 -> 1300ms) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.5, ease: easeCurve }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <PortraitComposition />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
