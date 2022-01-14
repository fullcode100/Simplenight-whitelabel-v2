export type LocationPrefixResponse = LocationPrefix[];

export interface LocationPrefix {
  location_id: string;
  language_code: LanguageCode;
  location_name: string;
  location_aircode: null | string;
  airport_code: null | string;
  province: string;
  iso_country_code: string;
  latitude: number;
  longitude: number;
  location_type: LocationType;
}

export enum LanguageCode {
  En = 'en',
}

export enum LocationType {
  Airport = 'AIRPORT',
  City = 'CITY',
}
