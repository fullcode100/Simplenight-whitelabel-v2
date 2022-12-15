import { SearchRequest } from 'types/search/SearchRequest';

export interface DiningSearchRequest extends SearchRequest {
  // id: string;
  covers: string;
  limit: number;
  price: string;
  starRating: string;
}

export interface DiningSearchPreRequest {
  id: string;
}

export interface DiningSearchreRequest {
  id: string;
}

export interface DiningSearchreRequest {
  id: string;
}
