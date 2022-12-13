import { getDetail, searchFlights } from 'apiCalls/flights';
import { FlightDetailPreRequest } from 'flights/types/request/FlightDetailRequest';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import { AppThunk } from 'store';
import { FlightStoreActions } from './FlightStoreActions';
import * as types from './types';

const search =
  (searchParams: FlightSearchRequest): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await searchFlights(searchParams);
      const { flights } = data;

      dispatch({
        type: types.SET_FLIGHTS,
        payload: flights,
      });
    } catch (err: any) {
      console.error(
        `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
      );
    }
  };

const detail =
  (id: any, detailParams: FlightDetailPreRequest): AppThunk =>
  async (dispatch) => {
    try {
      const { data: flight } = await getDetail(id, detailParams);

      dispatch({
        type: types.SET_DETAIL,
        payload: flight,
      });
    } catch (err: any) {
      console.error(
        `[Status ${err.response.status}] - [${err.response.statusText}] \n\n${err}`,
      );
    }
  };

const actions: FlightStoreActions = {
  search,
  detail,
};

export default actions;
