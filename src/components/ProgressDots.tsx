// src/components/ProgressDots.tsx
// Right-edge progress dots. Small circles, current one highlighted.
import { m, LazyMotion, domAnimation } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import { getLenis } from '../hooks/useLenis';

export function ProgressDots() {
  const { currentSection, getActiveSections, setSection } = useDeckStore();
  const active = getActiveSections();

  return (
    <LazyMotion features={domAnimation} strict>
      <nav
        aria-label="Section progress"
        className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 z-50 no-print"
      >
        {active.map((sec, i) => {
          const isCurrent = i === currentSection;
          return (
            <button
              key={sec.slug}
              onClick={() => {
                setSection(i);
                const el = document.querySelector(`[data-scene="${sec.slug}"]`) as HTMLElement | null;
                const lenis = getLenis();
                if (el && lenis) lenis.scrollTo(el, { immediate: false });
              }}
              aria-label={`Go to ${sec.headline}`}
              aria-current={isCurrent ? 'step' : undefined}
              className="relative flex items-center justify-center focus-visible:outline-2 rounded-full"
              style={{ width: 12, height: 12 }}
            >
              <m.span
                className="block rounded-full"
                animate={{
                  width: isCurrent ? 10 : 5,
                  height: isCurrent ? 10 : 5,
                  backgroundColor: isCurrent ? 'var(--glow-1)' : 'rgba(255,255,255,0.3)',
                  opacity: isCurrent ? 1 : 0.5,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ display: 'block' }}
              />
            </button>
          );
        })}
        <span
          className="font-mono text-center mt-2"
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem' }}
          aria-hidden="true"
        >
          {currentSection + 1}/{active.length}
        </span>
      </nav>
    </LazyMotion>
  );
}
