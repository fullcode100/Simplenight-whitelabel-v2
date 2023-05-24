import { i18n } from 'i18next';
import { ClientAirportGetter } from '../AirportClientSearcher';
import { AirportRequest } from 'flights/types/request/AirportRequest';

const tryGetAirports = async (
  bookingRequest: AirportRequest,
  i18next: i18n,
) => {
  const clientAirportGetter = new ClientAirportGetter();
  return await clientAirportGetter.request(bookingRequest, i18next);
};

export const getAirports = (keyword: string, i18next: i18n) => {
  return tryGetAirports({ keyword }, i18next);
};
