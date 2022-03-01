import { SearchRequest } from 'types/search/SearchRequest';

export interface HotelSearchRequest extends SearchRequest {
  adults: number;
}
