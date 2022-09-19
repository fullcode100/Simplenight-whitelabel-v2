export interface FlightSearchResponse {
  flights: Flight[];
}
export interface Flight {
  airItinerary: Object;
  airItineraryPricingInfo: Object[];
}