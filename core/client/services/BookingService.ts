import dayjs from 'dayjs';
import i18next, { i18n } from 'i18next';
import { CreateBookingRequest } from 'types/checkout/CreateBookingRequest';
import { CancelBookingRequest } from 'types/confirmation/DeleteBookingRequest';
import { ClientBookingCancel } from '../ClientBookingCancel';
import { ClientBookingCreator } from '../ClientBookingCreator';
import { ClientBookingGetter } from '../ClientBookingGetter';
import { ClientBookingsGetter } from '../ClientBookingsGetter';

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
  const customerTimeCreatedAt = dayjs().format();
  const bookingRequest: CreateBookingRequest = {
    cart_id: cartId,
    customer_time_created_at: customerTimeCreatedAt,
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

export const getBookingByOrderNumber = async (
  i18next: i18n,
  snOrderNumber: string,
  customerLastName: string,
) => {
  const bookingsGetter = new ClientBookingsGetter();
  const bookingRequest = {
    snOrderNumber,
    customerLastName,
  };

  try {
    const { booking } = await bookingsGetter.request(bookingRequest, i18next);
    return booking;
  } catch (error) {
    console.log(error);
  }
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

export const cancelBooking = async (i18next: i18n, bookingId: string) => {
  const bookingCancel = new ClientBookingCancel();
  const requestData: CancelBookingRequest = {
    bookingId,
  };

  try {
    await bookingCancel.request(requestData, i18next);
  } catch (error) {
    console.error(error);
  }
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
