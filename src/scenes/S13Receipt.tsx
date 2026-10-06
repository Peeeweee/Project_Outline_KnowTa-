import { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData, ReceiptPreset } from '../data/scenes';
import {  SectionShell, Container , LineReveal } from '../components/UI';

export function S13Receipt({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode } = useDeckStore();
  const [activePreset, setActivePreset] = useState<ReceiptPreset | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const presets = data.receiptPresets || [];

  const handleDrop = (preset: ReceiptPreset) => {
    setActivePreset(preset);
    
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };

  return (
    <SectionShell theme="dark" aria-label="Output verdict section">
      <Container className="flex flex-col items-center justify-center max-w-4xl text-center">
        
        <LineReveal delay={0}>
<h2 className="headline mb-6">
          The <span className="script-word">verdict</span>, printed.
        </h2>
</LineReveal>
        <LineReveal delay={0.12}>
<p className="sub mb-10 text-gray-400">
          {data.short}
        </p>
</LineReveal>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => handleDrop(p)}
              className="chip-ui cursor-pointer hover:bg-white/10 active:scale-95 transition-all text-white border-white/20"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Printer */}
        <div className="w-full flex justify-center pb-24">
          <m.div 
            animate={isShaking ? { x: [-2, 2, -2, 2, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[340px] flex flex-col items-center"
          >
            {/* Printer Slot */}
            <div className="w-full h-2 bg-black border border-white/20 relative flex items-center justify-center rounded-full z-30">
              <div className="w-[95%] h-[1px] bg-white/20" />
            </div>

            {/* Receipt Paper */}
            <div className="relative w-full overflow-hidden flex justify-center mt-[-1px] min-h-[400px]">
              <AnimatePresence mode="wait">
                {activePreset && (
                  <m.div
                    key={`receipt-\${activePreset.id}`}
                    initial={calmMode ? { y: 0 } : { y: '-100%' }}
                    animate={{ y: 0 }}
                    transition={calmMode ? { duration: 0 } : { type: 'tween', ease: 'linear', duration: 1.5 }}
                    className="w-[92%] bg-paper text-black p-6 shadow-2xl relative font-mono text-[11px] leading-relaxed flex flex-col"
                  >
                    <div className="text-center mb-6 font-bold uppercase tracking-widest border-b border-black/20 pb-4">
                      KNOW-TA! AUTHENTICITY REPORT
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-end border-b border-black/10 pb-2">
                        <span className="opacity-50 text-[9px]">SONG</span>
                        <span className="text-right">{activePreset.songTitle}</span>
                      </div>
                      
                      <div className="flex justify-between items-end border-b border-black/10 pb-2">
                        <span className="opacity-50 text-[9px]">AI PROBABILITY</span>
                        <span className="text-lg font-bold">{activePreset.aiProbability}%</span>
                      </div>
                      
                      <div className="flex justify-between items-end border-b border-black/10 pb-2">
                        <span className="opacity-50 text-[9px]">BAYESIAN SPREAD</span>
                        <span>±{activePreset.spreadPlusMinus}%</span>
                      </div>
                      
                      <div className="flex justify-between items-end border-b border-black/10 pb-2">
                        <span className="opacity-50 text-[9px]">AUDIO BRANCH</span>
                        <span>{activePreset.audioPct}%</span>
                      </div>
                      
                      <div className="flex justify-between items-end border-b border-black/10 pb-2">
                        <span className="opacity-50 text-[9px]">VOCAL BRANCH</span>
                        <span>{activePreset.vocalPct}%</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="opacity-50 text-[9px]">CONFLICT</span>
                        <span className={`px-2 py-1 font-bold \${activePreset.hasConflict ? 'border-2 border-dotted border-black' : ''}`}>
                          {activePreset.conflict}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-black/20 text-[9px] text-center opacity-60">
                      ESTIMATE ONLY. NOT PROOF OF AUTHORSHIP.
                    </div>
                    
                    <div className="mt-6 mx-auto border-2 border-black/30 text-black/30 rotate-[-5deg] px-3 py-1 font-bold tracking-widest text-[10px] uppercase inline-block">
                      DEMO OUTPUT, NOT A RESULT
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </div>

      </Container>
    </SectionShell>
  );
}
