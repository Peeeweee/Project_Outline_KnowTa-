// src/components/QnADrawer.tsx
// Right-side Q&A drawer (toggle with 'Q' or nav button).
// Features: 10 panel defense questions as an accordion with Motion layout animations.
import { useState, useEffect } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import { qna } from '../data/scenes';

export function QnADrawer() {
  const { qaOpen, closeQA, calmMode } = useDeckStore();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Close on Esc
  useEffect(() => {
    if (!qaOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQA();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [qaOpen, closeQA]);

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {qaOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[130] backdrop-blur-sm no-print"
              style={{ backgroundColor: 'rgba(7, 10, 24, 0.75)' }}
              onClick={closeQA}
              aria-hidden="true"
            />

            {/* Slide-out Drawer Panel */}
            <m.div
              initial={calmMode ? { opacity: 0 } : { x: '100%' }}
              animate={calmMode ? { opacity: 1 } : { x: 0 }}
              exit={calmMode ? { opacity: 0 } : { x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg border-l shadow-2xl z-[140] flex flex-col no-print"
              style={{
                backgroundColor: 'rgba(9, 13, 31, 0.98)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '-12px 0 36px rgba(0, 0, 0, 0.7)',
                color: 'var(--white)',
              }}
              role="dialog"
              aria-label="Q and A Panel Defense Drawer"
            >
              {/* Header */}
              <div
                className="px-6 py-5 border-b flex justify-between items-center shrink-0"
                style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                    // DEFENSE INQUIRIES
                  </span>
                  <h3
                    className="font-headline text-lg uppercase tracking-tight text-white"
                    style={{ fontWeight: 800 }}
                  >
                    10 Questions for the Panel
                  </h3>
                </div>

                <button
                  onClick={closeQA}
                  className="px-2.5 py-1 border border-white/20 hover:border-white/60 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1.5 focus-visible:outline-2"
                  aria-label="Close Q and A drawer (or press Escape)"
                  title="Press Escape to close"
                >
                  <span>ESC</span>
                  <span className="text-sm leading-none">✕</span>
                </button>
              </div>

              {/* Description bar */}
              <div
                className="px-6 py-2.5 bg-white/[0.03] border-b flex items-center justify-between font-mono text-[11px] text-white/50 shrink-0"
                style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                <span>CURATED METHODOLOGY JUSTIFICATIONS</span>
                <span className="text-white/70">{qna.length} TOPICS</span>
              </div>

              {/* Accordion Questions List */}
              <div
                className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3 custom-scrollbar"
                style={{ scrollbarWidth: 'thin' }}
              >
                {qna.map((item, i) => {
                  const isOpen = openIdx === i;
                  const numStr = (i + 1).toString().padStart(2, '0');

                  return (
                    <m.div
                      layout={!calmMode}
                      key={i}
                      className="border transition-colors duration-150 overflow-hidden"
                      style={{
                        borderColor: isOpen ? 'var(--glow-1)' : 'rgba(255, 255, 255, 0.12)',
                        backgroundColor: isOpen ? 'rgba(53, 86, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="w-full text-left p-4 cursor-pointer hover:bg-white/[0.04] flex items-start justify-between gap-3 transition-colors focus-visible:outline-2"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="font-mono text-xs pt-0.5"
                            style={{ color: isOpen ? 'var(--glow-1)' : 'rgba(255, 255, 255, 0.4)' }}
                          >
                            {numStr}
                          </span>
                          <span
                            className="font-mono text-sm leading-snug font-medium transition-colors"
                            style={{ color: isOpen ? 'var(--white)' : 'rgba(255, 255, 255, 0.85)' }}
                          >
                            {item.question}
                          </span>
                        </div>

                        <span
                          className="font-mono text-base shrink-0 pt-0.5 select-none transition-transform duration-200"
                          style={{
                            color: isOpen ? 'var(--glow-1)' : 'rgba(255, 255, 255, 0.4)',
                            transform: isOpen ? 'rotate(45deg)' : 'none',
                          }}
                        >
                          +
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <m.div
                            key="content"
                            initial={calmMode ? { opacity: 1 } : { height: 0, opacity: 0 }}
                            animate={calmMode ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                            exit={calmMode ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-1 pl-10 border-t border-white/[0.08]">
                              <div
                                className="pl-3 border-l-2 py-1"
                                style={{ borderColor: 'var(--glow-1)' }}
                              >
                                <p className="text-sm font-body leading-relaxed text-white/80">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.div>
                  );
                })}
              </div>

              {/* Footer hint */}
              <div
                className="px-6 py-3 border-t bg-black/30 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/40 shrink-0"
                style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <span>KNOW-TA! OUTLINE DEFENSE PROPOSAL</span>
                <span>PRESS ESC TO CLOSE</span>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
