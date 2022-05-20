/* eslint @typescript-eslint/ban-types: off */
import { Ref } from 'react';
import { IntlMessages } from './IntlMessages';

export interface CoreState {
  brandConfig: any;
  languages: CoreLanguages;
  theme: CoreTheme[];
  isMapsLoaded: boolean;
  isPaymentLoaded: boolean;
  homepageScrollHandler?: Function;
  currency: string;
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
