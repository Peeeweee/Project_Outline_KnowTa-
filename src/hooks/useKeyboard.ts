// src/hooks/useKeyboard.ts
// Global keyboard navigation.
import { useEffect } from 'react';
import { useDeckStore } from '../store/deckStore';

export function useKeyboard() {
  const {
    nextSection, prevSection,
    toggleQA, closeQA, qaOpen,
    togglePresenterMode, toggleCalmMode,
    closeSettings, settingsOpen,
  } = useDeckStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          nextSection();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          prevSection();
          break;
        case 'q':
        case 'Q':
          e.preventDefault();
          toggleQA();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          togglePresenterMode();
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          toggleCalmMode();
          break;
        case 'Escape':
          if (qaOpen) { e.preventDefault(); closeQA(); }
          else if (settingsOpen) { e.preventDefault(); closeSettings(); }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [nextSection, prevSection, toggleQA, closeQA, qaOpen, togglePresenterMode, toggleCalmMode, closeSettings, settingsOpen]);
}
