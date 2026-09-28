import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

export interface SectionTransitionOptions {
  yOffset?: number;
  startOffset?: string;
  endOffset?: string;
}

/**
 * useSectionTransition
 * Custom hook leveraging Framer Motion's useScroll and useTransform hooks
 * to fade and slightly translate elements upwards as they enter the viewport.
 */
export function useSectionTransition<T extends HTMLElement = HTMLElement>(
  options: SectionTransitionOptions = {}
) {
  const {
    yOffset = 32,
    startOffset = 'start end',
    endOffset = 'start 0.72'
  } = options;

  const ref = useRef<T>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startOffset as any, endOffset as any]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);

  return {
    ref,
    motionStyle: shouldReduceMotion ? undefined : { opacity, y },
    scrollYProgress
  };
}
