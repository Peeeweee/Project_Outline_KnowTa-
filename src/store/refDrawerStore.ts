// src/store/refDrawerStore.ts
// Zustand store for the global reference drawer state.
import { create } from 'zustand';

interface RefDrawerState {
  openKey: number | null;
  open: (key: number) => void;
  close: () => void;
}

export const useRefDrawerStore = create<RefDrawerState>((set) => ({
  openKey: null,
  open: (key) => set({ openKey: key }),
  close: () => set({ openKey: null }),
}));
