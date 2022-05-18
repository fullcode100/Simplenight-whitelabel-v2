/* eslint indent: off */
import { AppThunk } from '..';
import * as types from '../reducers/cart/cartTypes';
import { CartObjectResponse, Item } from '../../types/cart/CartType';

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

export const updateCart = () => async (dispatch: any) => {
  dispatch({
    type: types.UPDATE_CART,
    payload: {},
  });
};
