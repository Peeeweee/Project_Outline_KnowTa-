import { useEffect, useRef } from 'react';
import { m, useInView, useSpring, useTransform } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Frame, Chip , LineReveal } from '../components/UI';

function CountUp({ value, calmMode }: { value: string; calmMode: boolean }) {
  const isPercent = value.includes('%');
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: 2000,
  });

  useEffect(() => {
    if (calmMode) {
      spring.set(numericValue);
    } else if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, calmMode, spring]);

  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current);
    const formatted = rounded.toLocaleString('en-US');
    return isPercent ? `${formatted}%` : formatted;
  });

  return <m.span ref={ref}>{display}</m.span>;
}

export function S02Numbers({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode, setActiveDetail } = useDeckStore();

  const handleStatClick = (stat: any) => {
    setActiveDetail({
      title: stat.value,
      body: stat.detail,
      source: stat.ref,
    });
  };

  return (
    <SectionShell theme="light" aria-label="Statistics section">
      {/* 6 faint concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-black"
            style={{ width: i * 25 + 'vw', height: i * 25 + 'vw' }}
          />
        ))}
      </div>

      <Container className="text-center z-10">
        <LineReveal delay={0}>
<h2 className="headline mb-14">{data.headline}</h2>
</LineReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {data.stats?.map((stat, i) => (
            <m.div
              key={stat.value}
              initial={calmMode ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={calmMode ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ delay: calmMode ? 0 : i * 0.1, type: 'spring' }}
            >
              <Frame className="h-full flex flex-col items-center justify-between p-8 bg-paper">
                <div className="label mb-6">Statistic {i + 1}</div>
                <div className="big-number text-black mb-6">
                  <CountUp value={stat.value} calmMode={calmMode} />
                </div>
                <LineReveal delay={0.12}>
<div className="sub text-gray-600 mb-8 max-w-[200px]">
                  {stat.short}
                </div>
</LineReveal>
                <button onClick={(e) => { e.stopPropagation(); handleStatClick(stat); }} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <Chip>Source {stat.ref}</Chip>
                </button>
              </Frame>
            </m.div>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
