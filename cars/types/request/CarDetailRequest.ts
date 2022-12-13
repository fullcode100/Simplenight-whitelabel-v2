import { DateString } from 'types/global/DateString';
import { StringGeolocation } from 'types/search/Geolocation';
import { Occupancy } from '../response/CarDetailResponse';

export interface CarDetailPreRequest {
  car_id: string;
  start_date: DateString;
  end_date: DateString;
  occupancy: Occupancy;
}

export interface CarDetailRequest {
  start_date: DateString;
  end_date: DateString;
  adults: string;
  children: string;
  num_rooms: string;
  children_ages?: number[] | null;
}
