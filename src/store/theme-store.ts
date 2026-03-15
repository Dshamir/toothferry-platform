import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeId = 'v2-cobalt' | 'legacy-teal';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  description: string;
  cssFile: string | null; // null = built-in globals.css (no extra sheet needed)
}

export const THEMES: ThemeOption[] = [
  {
    id: 'v2-cobalt',
    label: 'v2 — Cobalt Blue',
    description: 'Design Tokens v2 (Plus Jakarta Sans, cobalt blue, pill CTAs)',
    cssFile: '/themes/design-tokens-v2.css',
  },
  {
    id: 'legacy-teal',
    label: 'Legacy — Teal/Cream',
    description: 'Original portal theme (Syne, teal green, cream canvas)',
    cssFile: '/themes/legacy-teal.css',
  },
];

interface ThemeStore {
  activeTheme: ThemeId;
  setTheme: (id: ThemeId) => void;
  getThemeConfig: () => ThemeOption;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      activeTheme: 'v2-cobalt',

      setTheme: (id) => set({ activeTheme: id }),

      getThemeConfig: () => {
        const { activeTheme } = get();
        return THEMES.find((t) => t.id === activeTheme) ?? THEMES[0];
      },
    }),
    {
      name: 'toothferry-theme',
    }
  )
);
