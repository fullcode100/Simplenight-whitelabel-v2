import { Car } from 'cars/types/response/SearchResponse';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';

export interface CarCartItemData {
  booking_data: BookingData;
  custumer?: any;
  country?: string;
  cart_id: string;
  cart_item_id: string;
  category: string;
  inventory_id?: string;
  quantity: number;
  search: CarSearchRequest;
  car: Car;
  status: string;
  sector: string;
  rate?: {
    total: {
      prepaid: {
        amount: number;
        currency: string;
      };
    };
  };
}

export interface BookingData {
  rate: {
    totalAmount: number;
    currencyCode: string;
    estimatedTotalAmount: number;
  };
  endDate: string;
  remarks: string;
  duration: number;
  end_date: string;
  car_model: string;
  reference: {
    identification: string;
    secondary_identification: string;
  };
  startDate: string;
  door_count: number;
  start_date: string;
  fuel_policy: string;
  pickup_name: string;
  picture_url: string;
  return_name: string;
  address_line: string;
  inventory_id: string;
  location_code: string;
  company_picture: {
    png_url: string;
    svg_url: string;
  };
  baggage_quantity: number;
  air_condition_ind: boolean;
  transmission_type: string;
  company_short_name: string;
  passenger_quantity: number;
  availability_status: string;
}
