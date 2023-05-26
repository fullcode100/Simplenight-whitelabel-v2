export interface TransportationSearchResponse {
  echo_request: TransportationEchoRequest;
  status_code: number;
  data: TransportationData;
  total_qty: number;
  timestamp: string;
}

export interface TransportationEchoRequest {
  pickup_datetime: string;
  pickup_context: string;
  pickup_location: string;
  return_context: string;
  return_location: string;
  currency: string;
  include_return_trip: string;
  passenger_count: string;
  from_description: string;
  to_description: string;
  correlation_id: string;
  user_ip: string;
  user_agent: string;
  sandbox_mode: boolean;
}

export interface TransportationData {
  items: TransportationItem[][];
}

export interface TransportationItem {
  quote_id: string;
  quote_request_id: string;
  book_url: string;
  category: string;
  rate: TransportationRate;
  cancellation_policy: CancellationPolicy[];
  extra_data: ExtraData;
}

export interface TransportationRate {
  taxes: TransportationTaxes;
  fees: any; // TODO: Change it
  total: TransportationTotal;
  discounts: Discounts;
}

export interface TransportationTaxes {
  prepaid: any[];
  postpaid: any[];
  full: any; // TODO: Change it
  total_postpaid: any; // TODO: Change it
}

interface TransportationTotal {
  prepaid: TrasnportationPrepaid;
  postpaid: TransportationPostpaid;
  net: TransportationNet;
  full: Full2;
}

interface TrasnportationPrepaid {
  amount: number;
  formatted: string;
  currency: string;
}

interface TransportationPostpaid {
  amount: number;
  formatted: string;
  currency: string;
}

interface TransportationNet {
  amount: number;
  formatted: string;
  currency: string;
}

interface Full2 {
  amount: number;
  formatted: string;
  currency: string;
}

interface Discounts {
  amount_to_apply: AmountToApply;
  breakdown: Breakdown[];
  total_amount_before_apply: TotalAmountBeforeApply;
  net_amount_before_apply: NetAmountBeforeApply;
  percentage_to_apply: string;
}

interface AmountToApply {
  amount: number;
  formatted: string;
  currency: string;
}

interface Breakdown {
  amount: Amount;
  description: string;
  percentage: number;
  source: string;
}

interface Amount {
  amount: number;
  formatted: string;
  currency: string;
}

interface TotalAmountBeforeApply {
  amount: number;
  formatted: string;
  currency: string;
}

interface NetAmountBeforeApply {
  amount: number;
  formatted: string;
  currency: string;
}

interface CancellationPolicy {
  cancellation_type: string;
  details: string;
}

interface ExtraData {
  avg_rating: number;
  review_amount: number;
  description?: string;
  photo_urls: string[];
  vehicle_type: string;
  service_class: string;
  min_capacity: number;
  max_capacity: number;
  type: string;
  luggage: Luggage;
}

interface Luggage {
  inclusive_allowance: string;
}
