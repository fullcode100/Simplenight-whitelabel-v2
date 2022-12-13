import { getDetail, searchCars } from 'apiCalls/cars';
import { CarDetailPreRequest } from 'cars/types/request/CarDetailRequest';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';
import { AppThunk } from 'store';
import { CarStoreActions } from './CarStoreActions';
import * as types from './types';

const search =
  (searchParams: CarSearchRequest): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await searchCars(searchParams);
      const { cars } = data;

      dispatch({
        type: types.SET_CARS,
        payload: cars,
      });
    } catch (err: any) {
      console.error(
        `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
      );
    }
  };

const detail =
  (id: any, detailParams: CarDetailPreRequest): AppThunk =>
  async (dispatch) => {
    try {
      const { data: car } = await getDetail(id, detailParams);

      dispatch({
        type: types.SET_DETAIL,
        payload: car,
      });
    } catch (err: any) {
      console.error(
        `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
      );
    }
  };

const actions: CarStoreActions = {
  search,
  detail,
};

export default actions;
