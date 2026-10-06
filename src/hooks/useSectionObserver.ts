// src/hooks/useSectionObserver.ts
// Uses IntersectionObserver on [data-scene] wrappers to update currentSection in the store.
import { useEffect } from 'react';
import { useDeckStore } from '../store/deckStore';

export function useSectionObserver() {
  const { setSection, getActiveSections, shortMode } = useDeckStore();

  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>('[data-scene]');
    if (!wrappers.length) return;

    let observer: IntersectionObserver | undefined;
    const observe = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        () => {
          // Select the section at the reading line, including backward jumps.
          const active = getActiveSections();
          const readingLine = window.innerHeight * 0.15;
          const wrapper = Array.from(wrappers).find((element) => {
            const rect = element.getBoundingClientRect();
            return rect.top <= readingLine && rect.bottom > readingLine;
          });
          const idx = active.findIndex(s => s.slug === wrapper?.dataset.scene);
          if (idx >= 0) {
            setSection(idx);
          }
        },
        {
          // IntersectionObserver percentages are relative to width, not height.
          rootMargin: `-${window.innerHeight * 0.1}px 0px -${window.innerHeight * 0.8}px 0px`,
          threshold: 0,
        }
      );

      wrappers.forEach(w => observer?.observe(w));
    };
    observe();
    window.addEventListener('resize', observe);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', observe);
    };
  }, [setSection, getActiveSections, shortMode]);
}
