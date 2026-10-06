import { useRefDrawerStore } from '../store/refDrawerStore';
import { SectionShell, Container, PillButton } from './UI';

const PEOPLE = [
  'Delgado',
  'Delgado',
  'Labay',
];

const SCHOOL = 'USeP CIC';

export function FooterSection() {
  const { open: openReferences } = useRefDrawerStore();

  return (
    <SectionShell theme="dark" aria-label="Footer Section">
      <Container className="flex flex-col h-full justify-between pb-0 overflow-hidden relative">
        
        {/* Top minimal row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 z-10 w-full font-mono text-[11px] text-white/50 uppercase tracking-widest border-b border-white/10 pb-6">
          <div className="flex gap-4">
            {PEOPLE.map((p, i) => (
              <span key={i}>{p}</span>
            ))}
            <span>|</span>
            <span>{SCHOOL}</span>
          </div>
          
          <PillButton onClick={() => openReferences(0)} className="border-white/20 hover:text-white transition-colors">
            SOURCES ↗
          </PillButton>
        </div>

        {/* Big Wordmark */}
        <div className="w-full flex justify-center mt-auto z-0 translate-y-[15%]">
          <span 
            className="headline text-[clamp(100px,20vw,360px)] leading-[0.75] text-white/5 uppercase"
            style={{ marginBottom: '-0.15em' }}
          >
            KNOW-TA!
          </span>
        </div>

      </Container>
    </SectionShell>
  );
}
