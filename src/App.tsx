// src/App.tsx
// Root application: curtain-stacking layout, new nav, progress dots.
// Scene components are rendered inside sticky wrappers.

import { useState, useEffect, useRef } from 'react';
import { MotionConfig, m, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useDeckStore, type SectionDef } from './store/deckStore';

// Scene components
import { S01Open } from './scenes/S01Open';
import { S02Numbers } from './scenes/S02Numbers';
import { S04Home } from './scenes/S04Home';
import { S05Break } from './scenes/S05Break';
import { S06Hero } from './scenes/S06Hero';
import { S07Questions } from './scenes/S07Questions';
import { S08Scope } from './scenes/S08Scope';
import { S09Literature } from './scenes/S09Literature';
import { S10Data } from './scenes/S10Data';
import { S11Theory } from './scenes/S11Theory';
import { S12Framework } from './scenes/S12Framework';
import { S13Receipt } from './scenes/S13Receipt';

// Shell components
import { Nav } from './components/Nav';
import { ProgressDots } from './components/ProgressDots';
import { QnADrawer } from './components/QnADrawer';
import { PresenterPanel } from './components/PresenterPanel';
import { ReferenceDrawer } from './components/ReferenceDrawer';
import { DetailDrawer } from './components/DetailDrawer';
import { FooterSection } from './components/FooterSection';
import { LayoutCheck } from './components/LayoutCheck';
import { PillButton, LineReveal } from './components/UI';

// Hooks
import { useKeyboard } from './hooks/useKeyboard';
import { useLenis } from './hooks/useLenis';
import { useSectionObserver } from './hooks/useSectionObserver';

function Preloader({ onComplete }: { onComplete: () => void }) {
  return (
    <m.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      onClick={onComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white cursor-pointer"
    >
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-[40px] font-headline uppercase tracking-widest text-white/50 mb-2"
      >
        know-ta!
      </m.div>
      <m.div
        initial={{ width: 0 }}
        animate={{ width: '120px' }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        onAnimationComplete={() => setTimeout(onComplete, 200)}
        className="h-[1px] bg-white/20"
      />
    </m.div>
  );
}

function DeckSection({ 
  section, 
  index, 
  isActive 
}: { 
  section: SectionDef; 
  index: number; 
  isActive: boolean 
}) {
  const { getScenesForSection, calmMode, setActiveDetail } = useDeckStore();
  const scenes = getScenesForSection(section.slug);
  const isDark = section.theme === 'dark';
  
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  // Parallax: when section is covered (scrollYProgress goes 0 to 1), move it down slightly
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div
      ref={ref}
      data-scene={section.slug}
      className="relative print-scene"
    >
      <div
        className={`sticky top-0 overflow-y-auto overflow-x-hidden max-h-[100dvh] scrollbar-none \${index > 0 ? 'border-t border-white/10 shadow-[0_-1px_20px_rgba(0,0,0,0.2)]' : ''}`}
        style={{
          zIndex: index + 1,
          borderTopLeftRadius: index > 0 ? 24 : 0,
          borderTopRightRadius: index > 0 ? 24 : 0,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <m.div style={{ y: calmMode ? 0 : y }} className="w-full min-h-screen">
          {scenes.length > 0 ? (
            scenes.map((sceneData) => {
              const Comp = getSceneComponent(sceneData.id);
              if (!Comp) return null;
              return (
                <div key={sceneData.id} className="relative w-full">
                  <Comp
                    data={sceneData}
                    isActive={isActive}
                    theme={isDark ? 'dark' : 'light'}
                  />
                  {sceneData.detail && (
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50">
                      <PillButton 
                        onClick={() => setActiveDetail({ title: sceneData.section || 'Detail', body: sceneData.detail })}
                        className={isDark ? 'border-white/20 text-white/70 bg-black/40 backdrop-blur-md' : 'border-black/20 text-black/70 bg-white/40 backdrop-blur-md'}
                      >
                        More
                      </PillButton>
                    </div>
                  )}
                </div>
              );
            })
          ) : section.slug === 'footer' ? (
            <FooterSection />
          ) : (
            <SectionPlaceholder section={section} />
          )}
        </m.div>
      </div>
    </div>
  );
}



const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 22 } as const;

// Map scene ID to component
export function getSceneComponent(sceneId: string): any {
  switch (sceneId) {
    case 'S01': return S01Open;
    case 'S02': return S02Numbers;
    case 'S04': return S04Home;
    case 'S05': return S05Break;
    case 'S06': return S06Hero;
    case 'S07': return S07Questions;
    case 'S08': return S08Scope;
    case 'S09': return S09Literature;
    case 'S10': return S10Data;
    case 'S11': return S11Theory;
    case 'S12': return S12Framework;
    case 'S13': return S13Receipt;
    default: return null;
  }
}

// Placeholder for sections with no scene component or the footer
function SectionPlaceholder({ section }: { section: SectionDef }) {
  const isDark = section.theme === 'dark';
  return (
    <div
      className={`relative w-full flex flex-col justify-center items-center px-8 py-24 ${isDark ? 'glow-dark grain' : 'paper-light'}`}
      style={{ minHeight: '100vh' }}
    >
      <div className="relative z-10 w-full max-w-[1280px] flex flex-col gap-6">
        <div
          className="label"
          style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(10,10,11,0.5)' }}
        >
          {section.label}
        </div>
        <LineReveal delay={0}>
<h2
          className="headline"
          style={{ color: isDark ? 'var(--white)' : 'var(--ink)' }}
        >
          {section.headline}
        </h2>
</LineReveal>
      </div>
      <div
        className="absolute bottom-6 left-8 z-10 font-mono text-xs uppercase tracking-widest"
        style={{ color: isDark ? 'var(--white)' : 'var(--ink)', opacity: 0.5 }}
      >
        SO WHAT: {section.takeaway}
      </div>
    </div>
  );
}

function DeckApp() {
  const { calmMode, currentSection, getActiveSections } = useDeckStore();
  const activeSections = getActiveSections();
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('knowta-preloaded')) {
      setPreloaderDone(true);
    } else {
      sessionStorage.setItem('knowta-preloaded', 'true');
    }
  }, []);

  useKeyboard();
  useLenis();
  useSectionObserver();

  const reduceMotion =
    calmMode ||
    (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const [isLayoutCheck, setIsLayoutCheck] = useState(() => typeof window !== 'undefined' && window.location.hash === '#/layout');
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => setIsLayoutCheck(window.location.hash === '#/layout');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (isLayoutCheck) {
    return <LayoutCheck />;
  }

  return (
    <MotionConfig
      reducedMotion={reduceMotion ? 'always' : 'never'}
      transition={SPRING_SMOOTH}
    >
      {/* Nav */}
      <Nav />

      {/* Main deck with curtain stacking */}
      <main className="print-main" aria-label="Presentation deck">
        <AnimatePresence>
          {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
        </AnimatePresence>
        {activeSections.map((section, i) => (
          <DeckSection 
            key={section.slug}
            section={section}
            index={i}
            isActive={i === currentSection}
          />
        ))}
      </main>

      {/* Presenter Panel */}
      <PresenterPanel />

      {/* Progress dots */}
      <ProgressDots />

      {/* Q&A drawer */}
      <QnADrawer />

      {/* Reference drawer */}
      <ReferenceDrawer />
      
      {/* Detail drawer */}
      <DetailDrawer />
    </MotionConfig>
  );
}

export default DeckApp;
