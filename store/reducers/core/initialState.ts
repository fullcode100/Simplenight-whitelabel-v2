import { CoreState } from '../../../types/redux/CoreState';

export const initialState: CoreState = {
  languages: {
    intlMessages: {},
    locale: 'en',
  },
  theme: [],
  isMapsLoaded: false,
  currency: 'USD',
};
