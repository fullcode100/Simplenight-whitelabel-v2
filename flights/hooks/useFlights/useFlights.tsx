import { useFlightsStore } from 'hooks/flights/useFligthsStore';
import { usePassengersStore } from 'hooks/flights/usePassengersStore';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import IconMultiCity from 'public/icons/assets/flights/multicity.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';

import { useTranslation } from 'react-i18next';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import {
  getDirection,
  getEndAirport,
  getEndCabinName,
  getEndDateTime,
  getFirstDepartureAirport,
  getFirstDepartureDateTime,
  getFirstFlight,
  getLastArrivalAirport,
  getLastArrivalDateTime,
  getLastDepartureAirport,
  getLastDepartureDateTime,
  getLastFlight,
  getOfferCabinName,
  getStartAirport,
  getStartCabinName,
  getStartDateTime,
} from './helpers';

export const useFlights = () => {
  const flightsStoreData = useFlightsStore((state) => state.flights);
  const passengersStoreData = usePassengersStore((state) => state.passengers);
  const flights = flightsStoreData;
  const passengers = passengersStoreData;

  const [t] = useTranslation('flights');

  const firstFlight = getFirstFlight(flights);
  const lastFlight = getLastFlight(flights);

  const direction = getDirection(flights);

  const isRoundTrip = direction === 'round_trip';

  const directionMapper = {
    one_way: {
      icon: <IconOneWay />,
      label: t('one_way', 'One-way'),
    },
    multicity: {
      icon: <IconMultiCity />,
      label: t('multicity', 'Multi-city'),
    },
    round_trip: {
      icon: <IconRoundTrip />,
      label: t('round_trip', 'Round-Trip'),
    },
  };

  const startAirport = getStartAirport(flights);
  const startDateTime = getStartDateTime(flights);
  const startCabinName = getStartCabinName(flights);

  const endAirport = getEndAirport(flights);

  const endDateTime = getEndDateTime(flights);

  const endCabinName = getEndCabinName(flights);

  const adults = passengers.filter(
    (v: any) => v.passengerType === 'ADT',
  ).length;
  const children = passengers.filter(
    (v: any) => v.passengerType === 'CNN',
  ).length;
  const infants = passengers.filter(
    (v: any) => v.passengerType === 'INF',
  ).length;

  const totalTickets = Number(adults) + Number(children) + Number(infants);

  const adultsAmount = Number(adults);
  const adultsText = usePlural(
    adultsAmount,
    t('adult', 'Adult'),
    t('adults', 'Adults'),
  );
  const childrenAmount = Number(children);
  const childrenText = usePlural(
    childrenAmount,
    t('child', 'Child'),
    t('children', 'Children'),
  );
  const infantsAmount = Number(infants);
  const infantsText = usePlural(
    infantsAmount,
    t('infant', 'Infant'),
    t('infants', 'Infants'),
  );

  const getPaxMixLabel = () => {
    const adultsLabel = `${adultsAmount} ${adultsText}`;
    const childrenLabel =
      childrenAmount > 0 ? `, ${childrenAmount} ${childrenText}` : '';
    const infantsLabel =
      infantsAmount > 0 ? `, ${infantsAmount} ${infantsText}` : '';

    return adultsLabel + childrenLabel + infantsLabel;
  };

  const firstFlightSegments = firstFlight?.segments;
  const firstFlightSegmentsLength = firstFlightSegments?.collection.length || 0;
  const stops = firstFlightSegmentsLength - 1;
  const stopsLabel = usePlural(stops, t('stop', 'Stop'), t('stops', 'Stops'));
  const directLabel = t('directLabel', 'Direct');
  const stopsText = stops ? `${stops} ${stopsLabel}` : directLabel;

  const firstFlightOffer = firstFlight?.offer;
  const firstFlightTax = Number(firstFlightOffer?.totalTaxAmount);
  const startFlightFare =
    Number(firstFlightOffer?.totalFareAmount) - firstFlightTax;
  const startFlightFareAmount = `US$${startFlightFare.toFixed(2)}`;
  const lastFlightOffer = lastFlight?.offer;
  const lastFlightTax =
    Number(lastFlightOffer?.totalTaxAmount) -
    Number(firstFlightOffer?.totalTaxAmount);
  const endFlightFare =
    Number(lastFlightOffer?.totalFareAmount) -
    Number(firstFlightOffer?.totalFareAmount) -
    lastFlightTax;
  const endFlightFareAmount = `US$${endFlightFare.toFixed(2)}`;

  const totalTaxes = lastFlightOffer?.totalTaxAmount;
  const totalTaxesAmount = `US$${totalTaxes}`;

  const totalAmount = `US$${lastFlightOffer?.totalFareAmount || '0'}`;

  return {
    flights,
    hasFlights: flights.length > 0,
    isRoundTrip,
    flightInfo: {
      totalAmount,
      startAirport,
      startDateTime,
      startCabinName,
      startFlightFareAmount,
      endAirport,
      endDateTime,
      endCabinName,
      endFlightFareAmount,
      directionKey: direction,
      directionIcon: directionMapper[direction].icon,
      directionLabel: directionMapper[direction].label,
      totalTickets,
      adultsAmount,
      adultsText,
      childrenAmount,
      childrenText,
      infantsAmount,
      infantsText,
      paxMixLabel: getPaxMixLabel(),
      stops,
      stopsText,
      totalTaxesAmount,
    },
    getFirstDepartureAirport,
    getFirstDepartureDateTime,
    getLastDepartureAirport,
    getLastDepartureDateTime,
    getLastArrivalAirport,
    getLastArrivalDateTime,
    getOfferCabinName,
    passengers,
  };
};
