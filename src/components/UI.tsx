import React, { useRef, useState } from 'react';
import { m, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { useDeckStore } from '../store/deckStore';

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`container-ui ${className}`}>
      {children}
    </div>
  );
}

export function Frame({ children, className = '', theme = 'dark' }: { children: React.ReactNode; className?: string; theme?: 'dark'|'light' }) {
  const { calmMode } = useDeckStore();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const background = useMotionTemplate`radial-gradient(circle 300px at ${spotlightX}% ${spotlightY}%, ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}, transparent 100%)`;

  return (
    <m.div 
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => { setHovered(false); mouseX.set(0); mouseY.set(0); }}
      onPointerMove={handlePointerMove}
      style={{
        rotateX: calmMode ? 0 : rotateX,
        rotateY: calmMode ? 0 : rotateY,
        transformPerspective: 1000
      }}
      whileHover={calmMode ? {} : { y: -4 }}
      className={`frame relative overflow-hidden group focus-within:ring-2 focus-within:ring-white/50 ${className}`}
    >
      <div className="frame-inner relative z-10 h-full">
        {children}
      </div>
      <AnimatePresence>
        {hovered && !calmMode && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background }}
          />
        )}
      </AnimatePresence>
    </m.div>
  );
}

export function Chip({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`chip-ui ${className}`}>
      {children}
    </span>
  );
}

export function PillButton({ children, className = '', onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { calmMode } = useDeckStore();
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (calmMode || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    x.set((distX / rect.width) * 16);
    y.set((distY / rect.height) * 16);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className={`pill-btn hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none ${className}`}
      {...(props as any)}
    >
      {children}
    </m.button>
  );
}

export function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`label ${className}`}>
      {children}
    </div>
  );
}

export function SectionShell({ 
  theme = 'dark', 
  children, 
  className = '',
  ...props 
}: React.HTMLAttributes<HTMLElement> & { theme?: 'dark' | 'light' }) {
  const isDark = theme === 'dark';
  return (
    <section 
      className={`relative w-full h-screen min-h-[100svh] flex flex-col items-center justify-center overflow-hidden py-[clamp(112px,14vh,160px)] select-none ${isDark ? 'glow-dark' : 'paper-light'} ${className}`}
      style={{ backgroundColor: isDark ? 'var(--black)' : 'var(--paper)', color: isDark ? 'var(--white)' : 'var(--black)' }}
      {...props}
    >
      {isDark && <div className="grain pointer-events-none" />}
      {children}
    </section>
  );
}

export function LineReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { calmMode } = useDeckStore();
  return (
    <div className={`overflow-hidden ${className}`}>
      <m.div
        initial={calmMode ? { y: 0, opacity: 1 } : { y: '100%' }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay }}
      >
        {children}
      </m.div>
    </div>
  );
}
