import { DateString } from 'types/global/DateString';
import { StringGeolocation } from 'types/search/Geolocation';
import { Occupancy } from '../response/FlightDetailResponse';

export interface FlightDetailPreRequest {
  flight_id: string;
  start_date: DateString;
  end_date: DateString;
  occupancy: Occupancy;
}

export interface FlightDetailRequest {
  start_date: DateString;
  end_date: DateString;
  adults: string;
  children: string;
  num_rooms: string;
  children_ages?: number[] | null;
}
