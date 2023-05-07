import { SearchRequest } from 'types/search/SearchRequest';
import { DateString } from 'types/global/DateString';

export interface FlightSearchRequest extends SearchRequest {
  //  extends SearchRequest
  direction: string; // 'one_way' | 'round_trip' | 'multicity';
  cabin_type: string; // 'economy' | 'business';

  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;

  adults: number;
  children: number;
  infants: number;
  children_ages?: string;
  infants_ages?: string;

  sort?: string;
  min_price?: string;
  max_price?: string;
  departure_times?: string;
  arrival_times?: string;
  stops?: string;
  airlines?: string;
  cities?: string;

  start_airports?: string;
  end_airports?: string;
  start_dates?: string;

  start_airport?: string;
  end_airport?: string;

  currency?: string;
}
