/* eslint-disable camelcase */
import { i18n } from 'i18next';
import { Item, UpdateCartRequest } from 'types/cart/CartType';
import { ClientCartItemAdder } from '../ClientCartItemAdder';
import {
  createCart,
  updateCart as updateCartAction,
} from '../../../store/actions/cartActions';
import { ClientCartGetter } from '../ClientCartGetter';
import { ClientCartRemover } from '../ClientCartItemRemover';
import { ClientCartUpdate } from '../ClientCartUpdate';
import { ClientCartSchema } from '../ClientCartSchema';
import { getStoreCartId } from 'store/selectors/cart';

const cartOption = {
  name: 'cart',
  value: 'cart',
};

export const addToCart = async (itemToAdd: Item, i18next: i18n, store: any) => {
  const { state, dispatch } = store;
  const cartId = state.cartStore.cart ?? null;
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
      const item = await cartItemAdder.request(
        updateCartRequest,
        i18next,
        cartUrl,
      );
      if (item) {
        dispatch(updateCartAction());
      }
      return item;
    }
    const { cart } = await cartItemAdder.request(
      newCartRequest,
      i18next,
      cartUrl,
    );
    if (cart) {
      dispatch(createCart(cart.cart_id));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCart = async (i18next: i18n, state: any) => {
  const cartId = state.cartStore.cart ?? null;

  const cartGetter = new ClientCartGetter(cartOption);
  const cartUrl = `/carts/${cartId}`;
  const cartRequest = {
    id: cartId,
  };

  try {
    if (cartId) {
      const { cart } = await cartGetter.request(cartRequest, i18next, cartUrl);
      return cart && cart;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCartId = async (i18next: i18n, cartId: string | string[]) => {
  const cartGetter = new ClientCartGetter(cartOption);
  const cartUrl = `/carts/${cartId}`;
  const cartRequest = {
    id: cartId,
  };

  try {
    if (cartId) {
      const { cart } = await cartGetter.request(cartRequest, i18next, cartUrl);
      return cart && cart;
    }
  } catch (error) {
    console.error(error);
  }
};

interface RemoveItemRequest {
  cartId?: string;
  itemId?: string;
}

export const removeFromCart = async (
  i18next: i18n,
  itemToRemove: RemoveItemRequest,
  dispatch: any,
) => {
  const { cartId, itemId } = itemToRemove;
  const cartRemover = new ClientCartRemover(cartOption);
  const cartUrl = `/carts/${cartId}/items/${itemId}`;
  const cartRequest = {
    cart_id: cartId,
    item_id: itemId,
  };

  try {
    await cartRemover.request(cartRequest, i18next, cartUrl);
    dispatch(updateCartAction());
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = async (data: UpdateCartRequest, i18next: i18n) => {
  const cartId = getStoreCartId() ?? null;
  const cartUpdate = new ClientCartUpdate(cartOption);

  try {
    if (cartId) await cartUpdate.request(data, i18next, cartId);

    return {};
  } catch (error) {
    console.error(error);
  }
};

export const getCartSchema = async (
  i18next: i18n,
  cartId: string | string[],
) => {
  const cartGetter = new ClientCartSchema(cartOption);

  try {
    if (cartId) {
      const { form_schema } = await cartGetter.request({}, i18next, cartId);
      return form_schema;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCartId = async (i18next: i18n, cartId: string | string[]) => {
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

interface RemoveItemRequest {
  cartId: string;
  itemId: string;
}

export const removeFromCart = async (
  i18next: i18n,
  itemToRemove: RemoveItemRequest,
  dispatch: any,
) => {
  const { cartId, itemId } = itemToRemove;
  const cartRemover = new ClientCartRemover(cartOption);
  const cartUrl = `/carts/${cartId}/items/${itemId}`;
  const cartRequest = {
    cart_id: cartId,
    item_id: itemId,
  };

  try {
    await cartRemover.request(cartRequest, i18next, cartUrl);
    dispatch(updateCartAction());
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = async (
  data: UpdateCartRequest,
  i18next: i18n,
  store: any,
) => {
  const state = await store.getState();
  const cartId = state.cartStore.cart.cart?.cart_id ?? null;
  const cartUpdate = new ClientCartUpdate(cartOption);

  try {
    if (cartId) await cartUpdate.request(data, i18next, cartId);

    return {};
  } catch (error) {
    console.error(error);
  }
};
