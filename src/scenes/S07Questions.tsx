import { useState } from 'react';
import { m } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Frame , LineReveal } from '../components/UI';

const ICONS = [
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
];

function QuestionCard({ card, i, label, calmMode }: { card: any, i: number, label: string, calmMode: boolean }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e && e.type === 'keydown') {
      const ke = e as React.KeyboardEvent;
      if (ke.key !== 'Enter' && ke.key !== ' ') return;
      ke.preventDefault();
    }
    setFlipped(!flipped);
  };

  return (
    <m.div
      initial={calmMode ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={calmMode ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: calmMode ? 0 : i * 0.1, type: 'spring' }}
      className="relative cursor-pointer h-64 outline-none w-full xl:w-[calc(25%-24px)] md:w-[calc(50%-16px)] sm:w-full"
      onClick={toggle}
      onKeyDown={toggle}
      tabIndex={0}
      role="button"
      style={{ perspective: calmMode ? 'none' : '1000px' }}
    >
      <m.div
        className="w-full h-full relative"
        initial={false}
        animate={calmMode ? {} : { rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: calmMode ? 'flat' : 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0"
          style={{ 
            backfaceVisibility: calmMode ? 'visible' as const : 'hidden' as const,
            opacity: calmMode ? (flipped ? 0 : 1) : 1,
            zIndex: flipped ? 0 : 1,
            pointerEvents: flipped ? 'none' as const : 'auto' as const
          }}
        >
          <Frame className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-paper">
            <div className="label mb-6 text-gray-400">0{i + 1}</div>
            <div className="mb-4 opacity-50">{ICONS[i]}</div>
            <h3 className="card-title text-black">{label}</h3>
          </Frame>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0"
          style={{ 
            backfaceVisibility: calmMode ? 'visible' as const : 'hidden' as const,
            transform: calmMode ? 'none' : 'rotateY(180deg)',
            opacity: calmMode ? (flipped ? 1 : 0) : 1,
            zIndex: flipped ? 1 : 0,
            pointerEvents: flipped ? 'auto' as const : 'none' as const
          }}
        >
          <Frame className="w-full h-full flex flex-col justify-center p-6 bg-black text-white">
            <div className="text-[13px] mb-4 text-left leading-relaxed"><span className="text-gray-500 font-mono">Q //</span> {card.shortQuestion}</div>
            <div className="text-[13px] text-left leading-relaxed"><span className="text-gray-500 font-mono">TEST //</span> {card.shortHypothesis}</div>
          </Frame>
        </div>
      </m.div>
    </m.div>
  );
}

export function S07Questions({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode } = useDeckStore();
  const labels = ["Accuracy", "Design", "Trust", "Conflict"];

  return (
    <SectionShell theme="light" aria-label="Research questions section">
      <Container className="text-center">
        <LineReveal delay={0}>
<h2 className="headline mb-14">{data.headline}</h2>
</LineReveal>
        
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl mx-auto">
          {data.flipCards?.map((card, i) => (
            <QuestionCard key={i} card={card} i={i} label={labels[i]} calmMode={calmMode} />
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
