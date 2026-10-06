// src/hooks/useLenis.ts
// Initializes Lenis smooth scroll. Scrolls to sections on demand.
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useDeckStore } from '../store/deckStore';

let globalLenis: Lenis | null = null;
export function getLenis() { return globalLenis; }

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const { currentSection, getActiveSections } = useDeckStore();

  // Create Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;
    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      globalLenis = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Scroll to the active section wrapper when currentSection changes
  useEffect(() => {
    const active = getActiveSections();
    const slug = active[currentSection]?.slug;
    if (!slug) return;
    const el = document.querySelector(`[data-scene="${slug}"]`) as HTMLElement | null;
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { immediate: false });
    }
  }, [currentSection, getActiveSections]);

  return lenisRef;
}
