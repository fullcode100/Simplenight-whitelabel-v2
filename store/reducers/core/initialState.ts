import { CoreState } from '../../../types/redux/CoreState';

export const initialState: CoreState = {
  brandConfig: {
    features: {},
    images: {},
    theme: {
      colors: {
        'primary-color-1000': '#0DADB9',
        'primary-color-900': '#3DB6BF',
        'primary-color-800': '#60BDC4',
        'primary-color-700': '#7AC9CF',
        'primary-color-600': '#8CD6DB',
        'primary-color-500': '#9FDCE0',
        'primary-color-400': '#B8E0E3',
        'primary-color-300': '#CCE6E8',
        'primary-color-200': '#D8EEF0',
        'primary-color-100': '#EBF9FA',
        'primary-dark-color': '#298F97',
      },
    },
  },
  languages: {
    intlMessages: {},
    locale: 'en',
  },
  theme: [],
  isMapsLoaded: false,
};
