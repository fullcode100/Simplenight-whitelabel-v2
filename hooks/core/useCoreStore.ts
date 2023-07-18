import { CoreStateStore } from 'types/core/store/CoreState';
import { CustomWindow } from 'types/global/CustomWindow';
import { create } from 'zustand';

declare let window: CustomWindow;

export const useCoreStore = create<CoreStateStore>()((set) => ({
  languages: {
    intlMessages: {},
    locale: 'en',
  },
  filters: {},
  theme: [],
  isMapsLoaded: false,
  currency: 'USD',
  homepageScrollHandler: undefined,
  setLanguages: (languages) => {
    set(() => ({
      languages,
    }));
  },
  setTheme: (theme) => {
    set(() => ({
      theme,
    }));
  },
  setCurrency: (currency) => {
    window.currency = currency;
    localStorage.setItem('currency', currency);
    set(() => ({
      currency,
    }));
  },
  setIsMapsLoaded: (isMapsLoaded) => {
    set(() => ({
      isMapsLoaded,
    }));
  },
  setHomepageScrollHandler: (handler) => {
    set(() => ({
      homepageScrollHandler: handler,
    }));
  },
}));
