// TODO: Change all null values

export type FlightsSearchResponseMS = {
  errorMessage: ErrorMessage;
  _meta: Meta;
  _links?: null;
  _legCollection: LegCollection;
  _offersCollection: OffersCollection;
  _warningCollection: WarningCollection;
};

export type ErrorMessage = {
  timestamp: string;
  httpStatus: string;
  error?: null;
};
export type Meta = {
  class: string;
};
export type LegCollection = {
  _meta: Meta;
  _collection?: Array<Leg>;
};

export type Leg = {
  legId: string;
  legDuration: string;
  segments: SegmentItem;
  _meta: Meta;
};

export type SegmentItem = {
  meta: Meta;
  collection: SegmentCollection[];
  legType: string;
  totalFlightTimeInMinutes?: null;
  marketType?: null;
  regionCode?: null;
  rateModel?: null;
  fareAndCabinName?: null;
  fareType?: null;
  subjectToGovernmentApproval: boolean;
  transferSegments?: null;
};

export type SegmentCollection = {
  segmentCode: string;
  departureAirportName: string;
  departureAirport: string;
  departureDateTime: string;
  departureTerminal?: string;
  dateVariation?: null;
  arrivalAirportName: string;
  arrivalAirport: string;
  arrivalDateTime: string;
  arrivalTerminal?: string;
  flightDuration: string;
  layoverToNextSegmentsInMinutes: number;
  aircraftType: string;
  operatingCarrier?: string;
  operatingCarrierName?: null;
  operatingFlightNumber: string;
  marketingCarrier: string;
  marketingCarrierName: string;
  marketingFlightNumber: string;
  amenitiesPremiumCabin: AmenitiesPremiumCabinOrAmenitiesMainCabin;
  amenitiesMainCabin: AmenitiesPremiumCabinOrAmenitiesMainCabin;
  amadeusDepartureDate: string;
  amadeusDepartureTime: string;
  _meta: Meta;
};

export type AmenitiesPremiumCabinOrAmenitiesMainCabin = {
  complimentaryFeatures?: Array<null>;
  paidFeatures?: Array<null>;
};
export type OffersCollection = {
  currency: string;
  offerLegRefs?: Array<OfferLegRefsEntity>;
};
export type OfferLegRefsEntity = {
  id: string;
  totalFareAmount: string;
  baseFare: string;
  bookingClass: string;
  legRef?: string[];
  fareDetails?: Array<string>;
};
export type WarningCollection = {
  _meta: Meta;
  _collection?: null[];
};

export type FlightItem = Leg & { offer: OfferLegRefsEntity };

export type FlightResponse = {
  flights?: Array<Array<FlightItem>>;
  errors?: string;
};
