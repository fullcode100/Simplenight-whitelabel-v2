import { Car } from 'cars/types/response/CarSearchResponse';
import dayjs from 'dayjs';
import { formatAsDateAndTime } from 'helpers/dajjsUtils';
import { Search } from 'hooks/cars/useSearchStore';

export const carBookingItemAdapter = (car: Car, search: Search): any => {
  const startDateTime = formatAsDateAndTime(search.startDate, search.startTime);
  const endDateTime = formatAsDateAndTime(search.endDate, search.endTime);
  const pickUpDateTime = dayjs(startDateTime);
  const returnDateTime = dayjs(endDateTime);
  const duration = returnDateTime.diff(pickUpDateTime, 'day');
  const bookingExtraData = {
    ...car,
    duration: duration + 1,
    start_date: startDateTime,
    end_date: endDateTime,
    pickup_name: search.address,
    return_name: search.address,
  };

  return {
    sector: 'car-rental',
    categoryName: 'cars',
    total: {
      amount: +car.rate.totalAmount,
      formatted: `$${car.rate.totalAmount}`,
      currency: car.rate.currencyCode,
    },
    booking_data: bookingExtraData,
  };
};
