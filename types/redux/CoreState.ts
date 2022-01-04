import { IntlMessages } from './IntlMessages';

export interface CoreState {
  brandConfig: any;
  languages: CoreLanguages;
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
