/* eslint-disable prettier/prettier */
import {
  ShowsAndEventsActionTypes,
  iShowsAndEventsActionStateType,
} from './types';
import { ShowsSearchResponse as iShowAndEventsResult } from 'showsAndEvents/types/response/ShowsSearchResponse';

interface iActionReturnShowsAndEventsType
  extends iShowsAndEventsActionStateType {
  type: string;
}

export const updateShowsAndEvents = (
  showsAndEvents: iShowAndEventsResult[],
): iActionReturnShowsAndEventsType => ({
  type: ShowsAndEventsActionTypes.SET_FILTERED_SHOWS_AND_EVENTS,
  loading: false,
  showsAndEvents,
  error: false,
});

export const updateShowsAndEventsFilters = (
  filters: any,
): iActionReturnShowsAndEventsType => ({
  type: ShowsAndEventsActionTypes.SET_FILTERS,
  loading: false,
  filters,
  error: false,
});

// TODO: implementss for detail view
// export const detail = (id: number, detailParams: HotelDetailPreRequest): AppThunk =>
//   async (dispatch) => {
//     try {
//       const { data: hotel } = await getDetail(id, detailParams);
//       dispatch({
//         type: 'SET_DETAIL',
//         payload: hotel,
//       });
//     } catch (err: any) {
//       console.error(
//         `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
//       );
//     }
//   };
