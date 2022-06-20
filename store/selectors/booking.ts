/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux';

export const getBooking = (state: any) => {
  return state.booking;
};

export const getStoreBookingId = () =>
  useSelector((state: any) => state.bookingStore.booking);
