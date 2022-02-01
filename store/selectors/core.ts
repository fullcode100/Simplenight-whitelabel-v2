import {
  ClientConfigImages,
  CoreLanguages,
  SimplenightFeatures,
} from '../../types/redux/CoreState';
import { IntlMessages } from '../../types/redux/IntlMessages';

export const getFeatures = (state: any): SimplenightFeatures =>
  state.core.brandConfig.features;

export const getImages = (state: any): ClientConfigImages =>
  state.core.brandConfig.images;

export const getIntlMessages = (state: any): IntlMessages =>
  state.core.languages.intlMessages;

export const getLanguageSettings = (state: any): CoreLanguages =>
  state.core.languages;

export const getBrandConfig = (state: any) => state.core.brandConfig;
