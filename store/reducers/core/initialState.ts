import { CoreState } from '../../../types/redux/CoreState';

export const initialState: CoreState = {
  brandConfig: {
    features: {},
    images: {},
  },
  languages: {
    intlMessages: {},
    locale: 'en',
  },
  theme: [],
};
