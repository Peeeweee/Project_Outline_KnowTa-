import { create } from 'zustand';
import { scenes } from '../data/scenes';
import type { SceneData } from '../data/scenes';

export type BodyMode = 'plain' | 'technical';

// Section definitions: slug, scene ids it contains, theme (dark or light)
export interface SectionDef {
  slug: string;
  sceneIds: string[];
  theme: 'dark' | 'light';
  headline: string;
  label: string;
  takeaway: string;
}

export const sectionDefs: SectionDef[] = [
  { slug: 'hero',       sceneIds: ['S01'],       theme: 'dark',  headline: 'Can you tell which song is human?', label: 'Title', takeaway: 'Listening alone is no longer enough.' },
  { slug: 'numbers',    sceneIds: ['S02'],       theme: 'dark',  headline: "THE UPLOADS NEVER STOP. LISTENING CAN'T KEEP UP.", label: 'THE SCALE', takeaway: 'People cannot hear the difference, and the volume is growing.' },
  { slug: 'home',       sceneIds: ['S04'],       theme: 'light', headline: 'THE SAME WORRY, CLOSER TO HOME.', label: 'CLOSER TO HOME', takeaway: 'Local artists have little protection and no simple way to check a song.' },
  { slug: 'gap',        sceneIds: ['S05'],       theme: 'light', headline: "Today's detectors break in five ways", label: '1.1 Background', takeaway: 'High lab scores do not mean reliable detection.' },
  { slug: 'idea',       sceneIds: ['S06'],       theme: 'dark',  headline: 'SPLIT THE SONG. JUDGE EACH PART. SHOW DOUBT.', label: 'THE METHOD AT A GLANCE', takeaway: 'TWO KINDS OF EVIDENCE, ONE HONEST CONFIDENCE SCORE.' },
  { slug: 'questions',  sceneIds: ['S07'],       theme: 'light', headline: 'Four questions, four testable predictions', label: '1.2 Statement of the Problem, 1.3 Hypotheses', takeaway: 'Every claim can be rejected, and we report it if it is.' },
  { slug: 'scope',      sceneIds: ['S08'],       theme: 'dark',  headline: "WHAT WE COVER. WHAT WE DON'T.", label: 'SCOPE', takeaway: 'Clear limits make the results fair to read.' },
  { slug: 'literature', sceneIds: ['S09'],       theme: 'light', headline: 'WHAT THE LITERATURE SAYS.', label: 'RELATED LITERATURE', takeaway: 'Every design choice traces back to evidence, with its limits stated.' },
  { slug: 'data',       sceneIds: ['S10'],       theme: 'light', headline: 'TESTED ON GENERATORS IT HAS NEVER HEARD.', label: 'THE DATA', takeaway: 'CLEAN, REPRODUCIBLE, AND HONEST ABOUT LIMITS.' },
  { slug: 'theory',     sceneIds: ['S11'],       theme: 'dark',  headline: 'THREE IDEAS BEHIND THE DESIGN.', label: 'THEORETICAL FRAMEWORK', takeaway: 'DOUBT, WEIGHTING, AND TWO VIEWS MAKE THE VERDICT MORE HONEST.' },
  { slug: 'framework',  sceneIds: ['S12'],       theme: 'light', headline: 'INPUT. PROCESS. OUTPUT.', label: 'CONCEPTUAL FRAMEWORK', takeaway: 'ONE DIRECTION, FROM RAW AUDIO TO A READABLE REPORT.' },
  { slug: 'verdict',    sceneIds: ['S13'],       theme: 'dark',  headline: 'THE VERDICT, PRINTED.', label: 'THE REPORT', takeaway: 'A VERDICT, A CONFIDENCE, AND A WARNING WHEN THE EVIDENCE DISAGREES.' },
  { slug: 'footer',     sceneIds: [],            theme: 'dark',  headline: 'KNOW-TA!', label: 'FOOTER', takeaway: 'QUESTIONS? PRESS Q.' },
];

const shortModeSlugs = ['hero', 'numbers', 'gap', 'idea', 'questions', 'data', 'verdict', 'footer'];

interface DeckState {
  currentSection: number;
  bodyMode: BodyMode;
  calmMode: boolean;
  qaOpen: boolean;
  presenterMode: boolean;
  shortMode: boolean;
  settingsOpen: boolean;
  activeDetail: { title: string; body: string; source?: string } | null;
  setActiveDetail: (detail: { title: string; body: string; source?: string } | null) => void;
  setSection: (index: number) => void;
  nextSection: () => void;
  prevSection: () => void;
  setBodyMode: (mode: BodyMode) => void;
  toggleBodyMode: () => void;
  toggleCalmMode: () => void;
  togglePresenterMode: () => void;
  toggleShortMode: () => void;
  toggleSettings: () => void;
  closeSettings: () => void;
  openQA: () => void;
  closeQA: () => void;
  toggleQA: () => void;
  currentScene: number;
  setScene: (index: number) => void;
  getActiveScenes: () => SceneData[];
  getActiveSections: () => SectionDef[];
  getScenesForSection: (slug: string) => SceneData[];
}

