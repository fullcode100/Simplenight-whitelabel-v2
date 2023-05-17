import dayjs from 'dayjs';
import { CarItem } from 'cars/types/response/CarSearchResponse';

interface IBookingAdapter {
  paymentFormData?: {
    creditCardName: string;
    creditCardNumber: string;
    creditCardExpiration: string;
    creditCardCVV: string;
  };
  car: CarItem;
  apiUrl: string;
}

export const bookingAdapter = ({
  paymentFormData,
  car,
  apiUrl,
}: IBookingAdapter): any => {
  const bookingParameters = {
    car,
    creditCardInfo: {},
    apiUrl,
  };

  if (paymentFormData) {
    const {
      creditCardName,
      creditCardNumber,
      creditCardExpiration,
      creditCardCVV,
    } = paymentFormData;
    bookingParameters.creditCardInfo = {
      /* TODO: remove hardcoded data */
      name: creditCardName,
      vendorCode: 'CA',
      cardNumber: creditCardNumber,
      securityId: creditCardCVV,
      expiryDate: creditCardExpiration.replace('/', ''),
    };
    return bookingParameters;
  }

  const { creditCardInfo, ...data } = bookingParameters;

  return data;
};
