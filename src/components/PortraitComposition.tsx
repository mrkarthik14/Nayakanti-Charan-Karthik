import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { DEFAULT_PHOTO_B_DARK } from '../data/portraitConfig';

/**
 * Editorial Circular Photographic Portrait Component
 * 
 * Clean, production-grade presentation:
 * - Circle type frame perfectly fitted
 * - Authentic studio photographic portrait of Nayakanti Charan Karthik
 * - Micro 3D parallax tilt response on hover/mouse movement
 * - Verified badge pip
 * - Clean editorial profile label
 * - Zero upload prompts or drop overlays
 */
export const PortraitComposition: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Tilt state on mouse movement (restrained 2-3 degrees)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Active portrait state: uses custom profile if saved, otherwise default black shirt portrait
  const [currentPhoto] = useState<string>(() => {
    return (
      localStorage.getItem('nck_profile_pic') ||
      localStorage.getItem('nck_portrait_dark') ||
      DEFAULT_PHOTO_B_DARK
    );
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: Number((-y / (rect.height / 2) * 3).toFixed(2)),
      rotateY: Number((x / (rect.width / 2) * 3).toFixed(2))
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto flex flex-col items-center justify-center select-none py-2">
      
      {/* ========================================================
          THE REAL CIRCULAR PHOTOGRAPHIC PORTRAIT
          Clean, perfectly fitted developer portrait
          ======================================================== */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative z-10 w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] md:w-[360px] md:h-[360px] rounded-full p-[6px] transition-all duration-300 shadow-2xl flex items-center justify-center bg-[#141414] border-2 border-white/20 hover:border-[#E8500A]/60 shadow-black/90 group"
        style={{ perspective: 1000 }}
      >
        {/* Real Photograph Canvas (Circle Type) */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#FF6000]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.slice(0, 32)}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="w-full h-full relative"
            >
              <img
                src={currentPhoto}
                alt="Nayakanti Charan Karthik"
                className="w-full h-full object-cover object-top select-none"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Small verified badge pip on bottom edge */}
        <div className="absolute bottom-3 right-8 z-30 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border bg-black/90 border-white/20 text-white font-technical text-[8px] tracking-wider uppercase font-semibold shadow-md pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A]" />
          <span>VERIFIED</span>
        </div>
      </motion.div>

      {/* ========================================================
          EDITORIAL PROFILE LABEL
          ======================================================== */}
      <div className="relative z-20 flex flex-col items-center justify-center mt-6 text-center transition-colors duration-500">
        <div className="flex items-center gap-2 font-technical text-xs tracking-[0.24em] uppercase font-bold text-[#F2F0EC]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A]" />
          <span>CHARAN KARTHIK / PROFILE</span>
        </div>
        
        <div className="font-technical text-[10px] tracking-[0.22em] uppercase mt-1 text-[#8A8A8A]">
          DATA × AI × ENGINEERING
        </div>
      </div>

    </div>
  );
};
