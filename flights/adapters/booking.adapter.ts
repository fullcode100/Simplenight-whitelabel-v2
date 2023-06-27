import dayjs from 'dayjs';
import { IPassenger } from 'flights/components/passenger/inputs';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { Customer } from 'hooks/checkout/useCustomer';
import valid from 'card-validator';

interface IBookingAdapter {
  customer: Customer | null;
  paymentFormData?: {
    creditCardName: string;
    creditCardNumber: string;
    creditCardExpiration: string;
    creditCardCVV: string;
  };
  flights: FlightItem[];
  flightpassengers: IPassenger[];
  apiUrl: string;
}

type CreditCardTypes = keyof typeof creditCardTypeCodeMap;

const creditCardTypeCodeMap = {
  visa: 'VI',
  'american-express': 'AX',
  // '': 'BC', (BC Card)
  mastercard: 'CA',
  // '': 'CB', (Carte Blanche)
  unionpay: 'CU',
  discover: 'DS',
  'diners-club': 'DC',
  // '': 'T', (Carta Si)
  // '': 'R', (Carte Bleue)
  // '': 'N', (Dankort)
  // '': 'L', (Delta)
  // '': 'E', (Electron)
  jcb: 'JC', // Japan Credit Bureau
  maestro: 'TO',
  // '': 'S', (S	Switch)
  // '': 'EC', (EC	Electronic Cash)
  // '': 'EU', (EU	EuroCard)
  // '': 'TP', (Universal air travel card)
  // '': 'OP', (optima)
  // '': 'ER', (Air Canada/RnRoute)
  // '': 'XS', (Access)
  others: 'O',
};

export const bookingAdapter = ({
  customer,
  paymentFormData,
  flights,
  flightpassengers,
  apiUrl,
}: IBookingAdapter): any => {
  const totalFlights = flights.length;
  let adultsCount = 0;
  let noAdultsCount = 0;
  const passengers = flightpassengers.map((passenger) => {
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
      phoneNumber: customer
        ? `${customer.phone_prefix}${customer.phone_number}`
        : '',
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
    const cardData = valid.number(creditCardNumber);
    let cardType = '';
    if (cardData.isPotentiallyValid && cardData.card) {
      cardType = cardData.card.type;
    }
    const vendorCode =
      creditCardTypeCodeMap[cardType as CreditCardTypes] ||
      creditCardTypeCodeMap.others;
    bookingParameters.creditCardInfo = {
      /* TODO: remove hardcoded data */
      name: creditCardName,
      vendorCode,
      cardNumber: creditCardNumber,
      securityId: creditCardCVV,
      expiryDate: creditCardExpiration.replace('/', ''),
    };
    return bookingParameters;
  }

  const { creditCardInfo, ...data } = bookingParameters;

  return data;
};
