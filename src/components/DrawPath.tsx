// src/components/DrawPath.tsx
// An SVG path that draws itself using pathLength.
// Optional scroll-linked mode via useScroll + useTransform.
import { useRef } from 'react';
import {
  m,
  LazyMotion,
  domAnimation,
  useInView,
  useScroll,
  useSpring,
} from 'motion/react';

const SPRING_SMOOTH = { stiffness: 120, damping: 22 } as const;

interface DrawPathProps {
  d: string;
  viewBox: string;
  strokeColor?: string;
  strokeWidth?: number;
  scrollLinked?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function DrawPath({
  d,
  viewBox,
  strokeColor = 'var(--color-human)',
  strokeWidth = 2,
  scrollLinked = false,
  width = '100%',
  height = 'auto',
  className = '',
}: DrawPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  // Scroll-linked mode: pathLength tied to scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollSpring = useSpring(scrollYProgress, SPRING_SMOOTH);
  const animPathLength = isInView ? 1 : 0;

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={containerRef} className={className}>
        <svg
          viewBox={viewBox}
          width={width}
          height={height}
          aria-hidden="true"
          style={{ overflow: 'visible' }}
        >
          {/* Background path (faint track) */}
          <path
            d={d}
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth={strokeWidth}
          />
          {/* Animated drawing path */}
          <m.path
            d={d}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={scrollLinked ? undefined : { pathLength: animPathLength }}
            style={scrollLinked ? { pathLength: scrollSpring } : undefined}
            transition={
              scrollLinked
                ? undefined
                : { ...SPRING_SMOOTH, duration: 1.2 }
            }
          />
        </svg>
      </div>
    </LazyMotion>
  );
}
