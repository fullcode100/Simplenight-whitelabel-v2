/* eslint react-hooks/rules-of-hooks: off */
import { useSelector } from 'react-redux';
import { Category } from 'types/settings/BrandConfig';
import { ClientConfigImages, CoreLanguages } from '../../types/redux/CoreState';
import { IntlMessages } from '../../types/redux/IntlMessages';

export const getCategories = (state: any): Category[] =>
  state.core.brandConfig?.categories;

export const getImages = (state: any): ClientConfigImages =>
  state.core.brandConfig.images;

export const getIntlMessages = (state: any): IntlMessages =>
  state.core.languages.intlMessages;

export const getLanguageSettings = (state: any): CoreLanguages =>
  state.core.languages;

export const getBrandConfig = (state: any) => state.core.brandConfig;

export const getIsMapLoaded = () =>
  useSelector((state: any) => state.core.isMapsLoaded);

export const getBrandTheme = (state: any) => state.core.brandConfig?.theme;

export const getBrandHeroTitle = (state: any) =>
  state.core.brandConfig.homepage.heroSectionTitle;

export const getHomepageScrollHandler = () =>
  useSelector((state: any) => state.core.homepageScrollHandler);

export const getCurrency = () =>
  useSelector((state: any) => state.core.currency);
