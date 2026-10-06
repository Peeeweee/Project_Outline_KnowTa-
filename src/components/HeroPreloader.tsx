import { useState, useEffect } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'motion/react';
import { useDeckStore } from '../store/deckStore';

export function HeroPreloader() {
  const { calmMode } = useDeckStore();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Check if calmMode or already shown in this session
    if (sessionStorage.getItem('knowta_hero_preloaded') === 'true') {
      return false;
    }
    return true;
  });

  const [draining, setDraining] = useState(false);
  const [waveGrown, setWaveGrown] = useState(false);

  useEffect(() => {
    if (calmMode) {
      setVisible(false);
      sessionStorage.setItem('knowta_hero_preloaded', 'true');
      return;
    }

    if (!visible) return;

    // Skippable with any key or click
    const handleSkip = () => {
      setVisible(false);
      sessionStorage.setItem('knowta_hero_preloaded', 'true');
    };

    window.addEventListener('keydown', handleSkip);

    // Wave grows at 0.7s
    const tGrow = setTimeout(() => {
      setWaveGrown(true);
    }, 700);

    // Panel drains downward at 1.1s
    const tDrain = setTimeout(() => {
      setDraining(true);
    }, 1100);

    // Completely dismiss at 1.6s
    const tDone = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('knowta_hero_preloaded', 'true');
    }, 1600);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      clearTimeout(tGrow);
      clearTimeout(tDrain);
      clearTimeout(tDone);
    };
  }, [calmMode, visible]);

  if (!visible) return null;

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
        key="hero-preloader-panel"
        className="fixed inset-0 z-[120] pointer-events-auto flex flex-col items-center justify-center overflow-hidden cursor-pointer"
        style={{ backgroundColor: 'var(--paper)' }}
        initial={{ y: 0 }}
        animate={{ y: draining ? '100%' : '0%' }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        onClick={() => {
          setVisible(false);
          sessionStorage.setItem('knowta_hero_preloaded', 'true');
        }}
        aria-label="Presentation preloader. Press any key or click to skip."
      >
        <div className="relative w-full max-w-4xl px-8 flex flex-col items-center">
          {/* Sound-wave SVG line drawn across the center */}
          <svg
            viewBox="0 0 1000 240"
            className="w-full h-auto overflow-visible"
            fill="none"
          >
            {/* Background subtle centerline */}
            <line
              x1="0"
              y1="120"
              x2="1000"
              y2="120"
              stroke="rgba(10, 10, 11, 0.12)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Main soundwave path drawn across center */}
            <m.path
              d="M 0 120 
                 Q 80 120, 120 100 
                 T 200 140 
                 T 280 80 
                 T 360 160 
                 T 440 50 
                 T 500 190 
                 T 560 40 
                 T 640 170 
                 T 720 70 
                 T 800 150 
                 T 880 100 
                 Q 940 120, 1000 120"
              stroke="var(--ink)"
              strokeWidth={waveGrown ? 3 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scaleY: waveGrown ? 1.6 : 1,
              }}
              transition={{
                pathLength: { duration: 0.7, ease: 'easeInOut' },
                scaleY: { duration: 0.4, ease: 'easeOut' },
                strokeWidth: { duration: 0.3 },
              }}
              style={{ transformOrigin: 'center' }}
            />
          </svg>

          {/* Minimal preloader label */}
          <div className="mt-8 flex items-center justify-between w-full font-mono text-[11px] uppercase tracking-widest text-ink/60">
            <span>// KNOW-TA! INITIALIZING</span>
            <span>PRESS ANY KEY TO SKIP</span>
          </div>
        </div>
      </m.div>
    </AnimatePresence>
  </LazyMotion>
  );
}
