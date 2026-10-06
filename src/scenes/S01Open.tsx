import { Suspense, lazy } from 'react';
import { LazyMotion, domMax } from 'motion/react';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Label, PillButton , LineReveal } from '../components/UI';
import { FallbackIdeaDiscSvg } from '../components/FallbackIdeaDiscSvg';

const S06HeroModel = lazy(() => import('./S06HeroModel'));

export function S01Open({ data }: { data: SceneData; isActive: boolean }) {
  return (
    <LazyMotion features={domMax}>
      <SectionShell theme="dark" aria-label="Hero presentation section">
        <Container className="text-center flex flex-col items-center justify-center min-h-[50vh]">
          <Label className="mb-4">{data.hero?.label || 'THESIS PRESENTATION | CHAPTERS 1 AND 2'}</Label>
          
          <h1 className="headline mb-4 max-w-5xl mx-auto">
            {data.hero?.headlineLine1 || 'Can you tell which'}
            <br />
            {data.hero?.headlineLine2 || 'song is human?'}
          </h1>
          
          <LineReveal delay={0.12}>
<p className="sub mx-auto mb-10">
            {data.short || 'Know-Ta! detects AI-generated music and shows how sure it is.'}
          </p>
</LineReveal>

          <div className="relative w-full h-[46vh] min-h-[300px] pointer-events-auto">
            <Suspense fallback={<FallbackIdeaDiscSvg isSplit={false} activeHotspot={null} onHotspotClick={() => {}} />}>
              <S06HeroModel isInView={true} isHero={true} />
            </Suspense>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <PillButton className="opacity-50">Drag</PillButton>
            </div>
          </div>
          
          <div className="label mt-8">
            {data.hero?.bottomRow?.[0] || 'Delgado | Delgado | Labay | USeP CIC'}
          </div>
        </Container>
      </SectionShell>
    </LazyMotion>
  );
}
