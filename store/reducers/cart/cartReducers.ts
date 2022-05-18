/* eslint indent: off */
import { ReduxReducerAction } from '../../../types/redux/ReduxReducerAction';
import initialState from './initialState';
import * as types from './cartTypes';

const cartReducer = (
  state = initialState,
  { payload, type }: ReduxReducerAction & { payload: any },
) => {
  switch (type) {
    case types.CREATE_CART:
      return {
        ...state,
        cart: payload,
      };

    case types.UPDATE_CART:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default cartReducer;
