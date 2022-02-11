import { IntlMessages } from './IntlMessages';

export interface CoreState {
  brandConfig: any;
  languages: CoreLanguages;
  theme: CoreTheme[];
}

export interface CoreTheme {
  key: string;
  value: string;
}

export interface SimplenightFeatures {
  [key: string]: boolean;
}

export interface ClientConfigImages {
  logo: string;
  background: string;
  favicon: string;
  [key: string]: string;
}

export interface CoreLanguages {
  intlMessages: IntlMessages;
  locale: string;
}
