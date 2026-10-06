import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Frame , LineReveal } from '../components/UI';

export function S12Framework({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode } = useDeckStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="w-full">
      <SectionShell theme="light" aria-label="Conceptual framework section">
      <Container className="text-center">
        <LineReveal delay={0}>
<h2 className="headline mb-14">{data.headline}</h2>
</LineReveal>
        
        <div className="relative w-full max-w-5xl mx-auto mb-16 h-8">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[1px] bg-black/10" />
          <m.div 
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[1px] bg-black"
            style={{ width: calmMode ? '100%' : lineWidth }}
          />
          <m.div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border border-black rounded-full shadow-sm z-10"
            style={{ left: calmMode ? '100%' : lineWidth }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          {data.stages?.map((stage, i) => (
            <m.div
              key={stage.label}
              initial={calmMode ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={calmMode ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: calmMode ? 0 : i * 0.15, type: 'spring' }}
            >
              <Frame className="h-full flex flex-col items-center justify-center text-center p-8">
                <h3 className="card-title text-black mb-4 uppercase tracking-widest">{stage.label}</h3>
                <p className="card-text text-gray-500">
                  {stage.items.join(', ')}
                </p>
              </Frame>
            </m.div>
          ))}
        </div>
      </Container>
      </SectionShell>
    </div>
  );
}
