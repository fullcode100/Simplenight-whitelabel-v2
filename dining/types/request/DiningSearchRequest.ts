import { SearchRequest } from 'types/search/SearchRequest';

export interface DiningSearchRequest extends SearchRequest {
  // id: string;
  covers: string;
  limit: number;
  price: string;
  sort_by: string;
  time: string;
  keyword: string;
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
