import { StringGeolocation } from 'types/search/Geolocation';

export interface CarSearchResponse {
  items: Car[];
}

export interface Car {
  company_short_name: string;
  company_picture: CompanyPicture;
  remarks: StringGeolocation;
  address_line: string;
  availability_status: string;
  car_model: string;
  picture_url: string;
  rate: {
    totalAmount: string;
    estimatedTotalAmount: string;
    currencyCode: string;
  };
  fuel_policy: string;
  transmission_type: string;
  passenger_quantity: string;
  baggage_quantity: string;
  door_count: string;
  startDate?: string;
  endDate?: string;
  air_condition_ind: boolean;
}

export interface CompanyPicture {
  png_url: string;
  svg_url: string;
}

export type CarItem = Car;
