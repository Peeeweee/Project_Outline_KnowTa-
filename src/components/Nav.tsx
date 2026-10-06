import { useEffect, useRef, useState } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import { getLenis } from '../hooks/useLenis';
import { Container, PillButton } from './UI';

const NAV_LINKS = [
  { label: 'PROBLEM', slug: 'numbers' },
  { label: 'IDEA', slug: 'idea' },
  { label: 'DATA', slug: 'data' },
  { label: 'DEMO', slug: 'verdict' },
];

function scrollToSlug(slug: string) {
  const el = document.querySelector(`[data-scene="${slug}"]`) as HTMLElement | null;
  const lenis = getLenis();
  if (el && lenis) {
    lenis.scrollTo(el, { immediate: false });
  }
}

export function Nav() {
  const {
    currentSection, getActiveSections,
    toggleQA, settingsOpen, toggleSettings, closeSettings,
    bodyMode, toggleBodyMode, calmMode, toggleCalmMode,
  } = useDeckStore();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSections = getActiveSections();
  const currentDef = activeSections[currentSection];
  const isDark = currentDef?.theme === 'dark';
  const textColor = isDark ? 'var(--white)' : 'var(--black)';
  const mutedColor = isDark ? 'var(--gray-400)' : 'var(--gray-500)';
  const borderColor = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(10,10,11,0.14)';
  
  const bgStyle = scrolled 
    ? (isDark ? 'rgba(10,10,11,0.55)' : 'rgba(243,243,241,0.7)') 
    : 'transparent';

  const gearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    const handler = (e: MouseEvent) => {
      if (gearRef.current && !gearRef.current.contains(e.target as Node)) {
        closeSettings();
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [settingsOpen, closeSettings]);

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 no-print backdrop-blur-md"
        style={{ 
          height: 72, 
          color: textColor,
          backgroundColor: bgStyle,
          borderBottom: scrolled ? `1px solid ${borderColor}` : '1px solid transparent'
        }}
        aria-label="Main navigation"
      >
        <Container className="h-full flex items-center justify-between">
          {/* Left: nav links */}
          <nav className="flex gap-6 items-center flex-1" aria-label="Sections">
            {NAV_LINKS.map(link => {
              const isActive = currentDef?.slug === link.slug;
              return (
                <button
                  key={link.slug}
                  onClick={() => {
                    const active = getActiveSections();
                    const idx = active.findIndex(s => s.slug === link.slug);
                    if (idx >= 0) {
                      useDeckStore.getState().setSection(idx);
                    }
                    scrollToSlug(link.slug);
                  }}
                  className="font-mono text-[12px] uppercase tracking-widest cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline-2"
                  style={{ opacity: isActive ? 1 : 0.5, color: textColor }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Center: wordmark */}
          <div className="flex-1 flex justify-center">
            <span
              className="font-headline text-base tracking-tight cursor-default select-none"
              style={{ fontWeight: 600, textTransform: 'lowercase', color: textColor }}
            >
              know-ta!
            </span>
          </div>

          {/* Right: Q&A + gear */}
          <div className="flex-1 flex items-center justify-end gap-5">
            <PillButton
              onClick={toggleQA}
              style={{ color: textColor }}
              aria-label="Open Q and A drawer"
            >
              Q&A &#8599;
            </PillButton>

            {/* Gear popover */}
            <div ref={gearRef} className="relative">
              <button
                onClick={toggleSettings}
                className="w-8 h-8 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline-2"
                style={{ opacity: 0.5, color: textColor }}
                aria-label="Settings"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>

              <AnimatePresence>
                {settingsOpen && (
                  <m.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute right-0 top-12 w-56 p-4 flex flex-col gap-4 z-50 rounded-[24px]"
                    style={{
                      backgroundColor: isDark ? 'var(--ink-800)' : 'var(--white)',
                      border: `1px solid ${borderColor}`,
                      color: isDark ? 'var(--white)' : 'var(--black)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: mutedColor }}>View</span>
                      <PillButton
                        onClick={toggleBodyMode}
                        style={{ borderColor }}
                      >
                        {bodyMode === 'plain' ? 'Plain' : 'Technical'}
                      </PillButton>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: mutedColor }}>Calm</span>
                      <PillButton
                        onClick={toggleCalmMode}
                        style={{ borderColor, opacity: calmMode ? 1 : 0.5 }}
                      >
                        {calmMode ? 'On' : 'Off'}
                      </PillButton>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </header>
    </LazyMotion>
  );
}
