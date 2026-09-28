import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  yOffset?: number;
  startOffset?: string;
  endOffset?: string;
}

/**
 * ScrollRevealSection
 * Entrance animation using Framer Motion's useScroll and useTransform hooks
 * to create a gentle fade and upward translation effect as each section enters the viewport.
 */
export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  id,
  yOffset = 32,
  startOffset = 'start end',
  endOffset = 'start 0.75'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [startOffset as any, endOffset as any]
  });

  // Fade from 0 to 1 and translate from yOffset to 0
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div id={id} ref={containerRef} className={className}>
      <motion.div style={{ opacity, y }}>
        {children}
      </motion.div>
    </div>
  );
};

export interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  startOffset?: string;
  endOffset?: string;
}

/**
 * ScrollRevealItem
 * Granular entrance animation for nested cards, grids, or headers.
 */
export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  className = '',
  yOffset = 24,
  startOffset = 'start 0.95',
  endOffset = 'start 0.75'
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: [startOffset as any, endOffset as any]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={itemRef} className={className}>
      <motion.div style={{ opacity, y }}>
        {children}
      </motion.div>
    </div>
  );
};

