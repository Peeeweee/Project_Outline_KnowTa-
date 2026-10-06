import { useState } from 'react';
import { m } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Frame, Chip , LineReveal } from '../components/UI';

export function S05Break({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode, setActiveDetail } = useDeckStore();
  const [pitch, setPitch] = useState(50);

  const handleCardClick = (card: any) => {
    setActiveDetail({
      title: card.title,
      body: card.detail,
      source: card.refs,
    });
  };

  return (
    <SectionShell theme="light" aria-label="Detector weaknesses section">
      <svg width="0" height="0" className="absolute">
        <defs>
          <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="black" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>
      <Container className="text-center w-full">
        <LineReveal delay={0}>
<h2 className="headline mb-14">{data.headline}</h2>
</LineReveal>
        
        {/* one centered row at 1280px+ (xl), two rows of 3 and 2 below that (lg), etc. */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-none mx-auto">
          {data.failureCards?.map((card, i) => (
            <m.div
              key={card.title}
              initial={calmMode ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={calmMode ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: calmMode ? 0 : i * 0.1, type: 'spring' }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-20px)] flex"
            >
              <Frame className="w-full flex flex-col items-center text-center p-6 bg-paper">
                <div className="label mb-4">{String(i + 1).padStart(2, '0')}</div>
                
                {/* Illustration area */}
                <div className="h-24 w-full flex flex-col items-center justify-center mb-4 relative">
                  {i === 0 ? (
                    <div className="flex flex-col items-center w-full gap-2">
                      <div className="relative w-12 h-12 rounded-full border border-black/20 flex items-center justify-center">
                        {/* Ring gauge */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="4" />
                          <circle cx="24" cy="24" r="20" fill="none" stroke="black" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset={125.6 - (pitch / 100) * 125.6} />
                        </svg>
                        <span className="text-[10px] font-mono">{pitch}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={pitch} 
                        onChange={(e) => setPitch(Number(e.target.value))}
                        className="w-24 h-1 bg-black/20 appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full cursor-pointer" 
                      />
                      <div className="absolute -top-2 -right-2 text-[8px] uppercase font-mono bg-black text-white px-2 py-0.5 rounded-full">ILLUSTRATION</div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full border border-black bg-black" />
                      <div className="w-8 h-8 rounded-full border border-black" style={{ fill: 'url(#hatch)', background: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2\' stroke=\'black\' stroke-width=\'1\'/%3E%3C/svg%3E")' }} />
                    </div>
                  )}
                </div>

                <h3 className="card-title mb-2 text-[16px] leading-tight">{card.title}</h3>
                <LineReveal delay={0.12}>
<p className="sub text-gray-500 text-[14px] leading-snug flex-1 mb-6">
                  {card.short}
                </p>
</LineReveal>
                <button onClick={(e) => { e.stopPropagation(); handleCardClick(card); }} className="cursor-pointer hover:opacity-80 transition-opacity mt-auto">
                  <Chip className="opacity-50">Sources {card.refs}</Chip>
                </button>
              </Frame>
            </m.div>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
