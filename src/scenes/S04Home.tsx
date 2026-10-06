import { m } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Frame, Chip , LineReveal } from '../components/UI';

const LINE_ICONS = [
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>,
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
];

export function S04Home({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode, setActiveDetail } = useDeckStore();

  const handleCardClick = (card: any) => {
    setActiveDetail({
      title: card.title,
      body: card.detail,
      source: `[${card.refs.join(', ')}]`,
    });
  };

  return (
    <SectionShell theme="dark" aria-label="Local context section">
      <Container className="text-center">
        <LineReveal delay={0}>
<h2 className="headline mb-14">{data.headline}</h2>
</LineReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto mb-8">
          {data.homeCards?.map((card, i) => (
            <m.div
              key={card.index}
              initial={calmMode ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={calmMode ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: calmMode ? 0 : i * 0.1, type: 'spring' }}
            >
              <Frame className="h-full flex flex-col items-center justify-between text-center p-8 bg-black/20">
                <div className="mb-6 opacity-80">{LINE_ICONS[i % LINE_ICONS.length]}</div>
                <h3 className="card-title mb-4">{card.title}</h3>
                <LineReveal delay={0.12}>
<p className="sub text-gray-400 mb-8 flex-1">
                  {card.short}
                </p>
</LineReveal>
                <button onClick={(e) => { e.stopPropagation(); handleCardClick(card); }} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <Chip className="opacity-50">Sources [{card.refs.join(', ')}]</Chip>
                </button>
              </Frame>
            </m.div>
          ))}
        </div>
        
        {data.note && (
          <div className="label mt-8 text-gray-500">
            {data.note}
          </div>
        )}
      </Container>
    </SectionShell>
  );
}
