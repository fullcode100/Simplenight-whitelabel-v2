import { ReduxReducerAction } from 'types/redux/ReduxReducerAction';
import initialState from './initialState';
import * as types from './types';

const carReducer = (
  state = initialState,
  { payload, type }: ReduxReducerAction & { payload: any },
) => {
  switch (type) {
    case types.SET_CARS:
      return {
        ...state,
        cars: payload,
      };
    case types.SET_DETAIL:
      return {
        ...state,
        car: payload,
      };

    default:
      return state;
  }
};

export default carReducer;
