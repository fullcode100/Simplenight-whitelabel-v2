export interface ParkingSearchResponse {
  items: ParkingSearchResponseItem[];
}

interface ParkingSearchResponseItem {
  result: ParkingSearchResponseItemResult;
}

export interface ParkingSearchResponseItemResult {
  features: Parking[];
}

export interface Parking {
  type: string;
  geometry: ParkingGeometry;
  properties: Properties;
  id: string;
}

export interface ParkingGeometry {
  type: string;
  geometries: GeometryElement[];
}

type GeometryElement = PointGeometry | PolygonGeometry | LineStringGeometry;
export type PointGeometry = {
  type: 'Point';
  coordinates: [number, number];
};

export type PolygonGeometry = {
  type: 'Polygon';
  coordinates: [number, number][][];
};

export type LineStringGeometry = {
  type: 'LineString';
  coordinates: [number, number][];
};

export interface Properties {
  type: string;
  dynamic: Dynamic | null;
  static: Static;
}

export interface Dynamic {
  rates?: DynamicRate[];
  availability?: Availability[];
}

export type Availability = {
  indicator: AvailabilityIndicator;
  trend: number;
  updated_at: string;
};

type AvailabilityIndicator = 'HIGH' | 'MID' | 'LOW';

export type DynamicRate = {
  type: string;
  value: string;
  price: number;
};

export interface Static {
  additional_info: string;
  address: Address;
  capacity?: number;
  capacity_disabled?: number;
  distance: number;
  height?: Height;
  features?: string[];
  name: string;
  operator?: string;
  park_and_ride: boolean;
  payment_method: string;
  payment_types: string[];
  phone?: string;
  rate_tables?: RateTables;
  restrictions?: string[];
  surface_type: string;
  times: Times;
  timezone: string;
  type: string;
  url: string;
  images?: Image[];
  orientation?: string;
}

export interface Image {
  url: string;
  type: 'MAIN' | string;
}

export interface Address {
  street: Street;
  city: string;
  country: string;
  postcode: string;
  area: string;
}

export interface Street {
  formatted: string;
  name: string;
  number?: string;
}

export interface Height {
  restricted: boolean;
  max_cms?: number;
}

export interface RateTables {
  currency?: string;
  currency_code: string;
  rate_table: RateTable[];
}

export interface RateTable {
  active_times: Open[];
  eligibility: string;
  max_stay?: string;
  rates?: StaticRate[];
}

export interface Open {
  from: string;
  to: string;
  days: string[];
}

export interface StaticRate {
  type: string;
  value: string;
  price: number;
  conditions?: Condition[];
}

export interface Condition {
  days: string[];
  enter: Enter;
  exit: Exit;
}

export interface Enter {
  start: string;
}

export interface Exit {
  end: string;
}

export interface Times {
  open: Open[];
}
