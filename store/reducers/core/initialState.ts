import { CoreState } from '../../../types/redux/CoreState';

export const initialState: CoreState = {
  brandConfig: {
    information: {},
    theme: {
      primaryColor: {},
    },
    analytics: {},
    features: {},
    images: {},
    homepage: {},
    legalInformation: {},
  },
  languages: {
    intlMessages: {},
    locale: 'en',
  },
  theme: [],
  isMapsLoaded: false,
  currency: 'USD',
};
