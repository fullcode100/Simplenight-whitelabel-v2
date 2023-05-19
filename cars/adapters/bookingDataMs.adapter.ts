import { CarBookingResponseMs } from 'cars/types/response/CarBookingResponseMs';
import { Car } from 'cars/types/response/CarSearchResponse';
import dayjs from 'dayjs';

export const bookingDataMsAdapter = (res: CarBookingResponseMs): any => {
  const data = res.Data;
  const vehicle = data.Vehicle;

  const bookingData: Car = {
    company_short_name: data.Vendor?.Name || '',
    company_picture: {
      png_url: data.Vendor?.VendorPictureURL || '',
      svg_url: data.Vendor?.VendorPictureURL || '',
    },
    remarks: '0,0',
    address_line: '',
    availability_status: '',
    car_model: vehicle.Model.Name,
    picture_url: vehicle.PictureURL,
    rate: {
      totalAmount: data.Charges.Amount,
      estimatedTotalAmount: data.Charges.Amount,
      currencyCode: data.Charges.Currency,
    },
    fuel_policy: vehicle.FuelType,
    transmission_type: vehicle.TransmissionType,
    passenger_quantity: vehicle.PassengerQuantity,
    baggage_quantity: vehicle.BaggageQuantity,
    door_count: vehicle.DoorCount,
    air_condition_ind: vehicle.AirConditionInd === 'true',
  };

  const pickUpDateTime = dayjs(data.Locations.PickUp.DateTime);
  const returnDateTime = dayjs(data.Locations.Return.DateTime);
  const duration = returnDateTime.diff(pickUpDateTime, 'day');
  return {
    ...bookingData,
    supplier_order_number: data.Confirmation,
    duration: duration + 1,
    start_date: data.Locations.PickUp.DateTime,
    end_date: data.Locations.Return.DateTime,
    pickup_name: data.Locations.PickUp.Name,
    return_name: data.Locations.Return.Name,
  };
};
