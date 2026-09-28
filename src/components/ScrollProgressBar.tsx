import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressBar
 * Extremely thin (1.5px) orange scroll progress indicator fixed at the top of the viewport.
 * Unobtrusive, smooth spring tracking, and respects prefers-reduced-motion.
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#E8500A] origin-left z-50 pointer-events-none"
    />
  );
};
