import { useAppSelector } from 'hooks/redux/useAppSelector';
import { FlightDetailResponse } from 'flights/types/response/FlightDetailResponse';
import { FlightState } from './FlightState';

const select = (selector: (state: any) => any) => useAppSelector(selector);

export const getFlights = (state: FlightState) => state.flights;

export const getFlightDetail = (): FlightDetailResponse =>
  select((state: any) => state.flights.flight);
