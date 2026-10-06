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
  { slug: 'hero',       sceneIds: ['S01'],       theme: 'dark',  headline: "Know what you’re hearing.", label: 'Title', takeaway: "Two branches. A testable proposal. An estimate with limits." },
  { slug: 'numbers',    sceneIds: ['S02'],       theme: 'dark',  headline: "The uploads never stop.", label: 'THE SCALE', takeaway: "Detection needs evidence beyond a listening test." },
  { slug: 'home',       sceneIds: ['S04'],       theme: 'light', headline: "A local reason to ask better questions.", label: 'CLOSER TO HOME', takeaway: "Support careful review before making an accusation." },
  { slug: 'gap',        sceneIds: ['S05'],       theme: 'light', headline: "A high lab score is only the beginning.", label: '1.1 Background', takeaway: "Test transfer, contribution, calibration and disagreement separately." },
  { slug: 'idea',       sceneIds: ['S06'],       theme: 'dark',  headline: "Split the song. Compare the evidence.", label: 'THE METHOD AT A GLANCE', takeaway: "The voice may add value. The experiments must show it." },
  { slug: 'questions',  sceneIds: ['S07'],       theme: 'light', headline: "Every claim needs a test.", label: "RESEARCH QUESTIONS & EVALUATION", takeaway: "A negative result is still a research result." },
  { slug: 'scope',      sceneIds: ['S08'],       theme: 'dark',  headline: "Clear boundaries. Fair conclusions.", label: 'SCOPE', takeaway: "An estimated probability does not establish authorship." },
  { slug: 'literature', sceneIds: ['S09'],       theme: 'light', headline: "Build on evidence. Keep its limits.", label: 'RELATED LITERATURE', takeaway: "The contribution is what the controlled evaluation establishes." },
  { slug: 'data',       sceneIds: ['S10'],       theme: 'light', headline: "A test beyond familiar platforms.", label: 'THE DATA', takeaway: "Published inventory is not the final eligible test size." },
  { slug: 'theory',     sceneIds: ['S11'],       theme: 'dark',  headline: "Show the score. Show the uncertainty.", label: 'THEORETICAL FRAMEWORK', takeaway: "A confident model can still be wrong on unfamiliar music." },
  { slug: 'framework',  sceneIds: ['S12'],       theme: 'light', headline: "One recording. A readable report.", label: 'CONCEPTUAL FRAMEWORK', takeaway: "Keep learning, calibration and final testing in separate stages." },
  { slug: 'verdict',    sceneIds: ['S13'],       theme: 'dark',  headline: "The proposed report.", label: 'THE REPORT', takeaway: "Probabilities support review; they do not certify authenticity." },
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
