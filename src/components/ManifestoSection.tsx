import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ManifestoSection: React.FC = () => {
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

  // Staggered upward translation for the principles statements
  const listOpacity = useTransform(scrollYProgress, [0.15, 0.9], [0, 1]);
  const listY = useTransform(scrollYProgress, [0.15, 0.9], [20, 0]);

  const principles = [
    { number: '01', text: 'DATA SHOULD ANSWER QUESTIONS.' },
    { number: '02', text: 'MODELS SHOULD SOLVE PROBLEMS.' },
    { number: '03', text: 'CODE SHOULD BE UNDERSTANDABLE.' },
    { number: '04', text: 'DESIGN SHOULD REDUCE FRICTION.' },
    { number: '05', text: 'THE BEST SYSTEMS ARE MEASURED.' }
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative py-28 md:py-36 border-t overflow-hidden transition-colors ${
        isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10'
      }`}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity, y }}
        className="max-w-[1440px] mx-auto px-6 md:px-12"
      >
        
        {/* Section Label */}
        <div className="mb-16">
          <span className="font-technical text-xs tracking-[0.25em] text-[#E8500A] uppercase block mb-3">
            05 / PRINCIPLES
          </span>
          <h2
            className={`text-sm font-technical tracking-[0.2em] uppercase ${
              isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
            }`}
          >
            CORE OPERATING CONVICTIONS
          </h2>
        </div>

        {/* Spacious Statements separated by thin rules with scroll-driven entrance */}
        <motion.div
          style={shouldReduceMotion ? undefined : { opacity: listOpacity, y: listY }}
          className={`divide-y border-y ${
            isDark ? 'divide-white/10 border-white/10' : 'divide-black/10 border-black/10'
          }`}
        >
          {principles.map((item) => (
            <div
              key={item.number}
              className={`py-10 md:py-14 flex flex-col md:flex-row md:items-baseline justify-between gap-6 group transition-colors px-4 -mx-4 rounded-lg ${
                isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.02]'
              }`}
            >
              <span className="font-technical text-sm md:text-base text-[#8A8A8A] group-hover:text-[#E8500A] transition-colors">
                {item.number} /
              </span>
              <h3
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight transition-colors md:text-right ${
                  isDark ? 'text-[#F2F0EC] group-hover:text-white' : 'text-[#121212] group-hover:text-black'
                }`}
              >
                {item.text}
              </h3>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
};


