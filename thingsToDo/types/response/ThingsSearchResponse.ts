export interface ThingsSearchResponse {
  items: ThingsSearchItem[];
}

export interface ThingsSearchItem {
  id: string;
  name: string;
  address: Address;
  thumbnail: string;
  rates: Rates;
  cancellation_policy: CancellationPolicy;
}
export interface Address {
  country: string;
  state: string;
  city: string;
}

export interface Total {
  amount: number;
  formatted: string;
  currency: string;
}

export interface Rates {
  total: Total;
}

export interface CancellationPolicy {
  cancellation_type: string;
}
