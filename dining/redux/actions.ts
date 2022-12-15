import { searchRestaurants } from 'apiCalls/dining';
import { DiningSearchRequest } from 'dining/types/request/DiningSearchRequest';
import { AppThunk } from 'store';
import { DiningStoreActions } from './DiningStoreActions';
import * as types from './types';

const search =
  (searchParams: DiningSearchRequest): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await searchRestaurants(searchParams);
      const { items } = data;

      dispatch({
        type: types.SET_RESTAURANTS,
        payload: items,
      });
    } catch (err: any) {
      console.error(
        `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
      );
    }
  };

const detail = () => true;

const actions: DiningStoreActions = {
  search,
  detail,
};

export default actions;
