import { SearchRequest } from 'types/search/SearchRequest';
import { DateString } from 'types/global/DateString';

export interface FlightSearchRequest { //  extends SearchRequest
  direction: string; // one_way, round_trip, multi_city

  start_airport: string;
  end_airport: string;
  start_date: DateString;
  end_date?: DateString; // for round_trip only

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
}
