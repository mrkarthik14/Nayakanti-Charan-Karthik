import React from 'react';
import { motion } from 'framer-motion';
import { BrandLogoMark } from './BrandLogoMark';
import { useTheme } from '../context/ThemeContext';
import { useSectionTransition } from '../hooks/useSectionTransition';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const { ref, motionStyle } = useSectionTransition<HTMLElement>({ yOffset: 24, endOffset: 'start 0.85' });

  return (
    <footer
      ref={ref}
      className={`relative pt-20 pb-12 border-t overflow-hidden transition-colors ${
        isDark ? 'bg-[#0D0D0D] text-[#8A8A8A] border-white/10' : 'bg-[#FAFAFA] text-[#606060] border-black/10'
      }`}
    >
      <motion.div style={motionStyle} className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Three Columns Top Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          
          {/* Identity column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BrandLogoMark height={32} />
                <span className="font-technical text-base font-bold tracking-[0.25em]">
                  <span className="text-[#FF7700]">N</span>
                  <span className="text-[#FFFFFF]">C</span>
                  <span className="text-[#999999]">K</span>
                </span>
              </div>
              <p
                className={`font-technical text-xs max-w-sm leading-relaxed mb-4 ${
                  isDark ? 'text-[#8A8A8A]' : 'text-[#666666]'
                }`}
              >
                Nayakanti Charan Karthik — Data Analytics, Machine Learning &amp; Applied AI Systems Engineering.
              </p>
            </div>
            <div
              className={`font-technical text-[11px] ${
                isDark ? 'text-[#8A8A8A]/70' : 'text-black/50'
              }`}
            >
              LOCATION: INDIA · WORKING WORLDWIDE
            </div>
          </div>

          {/* COLUMN 1: NAVIGATION */}
          <div className="lg:col-span-2">
            <span
              className={`font-technical text-[10px] tracking-[0.25em] uppercase block mb-4 font-semibold ${
                isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
              }`}
            >
              NAVIGATION
            </span>
            <ul className="space-y-2.5 font-technical text-xs">
              <li>
                <a
                  href="#work"
                  className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1 ${
                    isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                  }`}
                >
                  WORK
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1 ${
                    isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                  }`}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a
                  href="#stack"
                  className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1 ${
                    isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                  }`}
                >
                  STACK
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1 ${
                    isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                  }`}
                >
                  PROCESS
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1 ${
                    isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                  }`}
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: PROFILES */}
          <div className="lg:col-span-2">
            <span
              className={`font-technical text-[10px] tracking-[0.25em] uppercase block mb-4 font-semibold ${
                isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
              }`}
            >
              PROFILES
            </span>
            <ul className="space-y-2.5 font-technical text-xs">
              <li>
                <a
                  href="https://github.com/mrkarthik14"
                  target="_blank"
                  rel="noreferrer"
                  className={`transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1 ${
                    isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                  }`}
                >
                  <span>GITHUB</span>
                  <span className="text-[#E8500A]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nayakanticharankarthik/"
                  target="_blank"
                  rel="noreferrer"
                  className={`transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1 ${
                    isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                  }`}
                >
                  <span>LINKEDIN</span>
                  <span className="text-[#E8500A]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1 ${
                    isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                  }`}
                >
                  PORTFOLIO
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: TECH */}
          <div className="lg:col-span-3">
            <span
              className={`font-technical text-[10px] tracking-[0.25em] uppercase block mb-4 font-semibold ${
                isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
              }`}
            >
              TECH FOCUS
            </span>
            <ul className="space-y-2.5 font-technical text-xs">
              <li className={isDark ? 'text-[#F2F0EC]/80' : 'text-[#222222]'}>PYTHON (SCIKIT-LEARN · PANDAS)</li>
              <li className={isDark ? 'text-[#F2F0EC]/80' : 'text-[#222222]'}>SQL (WINDOW FUNCS · NORMALIZATION)</li>
              <li className={isDark ? 'text-[#F2F0EC]/80' : 'text-[#222222]'}>AI (NLP · RAG · LLM INTEGRATION)</li>
              <li className={isDark ? 'text-[#F2F0EC]/80' : 'text-[#222222]'}>ML (EXPERIMENTATION · CUPED)</li>
              <li className={isDark ? 'text-[#F2F0EC]/80' : 'text-[#222222]'}>DATA (POWER BI · DAX · TABLEAU)</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM: Huge Cropped Wordmark extending beyond viewport boundaries */}
        <div className="relative pt-12 select-none overflow-hidden">
          <div
            className={`text-[20vw] font-black tracking-[-0.07em] leading-none whitespace-nowrap -mb-[5vw] pointer-events-none text-center transition-colors ${
              isDark ? 'text-white/[0.04]' : 'text-black/[0.04]'
            }`}
          >
            NCK
          </div>

          <div
            className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-technical text-xs border-t transition-colors ${
              isDark ? 'text-[#8A8A8A]/80 border-white/5' : 'text-[#606060] border-black/5'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-semibold text-white/90">Nayakanti Charan Karthik</span>
              <span className="hidden sm:inline opacity-40">·</span>
              <span>© 2026 Nayakanti Charan Karthik. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A]" />
                <span>NCK PORTFOLIO SYSTEM</span>
              </span>
              <a
                href="#top"
                className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded px-1.5 py-0.5 ${
                  isDark ? 'hover:text-white focus-visible:ring-offset-[#0D0D0D]' : 'hover:text-black focus-visible:ring-offset-white'
                }`}
              >
                BACK TO TOP ↑
              </a>
            </div>
          </div>
        </div>

      </motion.div>
    </footer>
  );
};

