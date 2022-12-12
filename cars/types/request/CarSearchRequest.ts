import { SearchRequest } from 'types/search/SearchRequest';
import { StringGeolocation } from 'types/search/Geolocation';

export interface CarSearchRequest extends SearchRequest {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  geolocation: StringGeolocation;
  geolocation2: StringGeolocation;
  currency?: string;
}
