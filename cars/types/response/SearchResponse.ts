import { Amount } from 'types/global/Amount';

export interface CarSearchResponse {
  cars: Car[];
}

export interface Car {
  id: string;
  VehAvailCore: {
    '@Status': string;
    Vehicle: {
      '@AirConditionInd': string;
      '@TransmissionType': string;
      '@FuelType': string;
      '@DriveType': string;
      '@PassengerQuantity': string;
      '@BaggageQuantity': string;
      VehType: {
        '@DoorCount': string;
      };
      VehMakeModel: {
        '@Name': string;
      };
      PictureURL: string;
    };
    RentalRate: {
      VehicleCharges: CarCharge[];
    };
    TotalCharge: {
      '@RateTotalAmount': string;
      '@EstimatedTotalAmount': string;
      '@CurrencyCode': string;
    };
    PricedEquips: CarEquip[];
    Reference: {
      '@ID': string;
    };
  };
  Vendor: CarVendor;
  Info: CarInfo;
}

export interface CarVendor {
  '@CompanyShortName': string;
}

export interface CarInfo {
  LocationDetails: {
    '@Name': string;
    Address: {
      '@Remark': string;
      AddressLine: string;
    };
    CountryName: {
      '@Code': string;
    };
  };
  TPA_Extensions: {
    VendorPictureURL: {
      '#text': string;
    };
  };
}

export interface CarEquip {
  Equipment: {
    Description: string;
  };
  Charge: {
    '@Amount': string;
    '@CurrencyCode': string;
  };
}

export interface CarCharge {
  '@Description': string;
}

/*
export interface Car {
  id: string;
  company_short_name: string;
  vehicle: CarVehicle;
  rate_distance: CarDistance;
  rate_total_amount: string;
  estimated_total_amount: string;
  terms_conditions: string[];
  currency_code: string;
  reference: CarReference;
  duration: string;
  location_details: CarLocation;
  vendor_picture_url: string;

  Vendor?: Object;
  Info?: Object;
}

export interface CarDistance {
  '@DistUnitName'?: string;
  '@Quantity'?: string;
  '@Unlimited'?: string;
  '@VehiclePeriodUnitName'?: string;
}

export interface CarReference {
  '@ID': string;
  '@DateTime': string;
}

export interface CarVehicle {
  air_condition_ind: string;
  transmission_type: string;
  passenger_quantity: string;
  baggage_quantity: string;
  fuel_type: string;
  door_count: string;
  name: string;
  picture_url: string;
  picture_url_hd?: string;
}

export interface CarLocation {
  pick_up: CarAddress;
  drop_off?: CarAddress;
}

export interface CarAddress {
  name?: string;
  remark?: CarLatLong;
  address_line?: string;
  phone_number?: string;
  code?: string;
}

export interface CarLatLong {
  latitude: number;
  longitude: number;
}
*/

// will be removed...
export interface CarSearchResponse2 {
  cars: Car2[];
  _timestamp?: Date;
}

export interface Car2 extends Car {
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
  roomsQty?: number;
  check_in_instructions?: CheckInInstructions;
  accommodation_type: string;
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

export interface AvgAmount {
  avg_amount: Amount;
  discounts: Discounts;
  markups: Discounts;
}

export interface Rates {
  avg_amount: AvgAmount;
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
  markups?: Discounts;
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
  diff_min_rate: Amount;
  rate_breakdown: RateBreakdown;
  total_amount: Amount;
  starting_room_total?: Amount;
}

export interface Capacity {
  min_pax: number;
  max_pax: number;
  min_adults: number;
  max_adults: number;
  min_children: number;
  max_children: number;
}
