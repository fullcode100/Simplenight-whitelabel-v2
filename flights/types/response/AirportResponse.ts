export interface AirportResponse {
  data: AirportItem[];
}

export interface AirportItem {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  id: string;
  self?: Self;
  timeZoneOffset: string;
  iataCode: string;
  geoCode: GeoCode;
  address: Address;
  analytics?: Analytics;
}

interface Analytics {
  travelers: Travelers;
}

interface Travelers {
  score: number;
}

interface Address {
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  stateCode: string;
  regionCode: string;
}

interface GeoCode {
  latitude: number;
  longitude: number;
}

interface Self {
  href: string;
  methods: string[];
}
