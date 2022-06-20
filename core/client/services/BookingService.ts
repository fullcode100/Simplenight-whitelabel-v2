import { i18n } from 'i18next';
import { CreateBookingRequest } from 'types/checkout/CreateBookingRequest';
import { ClientBookingCreator } from '../ClientBookingCreator';
import { ClientBookingGetter } from '../ClientBookingGetter';

const PAYMENT_METHOD = 'TOKEN';

const tryCreateBooking = async (
  bookingRequest: CreateBookingRequest,
  i18next: i18n,
) => {
  try {
    const clientBookingCreator = new ClientBookingCreator();
    return await clientBookingCreator.request(bookingRequest, i18next);
  } catch (error) {
    console.error(error);
  }
};

export interface PaymentParameters {
  cartId: string;
  paymentToken: string;
  countryCode: string;
}

export const createBooking = (
  paymentParameters: PaymentParameters,
  i18next: i18n,
) => {
  const { cartId, paymentToken, countryCode } = paymentParameters;
  const bookingRequest: CreateBookingRequest = {
    cart_id: cartId,
    payment_request: {
      payment_method: PAYMENT_METHOD,
      payment_token: paymentToken,
      billing_address: {
        country: countryCode,
      },
    },
  };

  return tryCreateBooking(bookingRequest, i18next);
};

export const getBookingId = async (i18next: i18n, bookingId: string) => {
  const bookingGetter = new ClientBookingGetter();
  const bookingRequest = {
    id: bookingId,
  };

  try {
    if (bookingId) {
      const response = await bookingGetter.request(bookingRequest, i18next);
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};
