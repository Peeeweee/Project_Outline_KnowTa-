// src/hooks/useSectionObserver.ts
// Uses IntersectionObserver on [data-scene] wrappers to update currentSection in the store.
import { useEffect } from 'react';
import { useDeckStore } from '../store/deckStore';

export function useSectionObserver() {
  const { setSection, getActiveSections, shortMode } = useDeckStore();

  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>('[data-scene]');
    if (!wrappers.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that most recently crossed into the viewport top
        const active = getActiveSections();
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute('data-scene');
            const idx = active.findIndex(s => s.slug === slug);
            if (idx >= 0) {
              setSection(idx);
            }
          }
        }
      },
      {
        // Trigger when the top of the wrapper crosses the top 20% of the viewport
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0,
      }
    );

    wrappers.forEach(w => observer.observe(w));

    return () => observer.disconnect();
  }, [setSection, getActiveSections, shortMode]);
}
