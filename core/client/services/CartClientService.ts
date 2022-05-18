import { i18n } from 'i18next';
import { Item } from 'types/cart/CartType';
import { ClientCartItemAdder } from '../ClientCartItemAdder';
import { createCart, updateCart } from '../../../store/actions/cartActions';
import { ClientCartGetter } from '../ClientCartGetter';

const cartOption = {
  name: 'cart',
  value: 'cart',
};

export const addToCart = async (itemToAdd: Item, i18next: i18n, store: any) => {
  const { state, dispatch } = store;
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
      const { item } = await cartItemAdder.request(
        updateCartRequest,
        i18next,
        cartUrl,
      );
      if (item) {
        dispatch(updateCart(item));
      }
      return item;
    }
    const { cart } = await cartItemAdder.request(
      newCartRequest,
      i18next,
      cartUrl,
    );
    if (cart) {
      dispatch(createCart(cart));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCart = async (i18next: i18n, state: any) => {
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
  } catch (error) {
    console.error(error);
  }
};
