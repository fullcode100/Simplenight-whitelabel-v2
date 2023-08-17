import {
  FlightItem,
  SegmentItem,
} from 'flights/types/response/FlightSearchResponseMS';

export const getLastSegment = (segments?: SegmentItem) => {
  const totalSegments = segments?.collection.length || 0;
  return segments?.collection[totalSegments - 1];
};

export const getFirstDepartureAirport = (segments?: SegmentItem) => {
  return segments?.collection[0].departureAirport || '';
};

export const getFirstDepartureDateTime = (segments?: SegmentItem) => {
  return segments?.collection[0].departureDateTime || '';
};

export const getLastDepartureAirport = (segments?: SegmentItem) => {
  return getLastSegment(segments)?.departureAirport || '';
};

export const getLastDepartureDateTime = (segments?: SegmentItem) => {
  return getLastSegment(segments)?.departureDateTime || '';
};

export const getLastArrivalAirport = (segments?: SegmentItem) => {
  return getLastSegment(segments)?.arrivalAirport || '';
};

export const getLastArrivalDateTime = (segments?: SegmentItem) => {
  return getLastSegment(segments)?.arrivalDateTime || '';
};

export const getFirstFlight = (flights?: FlightItem[]) => {
  return flights?.[0];
};

export const getLastFlight = (flights?: FlightItem[]) => {
  return flights?.[flights.length - 1];
};

export const getOfferCabinName = (flight?: FlightItem) => {
  return flight?.offer.cabinName || '';
};

export const getStartAirport = (flights?: FlightItem[]) => {
  const firstFlight = getFirstFlight(flights);
  return getFirstDepartureAirport(
    firstFlight?.segments || (firstFlight as unknown as SegmentItem),
  );
};

export const getStartDateTime = (flights?: FlightItem[]) => {
  const firstFlight = getFirstFlight(flights);
  return getFirstDepartureDateTime(
    firstFlight?.segments || (firstFlight as unknown as SegmentItem),
  );
};

export const getStartCabinName = (flights?: FlightItem[]) => {
  const firstFlight = getFirstFlight(flights);
  return firstFlight?.offer?.cabinName || '';
};

export const getEndAirport = (flights?: FlightItem[]) => {
  const firstFlight = getFirstFlight(flights);
  return getLastArrivalAirport(
    firstFlight?.segments || (firstFlight as unknown as SegmentItem),
  );
};

export const getEndDateTime = (flights?: FlightItem[]) => {
  const lastFlight = getLastFlight(flights);
  return getLastDepartureDateTime(
    lastFlight?.segments || (lastFlight as unknown as SegmentItem),
  );
};

export const getEndCabinName = (flights?: FlightItem[]) => {
  const lastFlight = getLastFlight(flights);
  return lastFlight?.offer.cabinName || '';
};

export const getDirection = (flights?: FlightItem[]) => {
  return flights?.length === 1 ? 'one_way' : 'round_trip';
};
