import { StringGeolocation } from 'types/search/Geolocation';

export interface CarSearchResponse {
  items: Car[];
}

export interface Car {
  company_short_name: string;
  remarks: StringGeolocation;
  address_line: string;
  availability_status: string;
  car_model: string;
  picture_url: string;
  rate_total_amount: {
    '@RateTotalAmount': string;
    '@EstimatedTotalAmount': string;
    '@CurrencyCode': string;
  };
  fuel_policy: string;
  transmission_type: string;
  passenger_quantity: string;
  baggage_quantity: string;
  door_count: string;
  air_condition_ind: boolean;
}
