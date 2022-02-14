import axios from 'apiCalls/config/axiosHelper';
import { LocationPrefixResponse } from '../types/search/LocationPrefixResponse';

export const getLocationsByPrefix = async (prefix: string) =>
  axios.get<LocationPrefixResponse>('/locations/prefix', {
    params: {
      prefix,
    },
  });
