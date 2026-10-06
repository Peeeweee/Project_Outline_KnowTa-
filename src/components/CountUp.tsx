// src/components/CountUp.tsx
// Animates a number into view using useInView + useSpring. Mono font.
import { useEffect, useRef } from 'react';
import { useInView, useSpring, useMotionValue, useTransform, m, LazyMotion, domAnimation } from 'motion/react';

import { useDeckStore } from '../store/deckStore';

const SPRING_SMOOTH = { stiffness: 120, damping: 22, mass: 1 } as const;

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  style,
}: CountUpProps) {
  const { calmMode } = useDeckStore();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const motionVal = useMotionValue(calmMode ? value : 0);
  const springVal = useSpring(motionVal, SPRING_SMOOTH);

  // Display value with thousands separators via Intl.NumberFormat
  const display = useTransform(springVal, (v) => {
    const val = calmMode ? value : v;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val);
  });

  useEffect(() => {
    if (isInView) {
      if (calmMode) {
        springVal.jump(value);
      } else {
        motionVal.set(value);
      }
    }
  }, [isInView, value, motionVal, springVal, calmMode]);

  return (
    <LazyMotion features={domAnimation} strict>
      <span
        ref={ref}
        className={className}
        aria-label={`${prefix}${value}${suffix}`}
        style={{ fontFamily: 'var(--font-mono)', ...style }}
      >
        {prefix}
        <m.span>{display}</m.span>
        {suffix}
      </span>
    </LazyMotion>
  );
}
