// src/components/CalmModeToggle.tsx
// Small floating button to toggle calm mode (reducedMotion).
import { useDeckStore } from '../store/deckStore';

export function CalmModeToggle() {
  const { calmMode, toggleCalmMode } = useDeckStore();

  return (
    <button
      onClick={toggleCalmMode}
      aria-label={`${calmMode ? 'Disable' : 'Enable'} calm mode (reduced motion)`}
      aria-pressed={calmMode}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-colors"
      style={{
        background: calmMode ? 'var(--color-surface-2)' : 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: calmMode ? 'var(--color-human)' : 'var(--color-muted)',
      }}
    >
      <span aria-hidden="true">{calmMode ? '~' : ''}</span>
      Calm mode
    </button>
  );
}
