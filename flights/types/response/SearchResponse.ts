import { Amount } from 'types/global/Amount';

export interface FlightSearchResponse {
  flights: Flight[];
  offers: FlightOffer[];
}

export interface Flight {
  legId: string;
  segments: {
    collection: FlightSegment[];
    legType?: string;
    totalFlightTimeInMinutes?: number | null;
    fareAndCabinName?: string | null;
    fareType?: string | null;
  };
  offers: FlightOffer[];
}

export interface FlightSegment {
  segmentCode: string;

  departureAirportName: string;
  departureAirport: string;
  departureDateTime: string;
  departureTerminal?: string | null;

  arrivalAirportName: string;
  arrivalAirport: string;
  arrivalDateTime: string;
  arrivalTerminal?: string | null;

  flightDuration: number;
  layoverToNextSegmentsInMinutes: number;

  aircraftType: string | null;

  operatingCarrier: string | null;
  operatingCarrierName: string | null;
  operatingFlightNumber: string | null;

  marketingCarrier: string;
  marketingCarrierName: string;
  marketingFlightNumber: string;
}

export interface FlightOffer {
  id: number;
  totalAmound: string;
  baseFare: string;
  legRef: string[];
  // fareDetails?: string[];
}

/*
export interface Flight {
  airItinerary: {
    originDestinationOptions: {
      originDestinationOption: FlightOption[];
    };
  };
  airItineraryPricingInfo: FlightPrice[];
  sequenceNumber: number;
}

export interface FlightOption {
  flightSegment: FlightSegment[];
  elapsedTime: number;
}

export interface FlightSegment {
  departureAirport: {
    locationCode: string;
  };
  arrivalAirport: {
    locationCode: string;
  };
  operatingAirline: {
    code: string;
  };
  departureDateTime: string;
  arrivalDateTime: string;
  elapsedTime: number;
  flightNumber: string;
}

export interface FlightPrice {
  itinTotalFare: {
    totalFare: {
      amount: number;
      currencyCode: string;
    };
  };
}
*/

// will be changed...
export interface FlightSearchResponse2 extends FlightSearchResponse {
  flights: Flight2[];
  _timestamp?: Date;
}

export interface Flight2 extends Flight {
  amount_min: Amount;
  details: Details;
  giata_code: string;
  id: string;
  min_rate_room: Room;
  photos: Photo[];
  relative_position: RelativePosition;
  rooms: Room[];
  relevance?: number;
  thumbnail: string;
  nights?: number;
  guests?: number;
  check_in_instructions?: CheckInInstructions;
}

export interface CheckInInstructions {
  fees?: FeesInstructions;
  instructions?: string;
  policies?: string;
  special_instructions?: string;
}

export interface FeesInstructions {
  optional?: string;
  mandatory?: string;
}

export interface Photo {
  text: string;
  url: string;
}

export interface Details {
  address: Address;
  chain: Chain;
  checkin_time: string;
  checkout_time: string;
  description: string;
  email: string;
  facilities: string[];
  sn_amenities: string[];
  name: string;
  phones: Phone[];
  star_rating: string;
  type: string;
  web: string;
}

export interface Address {
  coordinates: Coordinates;
  country_code: string;
  country: string;
  state: string;
  city: string;
  zone: string;
  district: string;
  address1: string;
  address2: string;
  postal_code: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Chain {
  chain_code: string;
  chain_name: string;
}

export interface Phone {
  phone_number: string;
  phone_type: string;
}

export interface RelativePosition {
  distance: number;
  distance_unit: string;
  near_to: NearTo[];
  distance_to_city_centre: number;
  distance_to_nearest_airport: number;
}

export interface NearTo {
  location_type: string;
  location_code: string;
  location_name: string;
  distance: string;
}

export interface Room {
  amenities: string[];
  capacity: Capacity;
  code: string;
  description: string;
  name: string;
  rates: Rates;
  room_type: string;
  services: Services;
  photos?: Photo[];
}

export interface Services {
  double_beds: number;
  free_breakfast: boolean;
  free_parking: boolean;
  free_wifi: boolean;
  king_beds: number;
  other_beds: number;
  queen_beds: number;
  total_bathrooms: number;
  total_beds: number;
  total_rooms: number;
}

export interface Rates {
  avg_amount: Amount;
  min_rate: MinRate;
  upgrades: MinRate[];
}

export interface Rates {
  avg_amount: Amount;
  min_rate: MinRate;
  upgrades: MinRate[];
}

export interface MinRate {
  rate_type: MinRateRateType | RateBreakdownRateType;
  meal_plan: MealPlan;
  sn_booking_code: string;
  booking_code_supplier: string;
  comments: string;
  requires_validation_before_booking: boolean;
  available_qty: number;
  rate: Rate;
  cancellation_policy?: CancellationPolicy;
}

export interface RateBreakdown {
  diff_min_rate: Amount;
  discounts: Discounts;
  extra_charges?: Discounts;
  rate_type?: string;
  taxes: Tax[];
  total_base_amount: Amount;
  total_taxes: Amount;
  post_paid_rate?: PostPaidRate;
}

export interface PostPaidRate {
  taxes: Tax[];
  total_taxes: Amount;
  total_amount: Amount;
}

export interface Tax {
  description: string;
  included_in_total: boolean;
  tax_amount: Amount;
}

export interface Tax {
  description: string;
  included_in_total: boolean;
  tax_amount: Amount;
}

export interface Discounts {
  total_amount_before_apply: Amount;
  amount_to_apply: Amount;
  percentage_to_apply: string;
}

export enum RateBreakdownRateType {
  SnPublic = 'SN_PUBLIC',
}

export enum MinRateRateType {
  SnPrivate = 'SN_PRIVATE',
}
export interface CancellationPolicy {
  cancellation_type: string;
  description: string;
  details?: CancellationDetails[];
}

export interface CancellationDetails {
  from_date: string;
  to_date: string;
  penalty_percentage: number;
  penalty_amount: Amount;
  cancellation_type: string;
}

export interface MealPlan {
  code: string;
  text: string;
}

export interface Rate {
  rate_breakdown: RateBreakdown;
  total_amount: Amount;
}

export interface Capacity {
  min_pax: number;
  max_pax: number;
  min_adults: number;
  max_adults: number;
  min_children: number;
  max_children: number;
}
