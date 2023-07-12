import { CarItem } from 'cars/types/response/CarSearchResponse';
import { dateFormatter } from 'cars/utils/dateFormatter';

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
