import axios from 'apiCalls/config/axiosHelper';
import { FlightDetailPreRequest } from 'flights/types/request/FlightDetailRequest';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import { FlightDetailResponse } from 'flights/types/response/FlightDetailResponse';
import { FlightSearchResponse } from 'flights/types/response/SearchResponse';

export const searchFlights = async (
  searchParameters: FlightSearchRequest,
) =>
  axios.get<FlightSearchResponse>('/flights', {
    params: searchParameters,
  });

export const getDetail = async (
  id: any,
  detailParameters: FlightDetailPreRequest,
) =>
  axios.get<FlightDetailResponse>(`/flights/${id}`, {
    params: detailParameters,
  });
