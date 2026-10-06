import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Frame, PillButton , LineReveal } from '../components/UI';

export function S09Literature({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode } = useDeckStore();
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activeCardIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCardIdx(null);
      if (e.key === 'ArrowRight') {
        setActiveCardIdx(prev => prev !== null && data.litNodes ? Math.min(prev + 1, data.litNodes.length - 1) : prev);
      }
      if (e.key === 'ArrowLeft') {
        setActiveCardIdx(prev => prev !== null ? Math.max(prev - 1, 0) : prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIdx, data.litNodes]);

  const activeCard = activeCardIdx !== null && data.litNodes ? data.litNodes[activeCardIdx] : null;

  return (
    <SectionShell theme="light" aria-label="Literature section">
      <Container className="text-center">
        <LineReveal delay={0}>
<h2 className="headline mb-14">{data.headline}</h2>
</LineReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto">
          {data.litNodes?.map((node, i) => (
            <m.div
              key={node.topic}
              initial={calmMode ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: calmMode ? 0 : i * 0.05 }}
              onClick={() => setActiveCardIdx(i)}
              className="cursor-pointer aspect-square"
            >
              <Frame className="w-full h-full flex flex-col items-center justify-center p-4 text-center hover:bg-black/5 transition-colors">
                <span className="font-mono text-gray-400 text-xs mb-2">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span className="card-title text-black text-[14px] leading-tight uppercase line-clamp-3">
                  {node.topic}
                </span>
              </Frame>
            </m.div>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {activeCard && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCardIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          >
            <m.div
              layoutId={`card-\${activeCard.topic}`}
              className="bg-paper p-8 md:p-12 w-full max-w-2xl text-left border border-black/10 shadow-2xl rounded-[32px] cursor-default flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-3xl uppercase tracking-tight">{activeCard.topic}</h3>
                <PillButton onClick={() => setActiveCardIdx(null)} className="opacity-50 hover:opacity-100 border-black/20 text-black">
                  ESC
                </PillButton>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="label mb-2 text-black/40">WHAT IT SAYS</div>
                  <p className="text-gray-600 leading-relaxed">{activeCard.detail1}</p>
                </div>
                <div>
                  <div className="label mb-2 text-black/40">WHAT IT MEANS</div>
                  <p className="text-black leading-relaxed font-medium">{activeCard.detail2}</p>
                </div>
              </div>

              {activeCard.sources && (
                <div className="pt-6 border-t border-black/10 flex gap-2 flex-wrap">
                  {activeCard.sources.map(src => (
                    <span key={src} className="text-xs font-mono text-gray-500 opacity-60">
                      [{src}]
                    </span>
                  ))}
                </div>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
