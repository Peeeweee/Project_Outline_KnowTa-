// src/components/SourceChip.tsx
// Inline citation chip like [8]. Clicking opens the reference drawer.
// Uses a shared layoutId for the expand transition with ReferenceDrawer.
import { m, LazyMotion, domAnimation } from 'motion/react';
import { useRefDrawerStore } from '../store/refDrawerStore';

interface SourceChipProps {
  refKey: number;
}

export function SourceChip({ refKey }: SourceChipProps) {
  const { open, openKey } = useRefDrawerStore();
  const isOpen = openKey === refKey;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.button
        layoutId={`ref-chip-${refKey}`}
        onClick={() => open(refKey)}
        aria-label={`Open reference ${refKey}`}
        aria-expanded={isOpen}
        className="section-tag inline-flex items-center cursor-pointer select-none"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--color-human)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-human)',
          borderRadius: '4px',
          padding: '1px 5px',
          verticalAlign: 'middle',
          marginLeft: '2px',
          lineHeight: 1.4,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        [{refKey}]
      </m.button>
    </LazyMotion>
  );
}
