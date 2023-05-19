import dayjs from 'dayjs';
import i18next, { i18n } from 'i18next';
import { CreateBookingRequest } from 'types/checkout/CreateBookingRequest';
import { CancelBookingRequest } from 'types/confirmation/DeleteBookingRequest';
import { ClientBookingCancel } from '../ClientBookingCancel';
import { ClientBookingCreator } from '../ClientBookingCreator';
import { ClientBookingGetter } from '../ClientBookingGetter';
import { ClientBookingsGetter } from '../ClientBookingsGetter';
import { ClientBookingValidator } from '../ClientBookingValidator';

const PAYMENT_METHOD = 'TOKEN';

const tryCreateBooking = async (
  bookingRequest: CreateBookingRequest,
  i18next: i18n,
) => {
  const clientBookingCreator = new ClientBookingCreator();
  return await clientBookingCreator.request(bookingRequest, i18next);
};

export interface PaymentParameters {
  cartId: string;
  paymentToken: string;
  verificationToken: string;
  countryCode: string;
  expediaProd?: boolean;
}

export const createBooking = (paymentParameters: any, i18next: i18n) => {
  const customerTimeCreatedAt = dayjs().format();

  const bookingRequest: CreateBookingRequest = {
    ...paymentParameters,
    customer_time_created_at: customerTimeCreatedAt,
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

export const getBookingId = async (
  i18next: i18n,
  bookingId: string,
  apiUrl?: string,
) => {
  const bookingGetter = new ClientBookingGetter();
  const bookingRequest = {
    id: bookingId,
    apiUrl,
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

export const cancelBooking = async (
  i18next: i18n,
  bookingId: string,
  apiUrl?: string,
) => {
  const bookingCancel = new ClientBookingCancel();
  const requestData: CancelBookingRequest = {
    bookingId,
    apiUrl,
  };

  try {
    await bookingCancel.request(requestData, i18next);
  } catch (error) {
    console.error(error);
  }
};

const tryValidateBooking = async (
  bookingRequest: CreateBookingRequest,
  i18next: i18n,
) => {
  const clientBookingCreator = new ClientBookingValidator();
  return await clientBookingCreator.request(bookingRequest, i18next);
};

export const validateBooking = (paymentParameters: any, i18next: i18n) => {
  const bookingRequest: CreateBookingRequest = {
    ...paymentParameters,
  };

  return tryValidateBooking(bookingRequest, i18next);
};
