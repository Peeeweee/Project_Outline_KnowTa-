import { Suspense, lazy, useState, useRef } from 'react';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, PillButton , LineReveal } from '../components/UI';
import { FallbackIdeaDiscSvg } from '../components/FallbackIdeaDiscSvg';
import { useInView } from 'motion/react';

const S06HeroModel = lazy(() => import('./S06HeroModel'));

export function S06Hero({ data, isActive }: { data: SceneData; isActive: boolean }) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  const activeStep = data.steps?.[activeStepIdx];
  const stepLabel = activeStep?.label || 'Split';
  const isSplit = stepLabel === 'Split' || stepLabel === 'Judge';

  return (
    <SectionShell theme="dark" aria-label="Methodology visual section">
      <Container className="text-center flex flex-col items-center">
        <LineReveal delay={0}>
<h2 className="headline mb-6">{data.headline}</h2>
</LineReveal>
        <LineReveal delay={0.12}>
<p className="sub mb-8 text-gray-400 max-w-2xl">{data.short}</p>
</LineReveal>

        <div ref={containerRef} className="relative w-full h-[50vh] min-h-[400px] pointer-events-auto mb-8">
          <Suspense fallback={<FallbackIdeaDiscSvg isSplit={false} activeHotspot={null} onHotspotClick={() => {}} />}>
            <S06HeroModel 
              isSplit={isSplit} 
              activeStep={stepLabel} 
              isInView={isInView || isActive} 
            />
          </Suspense>
        </div>

        {/* Pills and caption */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            {data.steps?.map((step: any, i: number) => (
              <PillButton 
                key={step.label}
                onClick={() => setActiveStepIdx(i)}
                className={activeStepIdx === i ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}
              >
                {step.label}
              </PillButton>
            ))}
          </div>
          <p className="text-gray-400 font-mono text-[13px] uppercase tracking-widest min-h-[1.5rem]">
            {activeStep?.short}
          </p>
        </div>
      </Container>
    </SectionShell>
  );
}
