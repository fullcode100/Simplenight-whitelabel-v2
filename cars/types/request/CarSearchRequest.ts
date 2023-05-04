import { SearchRequest } from 'types/search/SearchRequest';
import { StringGeolocation } from 'types/search/Geolocation';

export interface CarSearchRequest extends SearchRequest {
  pickup_datetime: string;
  return_datetime: string;
  pickup_context: string;
  pickup_location: StringGeolocation;
  return_context: string;
  return_location: StringGeolocation;
  driver_age: number;
  currency?: string;
}
