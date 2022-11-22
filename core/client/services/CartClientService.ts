/* eslint-disable camelcase */
import { i18n } from 'i18next';
import { CartItemRequest, Item, UpdateCartRequest } from 'types/cart/CartType';
import { ClientCartItemAdder } from '../ClientCartItemAdder';
import {
  createCart,
  updateCart as updateCartAction,
  clearCart,
} from '../../../store/actions/cartActions';
import { ClientCartGetter } from '../ClientCartGetter';
import { ClientCartRemover } from '../ClientCartItemRemover';
import { ClientCartUpdate } from '../ClientCartUpdate';
import { ClientCartSchema } from '../ClientCartSchema';
import { getStoreCartId } from 'store/selectors/cart';
import dayjs from 'dayjs';

const cartOption = {
  name: 'cart',
  value: 'cart',
};

export const addToCart = async (
  itemToAdd: CartItemRequest,
  i18next: i18n,
  store: any,
) => {
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

export const getCart = async (i18next: i18n, store: any) => {
  const { state, dispatch } = store;
  const cartId = state.cartStore.cart ?? null;

  const cartGetter = new ClientCartGetter(cartOption);
  const cartUrl = `/carts/${cartId}`;
  const cartRequest = {
    id: cartId,
  };

  try {
    if (cartId) {
      const { cart } = await cartGetter.request(cartRequest, i18next, cartUrl);
      const validCart = cart && cartIsValid(cart?.items);
      if (validCart) {
        return cart && cart;
      }
      dispatch(clearCart());
      localStorage.removeItem('cart');
    }
  } catch (error) {
    dispatch(clearCart());
    localStorage.removeItem('cart');
  }
};

const cartIsValid = (items: Item[]) => {
  const lastItemIndex = items.length - 1 ?? 0;
  const lastAdded = items[lastItemIndex].created_at;
  if (dayjs(lastAdded).isBefore(dayjs().subtract(15, 'minute'))) {
    return false;
  }
  return true;
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

export const updateCart = async (
  data: UpdateCartRequest,
  cartId: string,
  i18next: i18n,
) => {
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

    return {};
  } catch (error) {
    console.error(error);
  }
};
