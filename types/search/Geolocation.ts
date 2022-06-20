export interface Geolocation {
  latitude: number;
  longitude: number;
  radius: number;
  unit: Unit;
}
export interface latLngProp {
  lat: number;
  lng: number;
}
export enum Unit {
  Mi = 'mi',
}

export const GEOLOCATION_SEPARATOR = ',';
export const LATITUDE_INDEX = 0;
export const LONGITUDE_INDEX = 1;

export type StringGeolocation = `${number},${number}`;