export const useDeckStore = create<DeckState>((set, get) => ({
  currentSection: 0,
  currentScene: 0,
  bodyMode: 'plain',
  calmMode: false,
  qaOpen: false,
  presenterMode: false,
  shortMode: false,
  settingsOpen: false,
  activeDetail: null,

  setActiveDetail: (detail) => set({ activeDetail: detail }),

  getActiveSections: () => {
    const { shortMode } = get();
    return shortMode ? sectionDefs.filter(s => shortModeSlugs.includes(s.slug)) : sectionDefs;
  },

  getActiveScenes: () => {
    const { getActiveSections, getScenesForSection } = get();
    return getActiveSections().flatMap((s) => getScenesForSection(s.slug));
  },

  getScenesForSection: (slug: string) => {
    const def = sectionDefs.find(s => s.slug === slug);
    if (!def) return [];
    return def.sceneIds.map(id => scenes.find(s => s.id === id)).filter(Boolean) as SceneData[];
  },

  setScene: (index: number) => {
    get().setSection(index);
  },

  setSection: (index: number) => {
    const active = get().getActiveSections();
    const clamped = Math.max(0, Math.min(index, active.length - 1));
    set({ currentSection: clamped, currentScene: clamped });
  },

  nextSection: () => {
    const { currentSection, getActiveSections } = get();
    const active = getActiveSections();
    const newIdx = Math.min(currentSection + 1, active.length - 1);
    if (newIdx !== currentSection) {
      set({ currentSection: newIdx, currentScene: newIdx });
      const targetSlug = active[newIdx]?.slug;
      if (targetSlug) {
        const el = document.querySelector(`[data-scene="${targetSlug}"]`) as HTMLElement | null;
        const lenis = (window as any).__lenis;
        if (el && lenis) {
          lenis.scrollTo(el, { immediate: false });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  },

  prevSection: () => {
    const { currentSection, getActiveSections } = get();
    const active = getActiveSections();
    const newIdx = Math.max(currentSection - 1, 0);
    if (newIdx !== currentSection) {
      set({ currentSection: newIdx, currentScene: newIdx });
      const targetSlug = active[newIdx]?.slug;
      if (targetSlug) {
        const el = document.querySelector(`[data-scene="${targetSlug}"]`) as HTMLElement | null;
        const lenis = (window as any).__lenis;
        if (el && lenis) {
          lenis.scrollTo(el, { immediate: false });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  },

  setBodyMode: (mode: BodyMode) => set({ bodyMode: mode }),
  toggleBodyMode: () => set((s) => ({ bodyMode: s.bodyMode === 'plain' ? 'technical' : 'plain' })),
  toggleCalmMode: () => set((s) => ({ calmMode: !s.calmMode })),
  togglePresenterMode: () => set((s) => ({ presenterMode: !s.presenterMode })),

  toggleShortMode: () => {
    const s = get();
    const newShort = !s.shortMode;
    const currentSlug = s.getActiveSections()[s.currentSection]?.slug;
    const newActive = newShort
      ? sectionDefs.filter((sec) => shortModeSlugs.includes(sec.slug))
      : sectionDefs;
    let newIdx = newActive.findIndex((sec) => sec.slug === currentSlug);
    if (newIdx === -1) {
      const oldActive = s.getActiveSections();
      for (let i = s.currentSection; i >= 0; i--) {
        const found = newActive.findIndex((sec) => sec.slug === oldActive[i]?.slug);
        if (found !== -1) {
          newIdx = found;
          break;
        }
      }
      if (newIdx === -1) newIdx = 0;
    }
    set({ shortMode: newShort, currentSection: newIdx, currentScene: newIdx });

    const targetSlug = newActive[newIdx]?.slug;
    if (targetSlug) {
      setTimeout(() => {
        const el = document.querySelector(`[data-scene="${targetSlug}"]`) as HTMLElement | null;
        const lenis = (window as any).__lenis;
        if (el && lenis) {
          lenis.scrollTo(el, { immediate: false });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  },

  toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
  closeSettings: () => set({ settingsOpen: false }),

  openQA: () => set({ qaOpen: true }),
  closeQA: () => set({ qaOpen: false }),
  toggleQA: () => set((s) => ({ qaOpen: !s.qaOpen })),
}));

// Legacy aliases so old scene components still compile
export const useLegacyDeckStore = () => {
  const store = useDeckStore();
  return {
    ...store,
    currentScene: store.currentSection,
    setScene: store.setSection,
    nextScene: store.nextSection,
    prevScene: store.prevSection,
    getActiveScenes: () => scenes,
  };
};
