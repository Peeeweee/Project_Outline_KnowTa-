import { useState } from 'react';
import { m } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Frame , LineReveal } from '../components/UI';

export function S11Theory({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode } = useDeckStore();
  const [isHard, setIsHard] = useState(false);
  const [dots, setDots] = useState<number[]>([]);
  const [alpha, setAlpha] = useState(0.5);
  
  const handleRunPasses = () => {
    const spread = isHard ? 0.35 : 0.08;
    const base = isHard ? 0.6 : 0.9;
    const newDots = Array.from({ length: 20 }, () => {
      let val = base + (Math.random() * 2 - 1) * spread;
      return Math.max(0, Math.min(1, val));
    });
    setDots(newDots);
  };

  const handleWeightClick = (type: string) => {
    if (type === 'vocal') setAlpha(0.2);
    else if (type === 'audio') setAlpha(0.8);
    else setAlpha(0.5);
  };

  return (
    <SectionShell theme="dark" aria-label="Theoretical framework section">
      <Container className="text-center">
        <LineReveal delay={0}>
<h2 className="headline mb-14">{data.headline}</h2>
</LineReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          
          {/* Panel 1: Doubt */}
          <Frame className="flex flex-col items-center p-8 h-[360px]">
            <h3 className="card-title mb-6 uppercase">Doubt</h3>
            
            <div className="flex gap-2 mb-6">
              <button 
                onClick={() => { setIsHard(false); setDots([]); }}
                className={`text-xs px-3 py-1 border rounded-full transition-colors ${!isHard ? 'border-white bg-white text-black' : 'border-white/20 text-white/60'}`}
              >
                EASY
              </button>
              <button 
                onClick={() => { setIsHard(true); setDots([]); }}
                className={`text-xs px-3 py-1 border rounded-full transition-colors ${isHard ? 'border-white bg-white text-black' : 'border-white/20 text-white/60'}`}
              >
                HARD
              </button>
            </div>

            <button 
              onClick={handleRunPasses}
              className="px-4 py-2 text-[10px] border border-white/40 rounded-full hover:bg-white/10 mb-8"
            >
              RUN 20 PASSES
            </button>

            <div className="w-full relative h-4 mt-auto mb-6 flex items-center justify-center">
              <div className="absolute w-full border-t border-dotted border-white/30" />
              {dots.map((d, i) => (
                <m.div 
                  key={i}
                  initial={calmMode ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: calmMode ? 0 : i * 0.02 }}
                  className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full mix-blend-screen \${!isHard ? 'bg-white' : 'border border-white bg-transparent'}`}
                  style={{ left: `${d * 100}%` }}
                />
              ))}
            </div>

            <p className="card-text text-gray-400">Spread is doubt.</p>
            <div className="absolute bottom-4 left-4 text-[9px] font-mono border border-white/20 px-2 py-0.5 rounded-full text-white/40">ILLUSTRATION</div>
          </Frame>

          {/* Panel 2: Weights */}
          <Frame className="flex flex-col items-center p-8 h-[360px]">
            <h3 className="card-title mb-6 uppercase">Weights</h3>
            
            <div className="flex gap-2 mb-8">
              <button onClick={() => handleWeightClick('audio')} className="text-[10px] px-2 py-1 border border-white/20 rounded hover:bg-white/10">AUDIO</button>
              <button onClick={() => handleWeightClick('mix')} className="text-[10px] px-2 py-1 border border-white/20 rounded hover:bg-white/10">MIX</button>
              <button onClick={() => handleWeightClick('vocal')} className="text-[10px] px-2 py-1 border border-white/20 rounded hover:bg-white/10">VOCAL</button>
            </div>

            <div className="w-full flex flex-col gap-6 mt-auto mb-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] w-12 text-right">AUDIO</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <m.div className="h-full bg-white" animate={{ width: `${alpha * 100}%` }} transition={calmMode ? { duration: 0 } : { type: 'spring' }} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] w-12 text-right">VOCAL</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <m.div className="h-full bg-white" animate={{ width: `${(1 - alpha) * 100}%` }} transition={calmMode ? { duration: 0 } : { type: 'spring' }} />
                </div>
              </div>
            </div>

            <p className="card-text text-gray-400">The model picks who to trust.</p>
            <div className="absolute bottom-4 left-4 text-[9px] font-mono border border-white/20 px-2 py-0.5 rounded-full text-white/40">ILLUSTRATION</div>
          </Frame>

          {/* Panel 3: Two Views */}
          <Frame className="flex flex-col items-center p-8 h-[360px] relative">
            <h3 className="card-title mb-6 uppercase">Two Views</h3>
            
            <div className="relative w-full flex-1 flex justify-center items-center mt-auto mb-8">
              <div className="absolute w-24 h-24 rounded-full border border-white bg-white/5 -translate-x-6 flex items-center justify-center mix-blend-screen" />
              <div className="absolute w-24 h-24 rounded-full border border-white bg-white/5 translate-x-6 flex items-center justify-center mix-blend-screen" />
              <div className="relative z-10 w-8 h-8 bg-black border border-white flex items-center justify-center rotate-45" />
            </div>

            <p className="card-text text-gray-400">Two lenses, one verdict.</p>
            <div className="absolute bottom-4 left-4 text-[9px] font-mono border border-white/20 px-2 py-0.5 rounded-full text-white/40">ILLUSTRATION</div>
          </Frame>

        </div>
      </Container>
    </SectionShell>
  );
}
