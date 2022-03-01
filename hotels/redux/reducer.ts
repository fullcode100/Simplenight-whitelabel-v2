import { ReduxReducerAction } from 'types/redux/ReduxReducerAction';
import initialState from './initialState';
import * as types from './types';

const hotelReducer = (
  state = initialState,
  { payload, type }: ReduxReducerAction & { payload: any },
) => {
  switch (type) {
    case types.SET_HOTELS:
      return {
        ...state,
        hotels: payload,
      };

    default:
      return state;
  }
};

export default hotelReducer;
