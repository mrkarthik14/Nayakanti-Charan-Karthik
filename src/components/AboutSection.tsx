import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SectionHeader } from './SectionHeader';

export const AboutSection: React.FC = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Viewport scroll entrance with maximum vertical travel restrained to 24px
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.72']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  // Subtle staggered upward translation for the factual profile cards
  const cardsOpacity = useTransform(scrollYProgress, [0.15, 0.95], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.15, 0.95], [20, 0]);

  const profileCards = [
    {
      label: 'EDUCATION',
      value: 'M.Sc. Computer Science',
      subtext: '2024 – 2026'
    },
    {
      label: 'FOCUS',
      value: 'Data Analytics / ML / AI',
      subtext: 'Statistical Systems & Modeling'
    },
    {
      label: 'CURRENT',
      value: 'Technical / Data / AI Dev',
      subtext: 'Building & Experimenting'
    },
    {
      label: 'LOCATION',
      value: 'India',
      subtext: 'Available Globally / Remote'
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative py-24 md:py-32 border-t transition-colors ${
        isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10'
      }`}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity, y }}
        className="max-w-[1440px] mx-auto px-6 md:px-12"
      >
        {/* Standardized Editorial Section Header Pattern */}
        <SectionHeader
          monoLabel="01 / ABOUT"
          counter="01"
          titleLines={['FROM RAW DATA', 'TO WORKING SYSTEMS.']}
          description="Computer science graduate focused on turning data into decisions, models into usable systems, and technical ideas into products."
        />

        {/* Small Factual Profile Cards (Editorial Grid with scroll-linked entrance) */}
        <motion.div
          style={shouldReduceMotion ? undefined : { opacity: cardsOpacity, y: cardsY }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {profileCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`p-6 rounded-[18px] transition-all duration-200 group flex flex-col justify-between min-h-[160px] border ${
                isDark
                  ? 'bg-[#0D0D0D] border-white/10 hover:border-white/20'
                  : 'bg-[#FAFAFA] border-black/10 hover:border-black/25 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-technical text-[10px] tracking-[0.2em] uppercase ${
                      isDark ? 'text-[#8A8A8A]' : 'text-[#666666]'
                    }`}
                  >
                    {card.label}
                  </span>
                  <span
                    className={`font-technical text-[10px] ${
                      isDark ? 'text-[#8A8A8A]/40' : 'text-black/30'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <div
                  className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${
                    isDark ? 'text-[#F2F0EC] group-hover:text-white' : 'text-[#141414] group-hover:text-black'
                  }`}
                >
                  {card.value}
                </div>
              </div>

              <div
                className={`pt-3 border-t font-technical text-xs flex items-center justify-between ${
                  isDark ? 'border-white/5 text-[#8A8A8A]' : 'border-black/5 text-[#666666]'
                }`}
              >
                <span>{card.subtext}</span>
                <span className="text-[#E8500A] opacity-0 group-hover:opacity-100 transition-opacity">
                  •
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
