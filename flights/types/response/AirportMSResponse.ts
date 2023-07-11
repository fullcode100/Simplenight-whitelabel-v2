export interface AirportsMsResponse {
  data: AirportMsData[];
}

export interface AirportMsData {
  id: string;
  type: string;
  sub_type: string;
  name: string;
  detailed_name: string;
  airport_id: string;
  time_zone_offset: string;
  iata_code: string;
  latitude: string;
  longitude: string;
  city_name: string;
  city_code: string;
  country_name: string;
  country_code: string;
  state_code: string;
  region_code: string;
  score: null;
}
