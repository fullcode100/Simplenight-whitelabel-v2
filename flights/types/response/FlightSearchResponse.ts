import { Rate } from 'types/cart/CartType';

// New Search response
export interface FlightsSearchResponse {
  items: Flight[];
}

export interface Flight {
  departure: LocationInfo;
  arrival: LocationInfo;
  include: [];
  availability: Availability;
}

export interface Availability {
  rate: Rate;
  departure_date: string;
  departure_terminal: string;
  arrival_date: string;
  arrival_terminal: string;
  stops: 0;
  segments: Segment[];
}

export interface LocationInfo {
  iata_code: string;
  airport: string;
}

export interface Segment {
  id: string;
  destination: LocationInfo;
  origin: LocationInfo;
  departure_date: string;
  departure_terminal: string;
  arrival_date: string;
  arrival_terminal: string;
  duration: string;
  next_segment: 0;
  aircraft: string;
  flight_number: string;
  carrier_name: string;
  carrier: string;
}
