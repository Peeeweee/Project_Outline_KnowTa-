// src/components/CursorLabel.tsx
// Custom cursor ring that follows the pointer and shows a label when hovering
// elements that have data-cursor="Drag" (or Spin, Open, etc.).
// Hidden on touch devices.
import { useEffect, useRef, useState, useCallback } from 'react';
import { m, LazyMotion, domAnimation, useMotionValue, useSpring } from 'motion/react';

const SPRING_FAST = { stiffness: 300, damping: 30 } as const;
const SPRING_LABEL = { stiffness: 120, damping: 22 } as const;

export function CursorLabel() {
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const isTouchRef = useRef(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, SPRING_FAST);
  const y = useSpring(rawY, SPRING_FAST);

  const handleMove = useCallback((e: PointerEvent) => {
    if (isTouchRef.current) return;
    rawX.set(e.clientX);
    rawY.set(e.clientY);

    const el = e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
    const cursorLabel = el?.getAttribute('data-cursor') ?? null;
    setLabel(cursorLabel);
    setVisible(true);
  }, [rawX, rawY]);

  const handleLeave = useCallback(() => {
    setVisible(false);
    setLabel(null);
  }, []);

  useEffect(() => {
    // Detect touch-primary devices
    const onTouch = () => { isTouchRef.current = true; };
    window.addEventListener('touchstart', onTouch, { once: true, passive: true });
    window.addEventListener('pointermove', handleMove);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);

  const hasLabel = label !== null;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ring */}
        <m.span
          animate={{
            opacity: visible ? 1 : 0,
            scale: hasLabel ? 1.8 : 1,
          }}
          transition={SPRING_LABEL}
          style={{
            position: 'absolute',
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid var(--color-human)',
            opacity: 0,
          }}
        />
        {/* Label */}
        <m.span
          animate={{
            opacity: hasLabel && visible ? 1 : 0,
            scale: hasLabel ? 1 : 0.8,
          }}
          transition={SPRING_LABEL}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--color-ink)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </m.span>
      </m.div>
    </LazyMotion>
  );
}
