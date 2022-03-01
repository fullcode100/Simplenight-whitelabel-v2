export interface Geolocation {
  latitude: number;
  longitude: number;
  radius: number;
  unit: Unit;
}
export enum Unit {
  Mi = 'mi',
}

export type StringGeolocation = `${number},${number}`;
