import { m, LazyMotion, domAnimation } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import { CHAPTER_LABELS, type Chapter } from '../data/scenes';

const SPRING_SNAPPY = { type: 'spring', stiffness: 300, damping: 30 } as const;
const CHAPTERS: Chapter[] = ['ch1', 'ch2', 'method'];

export function ChapterBar() {
  const { currentScene, setScene, getActiveScenes, shortMode, toggleShortMode } = useDeckStore();
  const activeScenes = getActiveScenes();
  const activeChapter = activeScenes[currentScene]?.chapter;

  // Map chapters to their first scene index dynamically based on active scenes
  const chapterStarts: Record<Chapter, number> = {
    ch1: activeScenes.findIndex((s: any) => s.chapter === 'ch1'),
    ch2: activeScenes.findIndex((s: any) => s.chapter === 'ch2'),
    method: activeScenes.findIndex((s: any) => s.chapter === 'method'),
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 border-b"
        style={{ 
          backgroundColor: 'var(--color-bg)',
          borderColor: 'var(--color-hairline)' 
        }}
        aria-label="Chapter navigation"
      >
        <span className="section-tag" style={{ color: 'var(--color-muted)' }}>Know-Ta!</span>

        <nav className="flex gap-6 absolute left-1/2 -translate-x-1/2" aria-label="Chapters">
          {CHAPTERS.map((ch) => {
            const isActive = activeChapter === ch;
            const startIdx = chapterStarts[ch];
            return (
              <button
                key={ch}
                onClick={() => setScene(startIdx >= 0 ? startIdx : 0)}
                aria-label={`Jump to ${CHAPTER_LABELS[ch]}`}
                aria-current={isActive ? 'page' : undefined}
                className="section-tag relative px-1 py-0.5 cursor-pointer transition-colors focus-visible:outline-2"
                style={{ color: isActive ? 'var(--color-ink)' : 'var(--color-muted)' }}
              >
                {CHAPTER_LABELS[ch]}
                {isActive && (
                  <m.span
                    layoutId="chapter-underline"
                    className="absolute left-0 right-0 bottom-0 h-px"
                    style={{ backgroundColor: 'var(--color-human)' }}
                    transition={SPRING_SNAPPY}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Short mode switch */}
        <button
          onClick={toggleShortMode}
          className="section-tag px-2 py-1 border rounded cursor-pointer transition-colors hover:text-ink focus-visible:outline-2"
          style={{ 
            borderColor: 'var(--color-hairline)',
            color: shortMode ? 'var(--color-human)' : 'var(--color-muted)' 
          }}
        >
          {shortMode ? 'Short (8)' : 'Full (13)'}
        </button>
      </header>
    </LazyMotion>
  );
}
