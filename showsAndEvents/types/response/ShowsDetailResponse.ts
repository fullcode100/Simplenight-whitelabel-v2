export interface ShowDetailItem {
  id: string;
  name: string;
  main_category: string;
  extra_data: {
    starts_at: string;
  };
}

export interface ShowDetailResponse {
  data: {
    items: ShowDetailItem[];
  };
}

export interface Sector {
  title: string;
  rows: Row[];
}

export interface CancelationPolicy {
  description: string;
  cancellation_type: string;
}
export interface Row {
  booking_code_supplier: string;
  section: string;
  row: string;
  available_seats: number;
  delivery_methods: DeliveryMethod[];
  rate: Rate;
  purchasable_quantities: number[];
  cancellation_policy: CancelationPolicy;
}

export enum DeliveryMethod {
  FedexPriorityOvernight = 'FEDEX_PRIORITY_OVERNIGHT',
  FedexSecondDay = 'FEDEX_SECOND_DAY',
  FedexStandardOvernight = 'FEDEX_STANDARD_OVERNIGHT',
}

export interface Price {
  rate_type: string;
  avg_amount: AvgAmount;
  taxes: string;
  total_taxes: AvgAmount;
  total_amount: AvgAmount;
  recommended_amount: AvgAmount;
}

export interface AvgAmount {
  amount: number;
  currency: Currency;
  formatted: Formatted;
}

export enum Currency {
  Usd = 'USD',
}

export enum Formatted {
  The0 = '$0',
  The000 = '$0.00',
  The10 = '$10',
  The1000 = '$10.00',
}

export interface Rate {
  taxes: Taxes;
  fees: string;
  total: Total;
  discounts: Discounts;
}

export interface Discounts {
  amount_to_apply: AvgAmount;
  breakdown: Breakdown[];
  total_amount_before_apply: AvgAmount;
  net_amount_before_apply: AvgAmount;
  percentage_to_apply: string;
}

export interface Breakdown {
  amount: AvgAmount;
  description: string;
  percentage: number;
  source: string;
}

export interface Taxes {
  prepaid: string;
  postpaid: any[];
  full: any;
  total_postpaid: any;
}

export interface Total {
  prepaid: AvgAmount;
  postpaid: AvgAmount;
  net: AvgAmount;
  full: AvgAmount;
}
