import { CoreState } from '../../../types/redux/CoreState';

export const initialState: CoreState = {
  brandConfig: {
    information: {},
    theme: {
      primaryColor: {},
    },
    analytics: {},
    images: {},
    homepage: {},
    legalInformation: {},
    categories: [],
  },
  languages: {
    intlMessages: {},
    locale: 'en',
  },
  theme: [],
  isMapsLoaded: false,
  currency: 'USD',
};
