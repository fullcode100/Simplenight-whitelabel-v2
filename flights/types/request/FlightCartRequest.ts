import { Flight, FlightOffer } from 'flights/types/response/SearchResponse';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import { CartBookingData } from 'types/cart/CartType';

export interface FlightCartRequestDetail extends CartBookingData {
  inventory_id?: string; // ???
  search: FlightSearchRequest; // search criteria
  flights: Flight[]; // selected flights
  offer?: FlightOffer; // selected offer
  rate?: {
    total: {
      prepaid: {
        amount: number;
        currency: string;
      };
    };
  };
}
