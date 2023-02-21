import { useQuery } from '@tanstack/react-query';
import { getSettings } from 'apiCalls/settings';

const initialBrandConfig = {
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
};

export const useSettings = () =>
  useQuery(['settings'], getSettings, {
    placeholderData: initialBrandConfig,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
