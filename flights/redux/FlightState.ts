import { FlightDetailResponse } from 'flights/types/response/FlightDetailResponse';
import { Flight } from 'flights/types/response/SearchResponse';

export interface FlightState {
  flights: Flight[];
  flight: FlightDetailResponse | Flight;
}
