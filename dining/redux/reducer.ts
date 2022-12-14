import { ReduxReducerAction } from 'types/redux/ReduxReducerAction';
import initialState from './initialState';
import * as types from './types';

const diningReducer = (
  state = initialState,
  { payload, type }: ReduxReducerAction & { payload: any },
) => {
  switch (type) {
    case types.SET_RESTAURANTS:
      return {
        ...state,
        items: payload,
      };
    default:
      return state;
  }
};

export default diningReducer;
