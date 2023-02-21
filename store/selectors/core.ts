/* eslint react-hooks/rules-of-hooks: off */
import { useSelector } from 'react-redux';
import { CoreLanguages } from '../../types/redux/CoreState';
import { IntlMessages } from '../../types/redux/IntlMessages';

export const getIntlMessages = (state: any): IntlMessages =>
  state.core.languages.intlMessages;

export const getLanguageSettings = (state: any): CoreLanguages =>
  state.core.languages;

export const getIsMapLoaded = () =>
  useSelector((state: any) => state.core.isMapsLoaded);

export const getHomepageScrollHandler = () =>
  useSelector((state: any) => state.core.homepageScrollHandler);

export const getCurrency = () =>
  useSelector((state: any) => state.core.currency);
