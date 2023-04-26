import { Flight } from 'flights/types/response/FlightSearchResponse';

export interface FlightState {
  flights: Flight[];
  flight: Flight | null;
}
