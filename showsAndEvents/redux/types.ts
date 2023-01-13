import { ShowsSearchResponse as iShowAndEventsResult } from 'showsAndEvents/types/response/ShowsSearchResponse';

export enum ShowsAndEventsActionTypes {
  FETCH_REQUEST = '@@showsAndEvents/FETCH_REQUEST',
  FETCH_SUCCESS = '@@showsAndEvents/FETCH_SUCCESS',
  FETCH_ERROR = '@@showsAndEvents/FETCH_ERROR',
  SET_FILTERS = '@@showsAndEvents/SET_FILTERS',
  SET_FILTERED_SHOWS_AND_EVENTS = '@@hotels/SET_FILTERED_SHOWS_AND_EVENTS',
}

export interface iShowsAndEventsActionStateType {
  loading: boolean;
  showsAndEvents?: iShowAndEventsResult[];
  filteredShowsAndEvents?: iShowAndEventsResult[];
  filters?: {
    minPrice?: number;
    maxPrice?: number;
    minDistance?: number;
    maxDistance?: number;
    minSeats?: number;
    maxSeats?: number;
  };
  error: boolean;
}
