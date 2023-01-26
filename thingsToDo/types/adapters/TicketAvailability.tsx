import { Time } from '../response/ThingsAvailabilityResponse';

export interface TicketAvailability {
  fullDay: boolean;
  ticketTypes: TicketType[];
  code: string;
  name: string;
  description: string;
  duration: number;
  minDuration?: number;
  maxDuration?: number;
  startDate: Date;
  times: Time[];
  totalBeforeDiscount: string;
  percentageToApply: string;
  totalAmount: string;
  totalGuests: number;
}

export interface TicketType {
  ticket_type_id: string;
  quantity: number;
}
