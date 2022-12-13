import { SearchRequest } from 'types/search/SearchRequest';

export interface ShowsSearchPreRequest {
  example: string;
}

export interface DetailRequest {
  start_date: string;
  end_date: string;
  inventory_ids?: string;
  rsp_fields_set: string;
  seats?: string;
  apiUrl: string;
}

export type ShowsSearchRequest = SearchRequest;
