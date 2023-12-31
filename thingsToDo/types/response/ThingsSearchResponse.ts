import { Discounts } from './ThingsDetailResponse';

export interface ThingsSearchResponse {
  items: ThingsSearchItem[];
  timezone: string;
}

export interface ThingsSearchItem {
  id: string;
  name: string;
  address: Address;
  thumbnail: string;
  rate: Rates;
  cancellation_policy: CancellationPolicy;
  extra_data: ExtraData;
  categories: Category[];
  main_category: string;
}

export interface Category {
  id: string;
  label: string;
}
export interface ExtraData {
  avg_rating: number;
  description: string;
  review_amount: number;
}
export interface Address {
  country: string;
  state: string;
  city: string;
}

export interface Total {
  full: Amount;
  net: Amount;
  postpaid: Amount;
  prepaid: Amount;
}

export interface Rates {
  discounts: Discounts;
  total: Total;
}

export interface CancellationPolicy {
  cancellation_type: string;
}

export interface Amount {
  amount: number;
  formatted: string;
  currency: string;
}
