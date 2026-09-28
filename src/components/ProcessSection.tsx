import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PROCESS_STEPS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { SectionHeader } from './SectionHeader';

export const ProcessSection: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(2); // Default to EXPERIMENT / MODEL (central orange)
  const { isDark } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked entrance animation using Framer Motion's useScroll and useTransform
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.72']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  // Staggered upward translation for interactive process topology card and rows
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.9], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.9], [22, 0]);

  const nodes = [
    { idx: 0, label: 'QUESTION', code: '00' },
    { idx: 1, label: 'DATA', code: '01' },
    { idx: 2, label: 'MODEL', code: '02' },
    { idx: 3, label: 'BUILD', code: '03' },
    { idx: 4, label: 'MEASURE', code: '04' }
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`relative py-24 md:py-32 border-t transition-colors ${
        isDark ? 'bg-[#0D0D0D] border-white/10' : 'bg-[#FAFAFA] border-black/10'
      }`}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity, y }}
        className="max-w-[1440px] mx-auto px-6 md:px-12"
      >
        
        {/* Section Header */}
        <SectionHeader
          monoLabel="04 / PROCESS"
          counter="04"
          titleLines={['FROM QUESTION', 'TO SYSTEM.']}
          description="Start with the problem. Understand the data. Test the idea. Build the system. Measure the result."
        />

        {/* Content with Staggered Scroll Entrance */}
        <motion.div style={shouldReduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}>
          {/* Large 3D Horizontal Illustration: Five connected abstract geometric objects */}
          <div
            className={`rounded-[20px] p-6 sm:p-10 mb-12 relative overflow-hidden border transition-colors ${
              isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10 shadow-sm'
            }`}
          >
          <div className="flex items-center justify-between mb-8">
            <span
              className={`font-technical text-xs tracking-[0.2em] uppercase ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
              }`}
            >
              PIPELINE TOPOLOGY: STAGE {nodes[activeStepIdx].code} — {nodes[activeStepIdx].label}
            </span>
            <span className="font-technical text-xs text-[#E8500A] font-semibold">
              STEP {activeStepIdx + 1} OF 5
            </span>
          </div>

          {/* SVG 3D Architecture Canvas */}
          <div className="relative w-full py-4">
            <div className="grid grid-cols-5 gap-2 sm:gap-4 relative z-10">
              {nodes.map((node) => {
                const isActive = activeStepIdx === node.idx;
                return (
                  <button
                    key={node.idx}
                    onClick={() => setActiveStepIdx(node.idx)}
                    className={`flex flex-col items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded-2xl p-1 cursor-pointer ${
                      isDark ? 'focus-visible:ring-offset-[#141414]' : 'focus-visible:ring-offset-white'
                    }`}
                    aria-label={`Select stage ${node.code}: ${node.label}`}
                  >
                    {/* 3D Geometric Form Representation */}
                    <div
                      className={`relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#E8500A] shadow-xl shadow-[#E8500A]/30 scale-105 sm:scale-110 -translate-y-2'
                          : isDark
                          ? 'bg-[#1C1C1C] border border-white/10 hover:border-white/30 hover:bg-[#252525]'
                          : 'bg-[#F2F0EC] border border-black/10 hover:border-black/25 hover:bg-[#EAE8E4]'
                      }`}
                    >
                      {/* Geometric isometric facets inside */}
                      <svg viewBox="0 0 60 60" className="w-10 h-10 sm:w-14 sm:h-14">
                        {isActive ? (
                          /* Saturated Orange Highlighted Object */
                          <g>
                            <polygon points="30,8 48,18 30,28 12,18" fill="#FFFFFF" opacity="0.9" />
                            <polygon points="12,18 30,28 30,48 12,38" fill="#F2F0EC" opacity="0.6" />
                            <polygon points="30,28 48,18 48,38 30,48" fill="#D04506" />
                          </g>
                        ) : (
                          /* Soft Matte Monochrome Object */
                          <g>
                            <polygon points="30,8 48,18 30,28 12,18" fill={isDark ? '#D8D6D0' : '#B0B0AE'} />
                            <polygon points="12,18 30,28 30,48 12,38" fill={isDark ? '#8A8A8A' : '#707070'} />
                            <polygon points="30,28 48,18 48,38 30,48" fill={isDark ? '#3D3D3D' : '#404040'} />
                          </g>
                        )}
                      </svg>

                      {/* Micro Step Code Badge */}
                      <span
                        className={`absolute top-2 left-2 font-technical text-[9px] font-bold tracking-wider ${
                          isActive ? 'text-black' : isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                        }`}
                      >
                        {node.code}
                      </span>
                    </div>

                    {/* Node Stage Label */}
                    <span
                      className={`font-technical text-[10px] sm:text-xs tracking-widest mt-3 transition-colors ${
                        isActive
                          ? 'text-[#E8500A] font-bold'
                          : isDark
                          ? 'text-[#8A8A8A] group-hover:text-white'
                          : 'text-[#606060] group-hover:text-black'
                      }`}
                    >
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Connecting Horizontal Spine Line Behind Nodes */}
            <div
              className={`absolute top-[48px] sm:top-[68px] md:top-[76px] left-[10%] right-[10%] h-[2px] -z-0 pointer-events-none ${
                isDark ? 'bg-white/10' : 'bg-black/10'
              }`}
            />
          </div>
        </div>

        {/* Five-Row Process List (Separated by hairline dividers) */}
        <div
          className={`divide-y border-y ${
            isDark ? 'divide-white/10 border-white/10' : 'divide-black/10 border-black/10'
          }`}
        >
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeStepIdx === idx;
            return (
              <div
                key={step.index}
                tabIndex={0}
                role="button"
                aria-label={`Inspect step ${step.index} ${step.title}`}
                onClick={() => setActiveStepIdx(idx)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStepIdx(idx);
                  }
                }}
                className={`py-8 sm:py-10 transition-all duration-200 cursor-pointer group flex flex-col md:flex-row md:items-start justify-between gap-6 px-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                  isDark ? 'focus-visible:ring-offset-[#0D0D0D]' : 'focus-visible:ring-offset-white'
                } ${
                  isSelected
                    ? isDark
                      ? 'bg-white/[0.03]'
                      : 'bg-black/[0.03]'
                    : isDark
                    ? 'hover:bg-white/[0.015]'
                    : 'hover:bg-black/[0.015]'
                }`}
              >
                {/* Index & Title */}
                <div className="flex items-baseline gap-6 md:w-1/3">
                  <span
                    className={`font-technical text-lg sm:text-xl font-bold transition-all duration-300 ${
                      isSelected
                        ? 'text-[#E8500A] -translate-y-1'
                        : isDark
                        ? 'text-[#8A8A8A] group-hover:text-white'
                        : 'text-[#606060] group-hover:text-black'
                    }`}
                  >
                    {step.index} —
                  </span>
                  <div className="flex flex-col">
                    <span
                      className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
                        isDark ? 'text-[#F2F0EC] group-hover:text-white' : 'text-[#121212] group-hover:text-black'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`font-technical text-xs tracking-widest uppercase mt-1 ${
                        isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                      }`}
                    >
                      STAGE: {step.stageName}
                    </span>
                  </div>
                </div>

                {/* Summary & Specific Actions */}
                <div className="md:w-2/3 flex flex-col justify-between">
                  <p
                    className={`text-sm sm:text-base leading-relaxed mb-4 ${
                      isDark ? 'text-[#F2F0EC]/90' : 'text-[#222222]'
                    }`}
                  >
                    {step.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {step.actions.map(action => (
                      <span
                        key={action}
                        className={`font-technical text-[10px] tracking-wider px-2.5 py-1 rounded transition-colors ${
                          isSelected
                            ? 'bg-[#E8500A]/15 text-[#E8500A] border border-[#E8500A]/30 font-semibold'
                            : isDark
                            ? 'bg-white/5 text-[#8A8A8A] border border-white/5'
                            : 'bg-black/5 text-[#606060] border border-black/5'
                        }`}
                      >
                        {action}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`mt-4 font-technical text-xs flex items-center gap-2 ${
                      isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A]" />
                    <span>METRIC FOCUS: {step.metricFocus}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

