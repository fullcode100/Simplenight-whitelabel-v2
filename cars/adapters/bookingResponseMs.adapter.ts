import dayjs from 'dayjs';
import { CarBookingResponseMs } from 'cars/types/response/CarBookingResponseMs';
import { Booking } from 'types/booking/bookingType';
import { bookingDataMsAdapter } from './bookingDataMs.adapter';

export const bookingResponseAdapter = (res: CarBookingResponseMs): Booking => {
  const data = res.Data;
  const isConfirmed = data.Status === 'CONFIRMED';
  const customer = data.Customer.Primary;
  const customerData = {
    first_name: customer.GivenName,
    last_name: customer.Surname,
    phone_number: customer.Phone.PhoneNumber,
    phone_prefix: customer.Phone.AreaCode,
    email: customer.Email,
    country: customer.Address.CountryCode,
  };
  const price = {
    amount: +data.Charges.Amount,
    formatted: `$${data.Charges.Amount}`,
    currency: data.Charges.Currency,
  };
  const booking = {
    booking_id: data.Identification,
    items: [
      {
        status: isConfirmed ? 'booked' : 'canceled',
        sector: 'car-rental',
        categoryName: 'cars',
        customer: customerData,
        is_cancellable: true,
        total: price,
        booking_data: bookingDataMsAdapter(res),
      },
    ],
    payments: [
      {
        last_four: '',
        transaction_amount: price,
        card_brand: '',
      },
    ],
    sn_order_number: data.Confirmation,
    created_at: data.CreatedDateTime,
    order_total: price,
    tax_total: {
      amount: 0,
      formatted: '$0.00',
      currency: 'USD',
    },
    tax_total_postpaid: {
      amount: 0,
      formatted: '$0.00',
      currency: 'USD',
    },
    sub_total: {
      amount: 0,
      formatted: '$0.00',
      currency: 'USD',
    },
    primary_contact: customerData,
  } as unknown as Booking;

  return booking;
};
