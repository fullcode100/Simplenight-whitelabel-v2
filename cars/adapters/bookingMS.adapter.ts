import { CarItem } from 'cars/types/response/CarSearchResponse';

interface BookingMSAdapter {
  car: CarItem;
  customerData: any;
  paymentFormData: any;
  search: any;
  apiUrl: string;
}

export const bookingMSAdapter = ({
  car,
  customerData,
  paymentFormData,
  search,
  apiUrl,
}: BookingMSAdapter) => {
  const dateFormatter = (date: string, time: string) => {
    const DateToFormatt = date;
    const Time = time.split(/:|\s/);
    const Hour = Time[2] === 'AM' ? +Time[0] : +Time[0] + 12;
    const Minute = +Time[1];
    const DateForFormat = new Date(DateToFormatt + 'T00:00:00Z');
    DateForFormat.setUTCHours(Hour, Minute, 0);
    return DateForFormat.toISOString();
  };

  const formattedStartDate = dateFormatter(search.startDate, search.startTime);

  const formattedEndDate = dateFormatter(search.endDate, search.endTime);

  const bookingParameters = {
    Data: {
      Supplier: 14,
      Currency: car.rate.currencyCode,
      Customer: {
        Primary: {
          Prefix: 'Mrs',
          GivenName: customerData.first_name,
          Surname: customerData.last_name,
          Phone: {
            AreaCode: customerData.phone_prefix,
            PhoneNumber: customerData.phone_number.slice(-10),
          },
          Email: customerData.email,
          Address: {
            AddressLine: paymentFormData.address1,
            CountryCode: customerData.country,
          },
          Citizenship: customerData.country,
        },
      },
      Locations: {
        PickUp: {
          Identification: 'MIA',
          DateTime: formattedStartDate,
          Context: 'IATA',
        },
        Return: {
          Identification: 'MIA',
          DateTime: formattedEndDate,
          Context: 'IATA',
        },
      },
      Pax: car.baggage_quantity,
      DriverAge: search.driverAge,
      Reference: {
        Identification: car.reference?.identification,
        SecondaryIdentification: car.reference?.secondary_identification,
      },
    },
    apiUrl,
  };

  return bookingParameters;
};
