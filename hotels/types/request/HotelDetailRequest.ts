import { DateString } from 'types/global/DateString';

export interface HotelDetailRequest {
  hotel_id: string;
  start_date: DateString;
  end_date: DateString;
  occupancy: Occupancy;
}

export interface Occupancy {
  adults: string;
  children: string;
  num_rooms: string;
  children_ages?: number[] | null;
}
