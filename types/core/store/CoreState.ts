/* eslint @typescript-eslint/ban-types: off */
import { IntlMessages } from './IntlMessages';

export interface HomepageScrollHandlerFn {
  (this: HTMLDivElement, ev: Event): void;
}

export interface CoreStateStore {
  languages: CoreLanguages;
  theme: CoreTheme[];
  homepageScrollHandler?: HomepageScrollHandlerFn;
  currency: string;
  isMapsLoaded: boolean;
  setLanguages: (languages: CoreLanguages) => void;
  setTheme: (theme: CoreTheme[]) => void;
  setCurrency: (currency: string) => void;
  setIsMapsLoaded: (isMapsLoaded: boolean) => void;
  setHomepageScrollHandler: (handler: HomepageScrollHandlerFn) => void;
}

export interface CoreTheme {
  key: string;
  value: string;
}

export interface SimplenightFeatures {
  [key: string]: boolean;
}

export interface CoreLanguages {
  intlMessages: IntlMessages;
  locale: string;
}
