import { useRef, useState, type ReactNode } from 'react';
import { m, LazyMotion, domMax } from 'motion/react';
import { useDeckStore } from '../store/deckStore';

export interface IndexCardProps {
  index: string;
  title: string;
  tag?: ReactNode;
  illustration: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  role?: string;
  ariaLabel?: string;
  flipped?: boolean;
  backContent?: ReactNode;
  layoutId?: string;
  compact?: boolean;
}

export function IndexCard({
  index,
  title,
  tag,
  illustration,
  children,
  className = '',
  style,
  onClick,
  onKeyDown,
  tabIndex = 0,
  role = 'article',
  ariaLabel,
  flipped = false,
  backContent,
  layoutId,
  compact = false,
}: IndexCardProps) {
  const { calmMode } = useDeckStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, isHover: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (calmMode || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 10, ry: x * 10, isHover: true });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, isHover: false });
  };

  const handleFocus = () => {
    if (!calmMode) setTilt((prev) => ({ ...prev, isHover: true }));
  };

  const handleBlur = () => {
    setTilt({ rx: 0, ry: 0, isHover: false });
  };

  const handleKeyDownInternal = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <LazyMotion features={domMax}>
      <m.div
        ref={cardRef}
        layoutId={calmMode ? undefined : layoutId}
        tabIndex={tabIndex}
        role={role}
        aria-label={ariaLabel || `${index} ${title}`}
        onClick={onClick}
        onKeyDown={handleKeyDownInternal}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        animate={{
          rotateX: calmMode ? 0 : tilt.rx,
          rotateY: calmMode ? 0 : (flipped ? 180 : tilt.ry),
          y: !calmMode && tilt.isHover ? -6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 140, damping: 22 }}
        style={{
          transformStyle: 'preserve-3d',
          borderRadius: 0,
          borderColor: 'rgba(10, 10, 11, 0.22)',
          ...style,
        }}
        className={`relative flex flex-col justify-between ${
          compact ? 'p-3 sm:p-4' : 'p-6 sm:p-7'
        } border bg-paper/75 backdrop-blur-sm transition-colors hover:border-ink hover:shadow-xl focus-visible:outline-2 focus-visible:outline-glow-1 ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {/* If card has back content and is flipped */}
        {backContent && (
          <div
            className={`absolute inset-0 ${
              compact ? 'p-3 sm:p-4' : 'p-6 sm:p-7'
            } flex flex-col justify-between bg-paper-2 border border-ink`}
            style={{
              backfaceVisibility: 'hidden',
              transform: calmMode ? 'none' : 'rotateY(180deg)',
              opacity: calmMode ? (flipped ? 1 : 0) : 1,
              pointerEvents: flipped ? 'auto' : 'none',
              zIndex: calmMode ? (flipped ? 10 : 0) : undefined,
              transition: calmMode ? 'opacity 0.3s ease-out' : 'none',
            }}
          >
            {backContent}
          </div>
        )}

        {/* Front Content */}
        <div
          className="flex flex-col justify-between h-full w-full"
          style={{
            backfaceVisibility: 'hidden',
            opacity: calmMode ? (flipped ? 0 : 1) : 1,
            pointerEvents: flipped ? 'none' : 'auto',
            zIndex: calmMode ? (flipped ? 0 : 10) : undefined,
            transition: calmMode ? 'opacity 0.3s ease-out' : 'none',
          }}
        >
          {/* Top row: Index "01" top-left in mono */}
          <div className="flex justify-between items-center w-full">
            <span className="font-mono text-xs uppercase tracking-widest text-ink/60 font-semibold">
              {index}
            </span>
            {tag && (
              <span className="font-mono text-xs uppercase tracking-wider text-ink/70">
                {tag}
              </span>
            )}
          </div>

          {/* Centered Illustration Slot */}
          <div
            className={`my-auto py-2 flex items-center justify-center ${
              compact ? 'min-h-[44px] sm:min-h-[56px]' : 'min-h-[120px]'
            } text-ink select-none`}
          >
            {illustration}
          </div>

          {/* Bottom Area: Title bottom-left in mono, description / controls */}
          <div
            className={`flex flex-col gap-1.5 ${
              compact ? 'pt-2' : 'pt-4'
            } border-t border-ink/10`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink">
                {title}
              </h3>
            </div>
            {children && (
              <div className="text-base font-normal leading-relaxed text-ink/80">
                {children}
              </div>
            )}
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
}
