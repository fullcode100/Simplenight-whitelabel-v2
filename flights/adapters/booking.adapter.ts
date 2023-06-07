import dayjs from 'dayjs';
import { IPassenger } from 'flights/components/passenger/inputs';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { Customer } from 'hooks/checkout/useCustomer';

interface IBookingAdapter {
  customer: Customer | null;
  paymentFormData?: {
    creditCardName: string;
    creditCardNumber: string;
    creditCardExpiration: string;
    creditCardCVV: string;
  };
  flights: FlightItem[];
  passengers: IPassenger[];
  apiUrl: string;
}

export const bookingAdapter = ({
  customer,
  paymentFormData,
  flights,
  passengers,
  apiUrl,
}: IBookingAdapter): any => {
  const totalFlights = flights.length;
  let adultsCount = 0;
  let noAdultsCount = 0;
  const passengers = passengers.map((passenger) => {
    let finalId = '';
    if (passenger.passengerType === 'ADT') {
      adultsCount++;
      finalId = `${adultsCount}`;
    } else {
      noAdultsCount++;
      finalId = `${noAdultsCount}.1`;
    }
    return {
      id: finalId,
      dateOfBirth: passenger.dateOfBirth
        ? dayjs(passenger.dateOfBirth).format('DDMMMYY').toUpperCase()
        : '',
      code: passenger.passengerType,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      /* TODO: remove hardcoded into */
      phoneNumber: '817-706-9009',
      gender: passenger.gender?.[0].toUpperCase(),
    };
  });

  const bookingParameters = {
    customer,
    passengers,
    segments: flights.map((item) => {
      const { collection } = item.segments;
      return { collection };
    }),
    offer: { ...flights[totalFlights - 1].offer },
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
