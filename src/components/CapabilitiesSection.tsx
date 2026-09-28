import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CAPABILITIES } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { SectionHeader } from './SectionHeader';

export const CapabilitiesSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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

  // Staggered lift on the 2x2 Bento grid
  const bentoOpacity = useTransform(scrollYProgress, [0.15, 0.9], [0, 1]);
  const bentoY = useTransform(scrollYProgress, [0.15, 0.9], [22, 0]);

  // Original Matte 3D Icons for each capability
  const renderMatte3DIcon = (type: string) => {
    switch (type) {
      case 'analytics':
        // 3D Stepped Bar Tower & Lens
        return (
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            {/* Base platform */}
            <path d="M6,34 L22,40 L38,34 L22,28 Z" fill={isDark ? '#1C1C1C' : '#E8E8E6'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1" />
            {/* Bar 1 */}
            <path d="M12,28 L17,30 L17,18 L12,16 Z" fill={isDark ? '#D8D6D0' : '#8A8A8A'} />
            <path d="M12,16 L17,18 L20,16 L15,14 Z" fill={isDark ? '#F2F0EC' : '#B8B6B0'} />
            {/* Bar 2 (Orange Accent) */}
            <path d="M19,26 L24,28 L24,10 L19,8 Z" fill="#D04506" />
            <path d="M19,8 L24,10 L27,8 L22,6 Z" fill="#E8500A" />
            {/* Bar 3 */}
            <path d="M26,24 L31,26 L31,14 L26,12 Z" fill={isDark ? '#2A2A2A' : '#5A5A5A'} />
            <path d="M26,12 L31,14 L34,12 L29,10 Z" fill={isDark ? '#3D3D3D' : '#707070'} />
          </svg>
        );

      case 'ml':
        // 3D Geometric Neural Lattice & Hyperplane
        return (
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            {/* Coordinate Plane */}
            <path d="M8,30 L36,14" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Node 1 */}
            <circle cx="12" cy="24" r="5" fill={isDark ? '#F2F0EC' : '#222222'} />
            <circle cx="12" cy="24" r="2" fill={isDark ? '#141414' : '#FFFFFF'} />
            {/* Node 2 - Orange */}
            <circle cx="24" cy="14" r="6" fill="#E8500A" />
            <circle cx="24" cy="14" r="2.5" fill="#FFFFFF" />
            {/* Node 3 */}
            <circle cx="34" cy="28" r="5" fill={isDark ? '#D8D6D0' : '#444444'} />
            <circle cx="34" cy="28" r="2" fill={isDark ? '#141414' : '#FFFFFF'} />
            {/* Connecting vectors */}
            <line x1="16" y1="21" x2="20" y2="17" stroke="#E8500A" strokeWidth="1.5" />
            <line x1="28" y1="17" x2="31" y2="24" stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} strokeWidth="1.5" />
          </svg>
        );

      case 'ai':
        // 3D Prismatic Token Embeddings / Core Cube
        return (
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            {/* Isometric Cube (Matte Studio) */}
            {/* Top face */}
            <polygon points="22,6 34,13 22,20 10,13" fill={isDark ? '#F2F0EC' : '#E8E8E6'} />
            {/* Left face */}
            <polygon points="10,13 22,20 22,34 10,27" fill={isDark ? '#BDBBB5' : '#A8A6A0'} />
            {/* Right face with Orange Highlight */}
            <polygon points="22,20 34,13 34,27 22,34" fill="#E8500A" />
            {/* Small floating satellite block */}
            <polygon points="36,4 40,6 38,9 34,7" fill="#E8500A" />
          </svg>
        );

      case 'engineering':
        // 3D Interlocking Architecture & Container Blocks
        return (
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            {/* Lower tier */}
            <polygon points="8,26 22,33 36,26 22,19" fill={isDark ? '#262626' : '#E0E0DE'} stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} strokeWidth="1" />
            {/* Pillar 1 */}
            <rect x="13" y="16" width="5" height="12" fill={isDark ? '#D8D6D0' : '#8A8A8A'} rx="1" />
            {/* Pillar 2 */}
            <rect x="26" y="16" width="5" height="12" fill={isDark ? '#D8D6D0' : '#8A8A8A'} rx="1" />
            {/* Center Orange Module */}
            <rect x="19.5" y="10" width="5" height="18" fill="#E8500A" rx="1" />
            {/* Top Structural lintel */}
            <polygon points="11,10 22,15 33,10 22,5" fill={isDark ? '#F2F0EC' : '#222222'} />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className={`relative py-24 md:py-32 border-t transition-colors ${
        isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10'
      }`}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity, y }}
        className="max-w-[1440px] mx-auto px-6 md:px-12"
      >
        
        {/* Section Header */}
        <SectionHeader
          monoLabel="03 / CAPABILITIES"
          counter="03"
          titleLines={['WHAT I CAN', 'BUILD.']}
          description="Applied technical execution across analytical insight, predictive modeling, artificial intelligence prototypes, and robust software architectures."
        />

        {/* 2x2 Bento Layout with staggered entrance */}
        <motion.div
          style={shouldReduceMotion ? undefined : { opacity: bentoOpacity, y: bentoY }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CAPABILITIES.map(cap => {
            const isHovered = hoveredCard === cap.id;
            return (
              <div
                key={cap.id}
                onMouseEnter={() => setHoveredCard(cap.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative border rounded-[20px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 min-h-[340px] ${
                  isDark
                    ? isHovered
                      ? 'bg-[#0D0D0D] border-white/30 -translate-y-1 shadow-2xl shadow-black/60'
                      : 'bg-[#0D0D0D] border-white/10'
                    : isHovered
                    ? 'bg-white border-black/25 -translate-y-1 shadow-xl shadow-black/10'
                    : 'bg-white border-black/10 shadow-sm'
                }`}
              >
                {/* Top Row: Index, Duration Chip & 3D Matte Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-technical text-sm font-bold text-[#E8500A]">
                        {cap.index}
                      </span>
                      <span className={isDark ? 'text-white/20' : 'text-black/20'}>/</span>
                      {/* Duration Chip */}
                      <span
                        className={`font-technical text-[10px] tracking-widest px-2.5 py-1 rounded-full font-semibold border ${
                          isDark
                            ? 'text-[#F2F0EC] bg-white/5 border-white/10'
                            : 'text-[#141414] bg-black/5 border-black/10'
                        }`}
                      >
                        {cap.durationChip}
                      </span>
                    </div>

                    {/* 3D Matte Icon Container */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 border ${
                        isDark ? 'bg-[#141414] border-white/5' : 'bg-[#F2F0EC] border-black/10'
                      }`}
                    >
                      {renderMatte3DIcon(cap.iconType)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl sm:text-3xl font-bold tracking-tight mb-3 ${
                      isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
                    }`}
                  >
                    {cap.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm sm:text-base leading-relaxed mb-8 ${
                      isDark ? 'text-[#8A8A8A]' : 'text-[#555555]'
                    }`}
                  >
                    {cap.description}
                  </p>
                </div>

                {/* Deliverables Chips */}
                <div
                  className={`pt-6 border-t ${
                    isDark ? 'border-white/10' : 'border-black/10'
                  }`}
                >
                  <span
                    className={`font-technical text-[10px] tracking-[0.2em] uppercase block mb-3 ${
                      isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                    }`}
                  >
                    CORE DELIVERABLES &amp; TOOLS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cap.deliverables.map(deliv => (
                      <span
                        key={deliv}
                        className={`font-technical text-[10px] tracking-wider px-2.5 py-1 rounded border ${
                          isDark
                            ? 'bg-[#141414] border-white/5 text-[#F2F0EC]/90'
                            : 'bg-[#F5F5F3] border-black/10 text-[#222222]'
                        }`}
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </motion.div>
    </section>
  );
};

