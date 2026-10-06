// src/components/ReferenceDrawer.tsx
// Global right-side reference drawer. Shares layoutId with SourceChip for the expand transition.
// Mount once at the app root. Esc closes.
import { useEffect } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'motion/react';
import { useRefDrawerStore } from '../store/refDrawerStore';
import { referenceMap } from '../data/references';

const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 22 } as const;

export function ReferenceDrawer() {
  const { openKey, close } = useRefDrawerStore();
  const ref = openKey !== null ? referenceMap.get(openKey) : undefined;

  // Esc closes the drawer
  useEffect(() => {
    if (openKey === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openKey, close]);

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {openKey !== null && (
          <>
            {/* Backdrop */}
            <m.div
              key="ref-backdrop"
              className="fixed inset-0 z-[80]"
              style={{ background: 'rgba(10,15,30,0.65)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING_SMOOTH}
              onClick={close}
              aria-hidden="true"
            />

            {/* Drawer panel - uses layoutId to connect with the chip */}
            <m.aside
              key={`ref-drawer-${openKey}`}
              layoutId={`ref-chip-${openKey}`}
              role="dialog"
              aria-label={`Reference ${openKey}`}
              aria-modal="true"
              className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-md flex flex-col py-12 px-8"
              style={{
                background: 'var(--color-surface)',
                borderLeft: '1px solid var(--color-hairline)',
              }}
              transition={SPRING_SMOOTH}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--color-human)',
                    letterSpacing: '0.08em',
                  }}
                  className="uppercase"
                >
                  {openKey === 0 ? '// ALL SOURCES & REFERENCES' : `Reference [${openKey}]`}
                </span>
                <button
                  onClick={close}
                  aria-label="Close reference drawer"
                  className="font-mono text-xs px-2.5 py-1 border border-white/20 text-white/70 hover:text-white hover:border-white/40 cursor-pointer transition-colors"
                >
                  ESC ✕
                </button>
              </div>

              {/* Reference content */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-mono text-xs">
                {openKey === 0 ? (
                  <div className="flex flex-col divide-y divide-white/10">
                    {Array.from(referenceMap.values()).map((r) => (
                      <div key={r.key} className="py-3 flex flex-col gap-1">
                        <span className="text-teal-400">[{r.key}]</span>
                        <p className="text-white/80 font-body text-sm leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <p className="font-body text-base text-white/90 leading-relaxed">
                      {ref?.text ?? 'Reference citation not found.'}
                    </p>
                    <button
                      onClick={() => useRefDrawerStore.getState().open(0)}
                      className="mt-4 self-start font-mono text-xs text-human underline underline-offset-4 cursor-pointer hover:opacity-80"
                    >
                      VIEW ALL REFERENCES →
                    </button>
                  </div>
                )}
              </div>
            </m.aside>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
