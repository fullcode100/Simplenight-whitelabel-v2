import { CartBookingData } from 'types/cart/CartType';

export interface TicketTypes {
  ticket_type_id: string;
  quantity: number;
  age_band_label?: string;
}

export interface ThingsCartRequestDetail extends CartBookingData {
  inventory_id: string;
  booking_code_supplier: string;
  start_date: string;
  time: string;
  product_code: string | null;
  ticket_types: TicketTypes[];
  booking_answers?: BookingAnswer[];
}

export interface BookingAnswer {
  question_id?: string;
  value?: any;
  unit?: string;
  traveler_num?: string | number;
}
