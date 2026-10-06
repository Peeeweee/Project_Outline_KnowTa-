import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, PillButton , LineReveal } from '../components/UI';

const GENERATORS = [
  { name: 'AceStep', unseen: true },
  { name: 'AudioLDM', unseen: true },
  { name: 'Brev', unseen: true },
  { name: 'DiffRhythm', unseen: true },
  { name: 'ElevenLabs', unseen: true },
  { name: 'Mubert', unseen: true },
  { name: 'MusicGen', unseen: true },
  { name: 'Riffusion', unseen: true },
  { name: 'SongGen', unseen: true },
  { name: 'Stable Audio', unseen: true },
  { name: 'Suno', unseen: false },
  { name: 'Udio', unseen: false },
];

export function S10Data({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode, setActiveDetail } = useDeckStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const clockRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const handRotation = useTransform(scrollYProgress, [0, 1], [-90, 270]);

  const handleDetailsClick = () => {
    setActiveDetail({
      title: 'Data details',
      body: `Pipeline: ${data.pipelineChips?.map(c => c.label).join(', ')}\n\nNote: ${data.pipelineNote}`,
    });
  };

  return (
    <div ref={sectionRef} className="w-full">
      <SectionShell theme="light" aria-label="Data section">
        <Container className="max-w-6xl w-full flex flex-col items-center">
          
          <div className="flex flex-col justify-center items-center text-center z-10 w-full mb-12">
            <LineReveal delay={0}>
<h2 className="headline mb-10">{data.headline}</h2>
</LineReveal>
            <PillButton onClick={handleDetailsClick} className="border-black/20 text-gray-600">
              Data details
            </PillButton>
          </div>

          <div className="relative w-full aspect-square max-w-[min(56vh,520px)] mx-auto flex items-center justify-center pointer-events-none mb-16">
            {/* Clock Face Background */}
            <div className="absolute inset-4 rounded-full border border-black/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>

            {/* Sweeping Hand */}
            {!calmMode && (
              <m.div 
                className="absolute w-1/2 h-[1px] bg-black/20 origin-left left-1/2"
                style={{ rotate: handRotation }}
              />
            )}

            {/* Generator Labels */}
            <m.div 
              className="absolute inset-0"
              style={{ rotate: calmMode ? 0 : clockRotation }}
            >
              {GENERATORS.map((gen, i) => {
                const angle = (i / GENERATORS.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 45; // percentage
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <m.div
                    key={gen.name}
                    className="absolute whitespace-nowrap flex items-center gap-2"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%, -50%) rotate(${calmMode ? 0 : -clockRotation.get()}deg)`,
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full border border-black ${gen.unseen ? 'bg-transparent' : 'bg-black'}`} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-black">
                      {gen.name}
                    </span>
                  </m.div>
                );
              })}
            </m.div>
            
            <div className="absolute -bottom-8 left-0 right-0 text-center font-mono text-[10px] text-gray-400">
              FILLED = SEEN IN TRAINING, HOLLOW = UNSEEN
            </div>
          </div>

          <div className="flex flex-col gap-3 font-mono text-[14px] text-gray-500 text-center w-full max-w-sm mx-auto pb-12">
            <div>AI SONGS: SONICS</div>
            <div>HUMAN SONGS: FMA</div>
            <div>LOCKED TEST: ECHOES</div>
          </div>

        </Container>
      </SectionShell>
    </div>
  );
}
