import { m } from 'motion/react';
import { useDeckStore } from '../store/deckStore';
import type { SceneData } from '../data/scenes';
import {  SectionShell, Container, Frame , LineReveal } from '../components/UI';

export function S08Scope({ data }: { data: SceneData; isActive: boolean }) {
  const { calmMode } = useDeckStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SectionShell theme="dark" aria-label="Scope section">
      <Container className="text-center">
        <LineReveal delay={0}>
<h2 className="headline mb-14">{data.headline}</h2>
</LineReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto text-left">
          {/* Covers */}
          <m.div
            initial={calmMode ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            variants={calmMode ? {} : containerVariants}
          >
            <Frame className="h-full flex flex-col p-8 bg-black/20">
              <div className="label text-gray-400 mb-8 text-center border-b border-white/10 pb-4">COVERS</div>
              <div className="flex flex-col gap-6">
                {data.covers?.map((item, i) => (
                  <m.div key={i} variants={calmMode ? {} : itemVariants} className="flex items-start gap-4">
                    <span className="text-white mt-1 opacity-50">+</span>
                    <span className="text-gray-300 leading-snug">{item}</span>
                  </m.div>
                ))}
              </div>
            </Frame>
          </m.div>

          {/* Does Not Cover */}
          <m.div
            initial={calmMode ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            variants={calmMode ? {} : containerVariants}
          >
            <Frame className="h-full flex flex-col p-8 bg-black/20">
              <div className="label text-gray-500 mb-8 text-center border-b border-white/10 pb-4">DOES NOT COVER</div>
              <div className="flex flex-col gap-6">
                {data.doesNotCover?.map((item, i) => (
                  <m.div key={i} variants={calmMode ? {} : itemVariants} className="flex items-start gap-4">
                    <span className="text-gray-500 mt-1">×</span>
                    <span className="text-gray-500 leading-snug">{item}</span>
                  </m.div>
                ))}
              </div>
            </Frame>
          </m.div>
        </div>
      </Container>
    </SectionShell>
  );
}
