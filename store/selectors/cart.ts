/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux';

export const getCart = (state: any) => {
  return state.cart;
};

export const getStoreCartId = () =>
  useSelector((state: any) => state.cartStore.cart);
