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

export type StringGeolocation = `${number},${number}`;
