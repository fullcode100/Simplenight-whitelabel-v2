import { LocationPrefixResponse } from '../types/search/LocationPrefixResponse';
// import apiAxios from './config/axiosHelper';

export const getLocationsByPrefix = async (prefix: string) => {
  const apiAxios = (await import('./config/axiosHelper')).default;
  return apiAxios.get<LocationPrefixResponse>(
    `locations/prefix?prefix=${prefix}&lang_code=en`,
  );
};
