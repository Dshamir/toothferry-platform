import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Data } from '@puckeditor/core';

interface PageMeta {
  slug: string;
  title: string;
  updatedAt: number;
}

interface EditorStore {
  pages: Record<string, Data>;
  pageMeta: Record<string, PageMeta>;
  savePage: (slug: string, data: Data, title?: string) => void;
  getPage: (slug: string) => Data | null;
  deletePage: (slug: string) => void;
  getPageList: () => PageMeta[];
}

export const useEditorStore = create<EditorStore>()(
  immer((set, get) => ({
    pages: {},
    pageMeta: {},

    savePage: (slug, data, title) => set((state) => {
      state.pages[slug] = data;
      state.pageMeta[slug] = {
        slug,
        title: title ?? state.pageMeta[slug]?.title ?? slug,
        updatedAt: Date.now(),
      };
    }),

    getPage: (slug) => {
      return get().pages[slug] ?? null;
    },

    deletePage: (slug) => set((state) => {
      delete state.pages[slug];
      delete state.pageMeta[slug];
    }),

    getPageList: () => {
      return Object.values(get().pageMeta).sort((a, b) => b.updatedAt - a.updatedAt);
    },
  }))
);
