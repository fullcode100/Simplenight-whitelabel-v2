import { useAppSelector } from 'hooks/redux/useAppSelector';
import { Flight } from 'flights/types/response/FlightSearchResponse';
import { FlightState } from './FlightState';

const select = (selector: (state: any) => any) => useAppSelector(selector);

export const getFlights = (state: FlightState) => state.flights;

export const getFlightDetail = (): Flight =>
  select((state: any) => state.flights.flight);
