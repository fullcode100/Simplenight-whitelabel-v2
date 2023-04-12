/* eslint-disable camelcase */
import { i18n } from 'i18next';
import { Item, UpdateCartRequest } from 'types/cart/CartType';
import { ClientCartItemAdder } from '../ClientCartItemAdder';
import { ClientCartGetter } from '../ClientCartGetter';
import { ClientCartRemover } from '../ClientCartItemRemover';
import { ClientCartUpdate } from '../ClientCartUpdate';
import { ClientCartSchema } from '../ClientCartSchema';
import dayjs from 'dayjs';
import { ClientCartItemUpdater } from '../ClientCartItemUpdater';
import { BookingAnswer } from 'thingsToDo/types/request/ThingsCartRequest';
import { ClientCartDelete } from '../ClientCartDelete';
import { hasCartMode } from 'helpers/purchaseModeUtils';

const cartOption = {
  name: 'cart',
  value: 'cart',
};

export const addToCart = async (itemToAdd: Item, i18next: i18n) => {
  let cartId = null;
  const cartMode = hasCartMode();
  const cartItemAdder = new ClientCartItemAdder(cartOption);

  if (cartMode) {
    cartId = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart') || '')
      : null;
  }
  try {
    if (cartId) {
      const item = await addToExistingCart(
        itemToAdd,
        i18next,
        cartItemAdder,
        cartId,
      );
      return item;
    }
    const item = await addToNewCart(itemToAdd, i18next, cartItemAdder);
    return item;
  } catch (error) {
    console.error(error);
  }
};

const addToNewCart = async (
  itemToAdd: Item,
  i18next: i18n,
  cartItemAdder: ClientCartItemAdder,
) => {
  const newCartRequest = {
    cart: {
      items: [itemToAdd],
    },
    url: '/carts',
  };

  const item = await cartItemAdder.request(newCartRequest, i18next, '/carts');
  const { cart } = item;
  if (cart) {
    localStorage.setItem('cart', JSON.stringify(cart.cart_id));
  }
  return item;
};

const addToExistingCart = async (
  itemToAdd: Item,
  i18next: i18n,
  cartItemAdder: ClientCartItemAdder,
  cartId: string,
) => {
  const updateCartRequest = {
    cart: itemToAdd,
    url: `/carts/${cartId}/items/`,
  };

  const item = await cartItemAdder.request(
    updateCartRequest,
    i18next,
    `/carts/${cartId}/items/`,
  );
  return item;
};

export const getCart = async (i18next: i18n) => {
  const cartId = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || '')
    : null;

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
      localStorage.removeItem('cart');
    }
  } catch (error) {
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

export const getCartAvailability = async (
  i18next: i18n,
  cartId: string | string[],
) => {
  const cartGetter = new ClientCartGetter(cartOption);
  const cartUrl = `/carts/${cartId}/availability`;
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
  } catch (error) {
    console.error(error);
  }
};

interface UpdateItemRequest {
  cartId?: string;
  itemId?: string;
  bookingAnswers?: BookingAnswer;
}

export const updateCartItem = (
  i18next: i18n,
  itemToUpdate: UpdateItemRequest,
) => {
  const { cartId, itemId } = itemToUpdate;
  const bookingAnswers = itemToUpdate.bookingAnswers ?? null;
  const cartUpdater = new ClientCartItemUpdater(cartOption);
  const cartUrl = `/carts/${cartId}/items/${itemId}`;
  const cartRequest: any = {};
  if (bookingAnswers) cartRequest.booking_answers = bookingAnswers;

  return new Promise((resolve, reject) => {
    cartUpdater
      .request(cartRequest, i18next, cartUrl)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
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

export const deleteCart = async (i18next: i18n, cartId: string) => {
  const cartDelete = new ClientCartDelete(cartOption);

  try {
    if (cartId) await cartDelete.request(cartId, i18next);

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
