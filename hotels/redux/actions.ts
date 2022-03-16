import { getDetail, searchHotels } from 'apiCalls/hotels';
import { HotelDetailRequest } from 'hotels/types/request/HotelDetailRequest';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { AppThunk } from 'store';
import { HotelStoreActions } from './HotelStoreActions';
import * as types from './types';

const search =
  (searchParams: HotelSearchRequest): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await searchHotels(searchParams);
      const { hotels } = data;

      dispatch({
        type: types.SET_HOTELS,
        payload: hotels,
      });
    } catch (err: any) {
      console.error(
        `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
      );
    }
  };

const detail =
  (id: any, detailParams: HotelDetailRequest): AppThunk =>
  async (dispatch) => {
    try {
      const { data: hotel } = await getDetail(id, detailParams);

      dispatch({
        type: types.SET_DETAIL,
        payload: hotel,
      });
    } catch (err: any) {
      console.error(
        `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
      );
    }
  };

const actions: HotelStoreActions = {
  search,
  detail,
};

export default actions;
