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

export const getAddressByLatLng = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&latlng=${lat},${lng}`;
  const response = await fetch(url);
  const location = await response.json();
  const place = location.results[0].formatted_address;
  const placeToArray = place.split(', ');
  placeToArray.splice(0, 1);

  const formattedPlace = placeToArray.join(', ');

  return formattedPlace;
};
