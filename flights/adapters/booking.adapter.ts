import dayjs from 'dayjs';
import { IPassenger } from 'flights/components/passenger/inputs';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';

interface IBookingAdapter {
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
  paymentFormData,
  flights,
  passengers,
  apiUrl,
}: IBookingAdapter): any => {
  const segments = flights[0].segments.collection?.[0];
  const passenger = passengers.map((passenger, idx) => {
    return {
      id: `${idx + 1}`,
      dateOfBirth: passenger.dateOfBirth
        ? dayjs(passenger.dateOfBirth).format('DDMMMYY').toUpperCase()
        : '',
      /* TODO: we currently dont associate age band to passengers */
      code: 'ADT',
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      /* TODO: remove hardcoded into */
      phoneNumber: '817-706-9009',
      gender: passenger.gender?.[0].toUpperCase(),
    };
  });

  const bookingParameters = {
    passenger,
    segments: [
      {
        collection: [
          {
            departureAirport: segments?.departureAirport,
            departureDateTime: segments?.departureDateTime,
            arrivalAirport: segments?.arrivalAirport,
            arrivalDateTime: segments?.arrivalDateTime,
            marketingCarrier: segments?.marketingCarrier,
            marketingCarrierName: segments?.marketingCarrierName,
            marketingFlightNumber: segments?.marketingFlightNumber,
          },
        ],
      },
    ],
    offer: {
      bookingClass: flights[0].offer?.bookingClass,
    },
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
