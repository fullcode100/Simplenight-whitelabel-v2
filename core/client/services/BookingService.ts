import { i18n } from 'i18next';
import { CreateBookingRequest } from 'types/checkout/CreateBookingRequest';
import { ClientBookingCreator } from '../ClientBookingCreator';

const PAYMENT_METHOD = 'TOKEN';

const tryCreateBooking = async (
  bookingRequest: CreateBookingRequest,
  i18next: i18n,
) => {
  try {
    const clientBookingCreator = new ClientBookingCreator();
    await clientBookingCreator.request(bookingRequest, i18next);
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

  tryCreateBooking(bookingRequest, i18next);
};
