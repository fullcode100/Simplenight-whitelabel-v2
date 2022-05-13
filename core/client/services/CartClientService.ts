import { i18n } from 'i18next';
import { Item } from 'types/cart/CartType';
import { ClientCartItemAdder } from '../ClientCartItemAdder';
import { store } from 'store';
import { createCart } from '../../../store/actions/cartActions';
import { ClientCartGetter } from '../ClientCartGetter';

const cartOption = {
  name: 'cart',
  value: 'cart',
};

export const addToCart = async (itemToAdd: Item, i18next: i18n) => {
  const state = await store.getState();
  const cartId = state.cartStore.cart.cart?.cart_id ?? null;

  const cartItemAdder = new ClientCartItemAdder(cartOption);
  let cartUrl = '/carts';
  const newCartRequest = {
    cart: {
      items: [itemToAdd],
    },
    url: cartUrl,
  };
  const updateCartRequest = {
    cart: itemToAdd,
    url: cartUrl,
  };

  try {
    if (cartId) {
      cartUrl = `/carts/${cartId}/items/`;
      updateCartRequest.url = cartUrl;
      const data = await cartItemAdder.request(
        updateCartRequest,
        i18next,
        cartUrl,
      );
      return data;
    }

    const { cart } = await cartItemAdder.request(
      newCartRequest,
      i18next,
      cartUrl,
    );
    store.dispatch(createCart(cart));
  } catch (error) {
    console.error(error);
  }
};

export const getCart = async (i18next: i18n) => {
  const state = await store.getState();
  const cartId = state.cartStore.cart.cart?.cart_id ?? null;

  const cartGetter = new ClientCartGetter(cartOption);
  const cartUrl = `/carts/${cartId}`;
  const cartRequest = {
    id: cartId,
  };

  try {
    if (cartId) {
      const { cart } = await cartGetter.request(cartRequest, i18next, cartUrl);
      return cart;
    }

    return {};
  } catch (error) {
    console.error(error);
  }
};
