/* eslint indent: off */
import { AppThunk } from '..';
import * as types from '../reducers/cart/cartTypes';

export const createCart =
  (cartProp: string): AppThunk =>
  async (dispatch) => {
    let cart = '';
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart') || '');
    } else {
      cart = cartProp;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: types.CREATE_CART,
      payload: cart,
    });
  };

export const updateCart = () => async (dispatch: any) => {
  dispatch({
    type: types.UPDATE_CART,
    payload: {},
  });
};

export const clearCart = () => async (dispatch: any) => {
  dispatch({
    type: types.CLEAR_CART,
    payload: {},
  });
};
