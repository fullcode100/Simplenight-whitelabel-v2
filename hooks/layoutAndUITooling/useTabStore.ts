import { create } from 'zustand';

export interface Tab {
  name: string;
  type: string;
  slug?: string;
  href?: string;
  current?: boolean;
  icon?: any;
}

export interface TabStoreState {
  tab: Tab | null;
  setTab(tab: Tab): void;
}

export const useTabStore = create<TabStoreState>()((set) => ({
  tab: null,
  setTab: (tab: Tab | null) => {
    set(() => ({ tab }));
  },
}));
