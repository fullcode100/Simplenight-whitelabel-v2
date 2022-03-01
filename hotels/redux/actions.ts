import { searchHotels } from 'apiCalls/hotels';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import Error from 'next/error';
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

const actions: HotelStoreActions = {
  search,
};

export default actions;
