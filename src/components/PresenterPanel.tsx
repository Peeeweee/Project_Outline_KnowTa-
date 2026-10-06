// src/components/PresenterPanel.tsx
// Floating presenter mode panel (toggle with 'P').
// Features: timer (start/pause/reset), current & next section names, key cheat sheet.
import { useState, useEffect } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'motion/react';
import { useDeckStore } from '../store/deckStore';

export function PresenterPanel() {
  const { presenterMode, togglePresenterMode, currentSection, getActiveSections, nextSection, prevSection } = useDeckStore();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const activeSections = getActiveSections();
  const currentDef = activeSections[currentSection];
  const nextDef = currentSection < activeSections.length - 1 ? activeSections[currentSection + 1] : null;

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {presenterMode && (
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-6 z-[120] w-80 p-5 rounded-[32px] border shadow-2xl flex flex-col gap-4 select-none no-print backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(7, 10, 24, 0.95)',
              borderColor: 'var(--glow-1)',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.7), 0 0 24px -6px rgba(53,86,255,0.25)',
              color: 'var(--white)',
            }}
            role="region"
            aria-label="Presenter floating panel"
          >
            {/* Top Bar: Title & Close */}
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-human)' }} />
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                  // PRESENTER TOOLS
                </span>
              </div>
              <button
                onClick={togglePresenterMode}
                className="font-mono text-xs text-white/50 hover:text-white px-1.5 py-0.5 border border-white/20 hover:border-white/50 transition-colors cursor-pointer"
                title="Press P to hide"
              >
                P ✕
              </button>
            </div>

            {/* Timer & Controls */}
            <div className="flex items-center justify-between bg-white/[0.04] p-3 border border-white/10">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">Elapsed Time</span>
                <span className="font-mono text-2xl font-bold tracking-tight text-white tabular-nums">
                  {mins}:{secs}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider border cursor-pointer transition-all hover:bg-white/10"
                  style={{
                    borderColor: isRunning ? 'var(--color-ai)' : 'var(--color-human)',
                    color: isRunning ? 'var(--color-ai)' : 'var(--color-human)',
                  }}
                >
                  {isRunning ? 'PAUSE' : 'START'}
                </button>
                <button
                  onClick={() => {
                    setIsRunning(false);
                    setSeconds(0);
                  }}
                  className="px-2.5 py-1.5 font-mono text-xs uppercase tracking-wider border border-white/20 text-white/60 hover:text-white hover:border-white/40 cursor-pointer transition-all hover:bg-white/10"
                  title="Reset Timer"
                >
                  RESET
                </button>
              </div>
            </div>

            {/* Current & Next Section Information */}
            <div className="flex flex-col gap-3 font-mono text-xs border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              {/* Current */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-white/40 text-[10px] uppercase tracking-wider">
                  <span>Current Section</span>
                  <span className="text-white/60">
                    {currentSection + 1} / {activeSections.length}
                  </span>
                </div>
                <div className="text-white font-medium truncate text-sm" title={currentDef?.headline}>
                  {currentDef ? currentDef.headline : '-'}
                </div>
                <div className="text-white/40 text-[10px] uppercase truncate">
                  {currentDef ? `// ${currentDef.label}` : ''}
                </div>
              </div>

              {/* Next */}
              <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
                <span className="text-white/40 text-[10px] uppercase tracking-wider">Next Section</span>
                <div className="text-white/80 truncate text-xs" title={nextDef ? nextDef.headline : 'End of presentation'}>
                  {nextDef ? nextDef.headline : '- (End of Presentation)'}
                </div>
              </div>

              {/* Prev / Next quick buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="flex-1 py-1 text-center font-mono text-[11px] border border-white/20 text-white/70 hover:text-white hover:border-white/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  ← PREV
                </button>
                <button
                  onClick={nextSection}
                  disabled={currentSection >= activeSections.length - 1}
                  className="flex-1 py-1 text-center font-mono text-[11px] border border-white/20 text-white/70 hover:text-white hover:border-white/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  NEXT →
                </button>
              </div>
            </div>

            {/* Key Cheat Sheet */}
            <div className="flex flex-col gap-2 font-mono">
              <span className="text-[10px] uppercase tracking-widest text-white/40">
                // KEY CHEAT SHEET
              </span>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                <div className="flex items-center justify-between text-white/60 pr-1">
                  <span className="text-white font-semibold">P</span>
                  <span>Presenter</span>
                </div>
                <div className="flex items-center justify-between text-white/60 pl-1">
                  <span className="text-white font-semibold">Q</span>
                  <span>Q&A Deck</span>
                </div>
                <div className="flex items-center justify-between text-white/60 pr-1">
                  <span className="text-white font-semibold">← / →</span>
                  <span>Prev/Next</span>
                </div>
                <div className="flex items-center justify-between text-white/60 pl-1">
                  <span className="text-white font-semibold">↑ / ↓</span>
                  <span>Prev/Next</span>
                </div>
                <div className="flex items-center justify-between text-white/60 pr-1">
                  <span className="text-white font-semibold">C</span>
                  <span>Calm Mode</span>
                </div>
                <div className="flex items-center justify-between text-white/60 pl-1">
                  <span className="text-white font-semibold">Esc</span>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
