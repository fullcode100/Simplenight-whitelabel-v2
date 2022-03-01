import { StringGeolocation } from './Geolocation';

export interface SearchRequest {
  start_date: string;
  end_date: string;
  dst_geolocation: StringGeolocation;
  rsp_fields: string;
}
