import { Flight, FlightOffer } from 'flights/types/response/SearchResponse';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';

export interface FlightCartItemData {
  search: FlightSearchRequest; // search criteria
  flights: Flight[]; // selected flights
  offer: FlightOffer; // selected offer
  rate?: {
    total: {
      prepaid: {
        amount: number;
        currency: string;
      };
    };
  };
}
