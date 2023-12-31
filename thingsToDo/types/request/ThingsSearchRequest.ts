/* eslint-disable @typescript-eslint/no-empty-interface */
import { SearchRequest } from 'types/search/SearchRequest';

export interface ThingsSearchRequest extends SearchRequest {
  min_rating?: string;
  max_rating?: string | string[];
}
