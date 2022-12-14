/* eslint-disable prettier/prettier */
import { getDetail } from 'apiCalls/hotels';
import { HotelDetailPreRequest } from 'hotels/types/request/HotelDetailRequest';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { Hotel } from 'hotels/types/response/SearchResponse';
import { AppThunk } from 'store';
import { HotelsActionTypes } from './types';
import { HotelCategory } from 'hotels';
import { i18n } from 'i18next';

const requestHotels = () => ({
  type: HotelsActionTypes.FETCH_REQUEST,
  loading:true,
  hotels:[],
  error:false
});

const receiveHotels = (hotels:Hotel[]) => ({
  type: HotelsActionTypes.FETCH_SUCCESS,
  loading:false,
  hotels:hotels,
  error:false
});

const invalidateHotels = () => ({
  type: HotelsActionTypes.FETCH_ERROR,
  loading:false,
  hotels:[],
  error:true
});

export const updateHotels = (hotels:Hotel[]) => ({
  type:HotelsActionTypes.SET_FILTERED_HOTELS,
  loading:false,
  hotels,
  error:false,
});

export const hotelsSetInitialState = (searchParams: HotelSearchRequest, i18next:i18n):AppThunk => 
  async (dispatch) => {
    dispatch(requestHotels());
    try {
      const { ClientSearcher: Searcher } = HotelCategory.core;
      const hotels= await Searcher?.request(searchParams, i18next);
      dispatch(receiveHotels(hotels));
    } catch (error) {
      dispatch(invalidateHotels());
    }  
  };


export const detail = (id: number, detailParams: HotelDetailPreRequest): AppThunk =>
  async (dispatch) => {
    try {
      const { data: hotel } = await getDetail(id, detailParams);
      dispatch({
        type: 'SET_DETAIL',
        payload: hotel,
      });
    } catch (err: any) {
      console.error(
        `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
      );
    }
  };
