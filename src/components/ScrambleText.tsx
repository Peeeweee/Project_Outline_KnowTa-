// src/components/ScrambleText.tsx
// Text that scrambles random characters then settles into the real text.
// Respects calm mode: in calm mode, text renders immediately without scramble.
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { useDeckStore } from '../store/deckStore';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const FRAME_MS = 40;
const PASSES = 12; // scramble passes before each character settles

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // ms before starting
}

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function ScrambleText({ text, className = '', style, delay = 0 }: ScrambleTextProps) {
  const { calmMode } = useDeckStore();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
  const [displayed, setDisplayed] = useState<string>(() =>
    calmMode ? text : text.split('').map(() => ' ').join(''),
  );

  useEffect(() => {
    if (!isInView || calmMode) {
      if (calmMode) setDisplayed(text);
      return;
    }

    let settled = 0;
    let pass = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayed(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < settled) return char;
              return randomChar();
            })
            .join(''),
        );

        pass++;
        if (pass % PASSES === 0) {
          settled++;
        }
        if (settled >= text.length) {
          clearInterval(intervalId);
          setDisplayed(text);
        }
      }, FRAME_MS);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isInView, text, calmMode, delay]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontFamily: 'var(--font-mono)', ...style }}
      aria-label={text}
    >
      {displayed}
    </span>
  );
}
