import { deepMerge } from '../helpers/objectUtils';

export const SUPPORT_INFORMATION = {
  email: 'customersupport@simplenight.com',
  phone: '+1 (800) 470-1795',
  phone_with_prefix: '+18004701795',
};

const defaultOptions = {
  images: {
    logo: 'https://storage.googleapis.com/simplenight_public_web/oem_powered_bylogo.png',
    background:
      'https://storage.googleapis.com/simplenight_public_web/landingBG.jpeg',
    favicon:
      'https://storage.googleapis.com/simplenight_public_web/oem/favicon/favicon-32x32.png',
  },
  sandboxConfig: {
    isSandbox: true,
    square: {
      appId: '',
      locationId: '',
    },
  },
  google: {
    analytics: {
      measurementId: 'G-N800J6V93W',
    },
  },
  supportInfo: SUPPORT_INFORMATION,
  features: {
    all: false,
    hotels: false,
    flights: false,
    transports: false,
    carrentals: false,
    gas: false,
    tours: false,
    events: false,
    dining: false,
    nightlife: false,
    shopping: false,
    cruise: false,
  },
  partnerName: 'Simplenight',
  isWhiteLabel: false,
  legalInformation: {
    partnerTermsOfService:
      'https://storage.googleapis.com/simplenight_public_web/terms-of-service.pdf',
    partnerPrivacyPolicy:
      'https://storage.googleapis.com/simplenight_public_web/privacy-policy.pdf',
    simplenightTermsOfService:
      'https://storage.googleapis.com/simplenight_public_web/terms-of-service.pdf',
    simplenightPrivacyPolicy:
      'https://storage.googleapis.com/simplenight_public_web/privacy-policy.pdf',
  },
  theme: [
    {
      key: '--primary-color-rgb',
      value: '13, 173, 185',
    },
    {
      key: '--hover-brightness',
      value: '0.9',
    },
    {
      key: '--alpha-light-variant',
      value: '0.6',
    },
  ],
};

const gentex = {
  images: {
    logo: 'https://storage.googleapis.com/simplenight_public_web/oem_powered_bylogo.png',
    background:
      'https://storage.googleapis.com/simplenight_public_web/landingBG.jpeg',
    favicon:
      'https://storage.googleapis.com/simplenight_public_web/oem/favicon/favicon-32x32.png',
  },
  features: {
    hotels: true,
  },
  google: {
    analytics: {
      measurementId: 'G-N800J6V93W',
    },
  },
  supportInfo: {
    email: 'customersupport@simplenight.com',
    phone: '+1 (800) 470-1795',
    phone_with_prefix: '+18004701795',
  },
  partnerName: 'Gentex Corporation',
  isWhiteLabel: false,
  bannerText: 'Book Everything, Anywhere.',
  bannerTextId: 'bookEverything',
  poweredBy: 'GENTEX & SIMPLENIGHT',
  theme: [
    {
      key: '--primary-color-rgb',
      value: '13, 173, 185',
    },
  ],
};

let defaultConfig = gentex;

const config = defaultConfig;

const getConfig = (brandCode: string) => {
  let isDefault = false;
  let brandConfig: any = defaultOptions;

  switch (brandCode) {
    case 'LOCALHOST:3000':
      brandConfig = gentex;
      break;
    case 'DEV':
      brandConfig = gentex;
      break;
    case 'GENTEX':
      brandConfig = gentex;
      break;
    default:
      isDefault = true;
      defaultOptions.features.hotels = true;
      defaultOptions.features.flights = true;
      defaultOptions.features.dining = true;
      defaultOptions.features.tours = true;
      defaultOptions.features.transports = true;
      defaultOptions.features.events = true;
      break;
  }

  brandConfig.brandCode = brandCode;

  return isDefault ? defaultOptions : deepMerge(defaultOptions, brandConfig);
};

export const getFormattedLevels = (originUrl?: string) => {
  if (!originUrl) {
    return getHostLevels();
  }

  return originUrl.toUpperCase().split('.');
};

export const getBrandCodeFromHost = (originUrl?: string) => {
  const hostLevels = getFormattedLevels(originUrl);
  return hostLevels[0];
};

export const getHostLevels = () =>
  window.location.host?.toUpperCase()?.split('.');

export const getBrandConfig = async (brandCode: string) => {
  return getConfig(brandCode);
};

export default config;
