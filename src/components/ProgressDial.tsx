// src/components/ProgressDial.tsx
// Right-side vertical progress indicator showing current scene position.
import { m, LazyMotion, domAnimation } from 'motion/react';
import { useDeckStore } from '../store/deckStore';

const SPRING_SNAPPY = { type: 'spring', stiffness: 300, damping: 30 } as const;

export function ProgressDial() {
  const { currentScene, setScene, getActiveScenes } = useDeckStore();
  const activeScenes = getActiveScenes();
  const total = activeScenes.length;

  return (
    <LazyMotion features={domAnimation} strict>
      <nav
        aria-label="Scene navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50"
      >
        {activeScenes.map((scene: any, i: number) => {
          const isActive = i === currentScene;
          return (
            <button
              key={scene.id}
              onClick={() => setScene(i)}
              aria-label={`Go to scene ${i + 1}: ${scene.headline}`}
              aria-current={isActive ? 'step' : undefined}
              className="relative flex items-center justify-center focus-visible:outline-2 rounded-full"
              style={{ width: 12, height: 12 }}
            >
              <m.span
                className="block rounded-full"
                animate={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  backgroundColor: isActive
                    ? 'var(--color-human)'
                    : 'var(--color-muted)',
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={SPRING_SNAPPY}
                style={{ display: 'block' }}
              />
            </button>
          );
        })}
        {/* Progress fraction label */}
        <span
          className="section-tag text-center mt-2"
          style={{ color: 'var(--color-muted)', fontSize: '0.65rem' }}
          aria-hidden="true"
        >
          {currentScene + 1}/{total}
        </span>
      </nav>
    </LazyMotion>
  );
}
