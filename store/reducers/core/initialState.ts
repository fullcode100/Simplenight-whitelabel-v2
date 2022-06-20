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
    partnerInformation: {
      partnerUrl: 'https://demo.simplenight.com',
      sandboxMode: true,
      apiKey: 'wQFIAZLy.Nniv7mMAQ7T5hPJQ2xZcT7q3zZbPc9r5',
      partnerName: 'Simplenight',
      homepageText: 'Book Everything, Anywhere.',
      customerSupportEmail: 'customersupport@simplenight.com',
      customerSupportPhone: '+1 (800) 470-1795',
      phoneWithPrefix: '+18004701795',
      isWhiteLabel: false,
      aboutLink: 'https://www.simplenight.com/about',
      orderLookupUrl: '/orderLookup',
      corporateLink: 'https://www.simplenight.com/',
    },
    simplenightInformation: {
      corporateLink: 'https://www.simplenight.com/',
    },
    legalInformation: {
      simplenightPrivacyPolicy:
        'https://storage.googleapis.com/simplenight_public_web/privacy-policy.pdf',
      partnerPrivacyPolicy:
        'https://storage.googleapis.com/simplenight_public_web/privacy-policy.pdf',
      partnerTermsOfService:
        'https://storage.googleapis.com/simplenight_public_web/terms-of-service.pdf',
      simplenightTermsOfService:
        'https://storage.googleapis.com/simplenight_public_web/terms-of-service.pdf',
    },
  },
  languages: {
    intlMessages: {},
    locale: 'en',
  },
  theme: [],
  isMapsLoaded: false,
  isPaymentLoaded: false,
  currency: 'USD',
};
