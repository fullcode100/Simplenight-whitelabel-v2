/* eslint indent: off */
import { AppThunk } from '..';
import * as types from '../reducers/cart/cartTypes';
import { CartObjectResponse } from '../../types/cart/CartType';

export const createCart =
  (cart: CartObjectResponse): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: types.CREATE_CART,
      payload: {
        cart,
      },
    });
  };
