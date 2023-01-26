/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ThingsAvailabilityResponse {
  tickets: Ticket[];
}

export interface Ticket {
  cancellation_policy: CancellationPolicy;
  full_day: boolean;
  ticket_types: TicketType[];
  rate: Rate;
  code: string;
  name: string;
  description: string;
  duration: number;
  min_duration?: number;
  max_duration?: number;
  start_date: Date;
  times: Time[];
}

interface CancellationPolicy {
  cancellation_type: string;
  description: string;
  flags: Flag[];
  details: Detail[];
}

interface Detail {
  cancellation_type: string;
  penalty_percentage: number;
  from_date: Date;
  to_date: Date;
  penalty_amount: Money;
}

interface Money {
  amount: number;
  currency: string;
  formatted: string;
}

interface Flag {
  flag_id: string;
  description: string;
  value: boolean;
}

interface Rate {
  taxes: Taxes;
  fees: Empty;
  total: Total;
  discounts: Discounts;
}

interface Discounts {
  amount_to_apply: Money;
  breakdown: Breakdown[];
  total_amount_before_apply: Money;
  net_amount_before_apply: Money;
  percentage_to_apply: string;
}

interface Breakdown {
  amount: Money;
  description: string;
  percentage: number;
  source: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Empty {}

interface Taxes {
  prepaid: any[];
  postpaid: any[];
  full: Empty;
  total_postpaid: Empty;
}

interface Total {
  prepaid: Money;
  postpaid: Money;
  net: Money;
  full: Money;
}

export interface TicketType {
  id: string;
  quantity: number;
  rate: Rate;
}

export interface Time {
  start_time: string;
  available: boolean;
  booking_code_supplier?: string;
}
