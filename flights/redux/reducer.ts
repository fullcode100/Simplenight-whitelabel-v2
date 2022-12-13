import { ReduxReducerAction } from 'types/redux/ReduxReducerAction';
import initialState from './initialState';
import * as types from './types';

const flightReducer = (
  state = initialState,
  { payload, type }: ReduxReducerAction & { payload: any },
) => {
  switch (type) {
    case types.SET_FLIGHTS:
      return {
        ...state,
        flights: payload,
      };
    case types.SET_DETAIL:
      return {
        ...state,
        flight: payload,
      };

    default:
      return state;
  }
};

export default flightReducer;
