import axios from 'apiCalls/config/axiosHelper';
import { DiningSearchRequest } from 'dining/types/request/DiningSearchRequest';
import { DiningSearchResponse } from 'dining/types/response/SearchResponse';

export const searchRestaurants = async (
  searchParameters: DiningSearchRequest,
) => axios.get<DiningSearchResponse>('/dining', { params: searchParameters });
