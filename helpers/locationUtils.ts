import { LocationPrefix } from '../types/search/LocationPrefixResponse';

export const getLocationText = (value: LocationPrefix | undefined): string => {
  if (!value) return '';

  let name = null;
  let province = null;
  let iso = null;

  if (value?.location_name) name = value.location_name;
  if (value?.province) province = value.province;
  if (value?.iso_country_code) iso = value.iso_country_code;

  const locationText = [name, province, iso].filter(Boolean);

  return locationText.join(', ').replace(' ,', '');
};
