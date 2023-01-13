/* eslint-disable prettier/prettier */
import { AppThunk } from 'store';
import { ShowsAndEventsActionTypes, iShowsAndEventsActionStateType } from './types';
import { ShowsSearchResponse as iShowAndEventsResult } from 'showsAndEvents/types/response/ShowsSearchResponse';
import { ShowsAndEventsCategory } from 'showsAndEvents';
import { i18n } from 'i18next';
import { ShowsSearchRequest } from 'showsAndEvents/types/request/ShowsSearchRequest';

interface iActionReturnShowsAndEventsType extends iShowsAndEventsActionStateType {
  type: string;
}

const requestShowsAndEvents = (): iActionReturnShowsAndEventsType => ({
  type: ShowsAndEventsActionTypes.FETCH_REQUEST,
  loading:true,
  showsAndEvents:[],
  error:false
});

const receiveShowsAndEvents = (showsAndEvents:iShowAndEventsResult[]): iActionReturnShowsAndEventsType => ({
  type: ShowsAndEventsActionTypes.FETCH_SUCCESS,
  loading:false,
  showsAndEvents,
  error:false
});

const invalidateShowsAndEvents = (): iActionReturnShowsAndEventsType => ({
  type: ShowsAndEventsActionTypes.FETCH_ERROR,
  loading:false,
  showsAndEvents:[],
  error:true
});

export const updateShowsAndEvents = (showsAndEvents:iShowAndEventsResult[]): iActionReturnShowsAndEventsType => ({
  type:ShowsAndEventsActionTypes.SET_FILTERED_SHOWS_AND_EVENTS,
  loading:false,
  showsAndEvents,
  error:false,
});

export const updateShowsAndEventsFilters = (filters: any): iActionReturnShowsAndEventsType => ({
  type:ShowsAndEventsActionTypes.SET_FILTERS,
  loading:false,
  filters,
  error:false,
});

export const showsAndEventsSetInitialState = (searchParams: ShowsSearchRequest, i18next:i18n):AppThunk => 
  async (dispatch) => {
    dispatch(requestShowsAndEvents());
    try {
      const { ClientSearcher: Searcher } = ShowsAndEventsCategory.core;
      if (Searcher) {
        const {items} = await Searcher.request(searchParams, i18next);
        dispatch(receiveShowsAndEvents(items));
      }
    } catch (error) {
      dispatch(invalidateShowsAndEvents());
    }  
  };

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
