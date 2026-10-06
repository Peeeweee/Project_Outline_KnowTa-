// src/hooks/useLenis.ts
// Initializes Lenis smooth scroll. Scrolls to sections on demand.
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;
export function getLenis() { return globalLenis; }

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

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

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      globalLenis = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Navigation controls request scrolling directly. The section observer only
  // updates progress; scrolling in response to it would interrupt navigation.

  return lenisRef;
}
