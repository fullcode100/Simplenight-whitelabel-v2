import axios from 'apiCalls/config/axiosHelper';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { HotelSearchResponse } from 'hotels/types/response/SearchResponse';

export const searchHotels = async (
  searchParameters: HotelSearchRequest,
) =>
  axios.get<HotelSearchResponse>('/hotels', {
    params: searchParameters,
  });
