import axios from 'apiCalls/config/axiosHelper';
import { CarDetailPreRequest } from 'cars/types/request/CarDetailRequest';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';
import { CarDetailResponse } from 'cars/types/response/CarDetailResponse';
import { CarSearchResponse2 } from 'cars/types/response/SearchResponse';

export const searchCars = async (searchParameters: CarSearchRequest) =>
  axios.get<CarSearchResponse2>('/cars', {
    params: searchParameters,
  });

export const getDetail = async (
  id: any,
  detailParameters: CarDetailPreRequest,
) =>
  axios.get<CarDetailResponse>(`/cars/${id}`, {
    params: detailParameters,
  });
