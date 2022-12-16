import { CoreState } from '../../../types/redux/CoreState';

export const initialState: CoreState = {
  brandConfigLoaded: false,
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
    features: {},
  },
  languages: {
    intlMessages: {},
    locale: 'en',
  },
  theme: [],
  isMapsLoaded: false,
  currency: 'USD',
};
