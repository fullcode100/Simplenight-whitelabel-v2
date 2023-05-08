import { Car } from '../response/CarSearchResponse';

export interface CarSearchResponse {
  items: CarSearchItem[];
}

export interface CarSearchItem extends Car {
  rate_total_amount: {
    '@RateTotalAmount': string;
    '@EstimatedTotalAmount': string;
    '@CurrencyCode': string;
  };
}
