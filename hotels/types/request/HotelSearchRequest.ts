import { SearchRequest } from 'types/search/SearchRequest';

export interface HotelSearchRequest extends SearchRequest {
  rooms: number;
  adults: number;
  children: number;
  star_rating: string;
}
