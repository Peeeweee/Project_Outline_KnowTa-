// src/components/TiltCard.tsx
// A card that leans toward the pointer using rotateX/rotateY motion values.
// Smooth spring preset. Spotlight follows pointer. Tilt disabled in calm mode.
import {
  type ReactNode,
  useRef,
  useCallback,
} from 'react';
import {
  useMotionValue,
  useSpring,
  useTransform,
  m,
  LazyMotion,
  domAnimation,
} from 'motion/react';
import { useDeckStore } from '../store/deckStore';

const SPRING_SMOOTH = { stiffness: 120, damping: 22 } as const;
const MAX_TILT = 8; // degrees

interface TiltCardProps extends React.ComponentPropsWithoutRef<typeof m.div> {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TiltCard({ children, className = '', style, ...rest }: TiltCardProps) {
  const { calmMode } = useDeckStore();
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw pointer position relative to card center (-0.5 to 0.5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  // Spotlight position in px
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const springX = useSpring(pointerX, SPRING_SMOOTH);
  const springY = useSpring(pointerY, SPRING_SMOOTH);

  // Map normalized position to rotation degrees
  const rotateY = useTransform(springX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (calmMode || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(nx);
      pointerY.set(ny);
      spotX.set(e.clientX - rect.left);
      spotY.set(e.clientY - rect.top);
    },
    [calmMode, pointerX, pointerY, spotX, spotY],
  );

  const handleMouseLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={cardRef}
        className={className}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: calmMode ? 0 : rotateX,
          rotateY: calmMode ? 0 : rotateY,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          border: '1px solid var(--color-hairline)',
          background: 'var(--color-surface)',
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {/* Spotlight */}
        {!calmMode && (
          <m.span
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: 220,
              height: 220,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(244,239,230,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
              translateX: '-50%',
              translateY: '-50%',
              left: spotX,
              top: spotY,
              zIndex: 1,
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
      </m.div>
    </LazyMotion>
  );
}
