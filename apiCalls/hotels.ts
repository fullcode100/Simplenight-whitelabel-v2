import axios from 'apiCalls/config/axiosHelper';
import { HotelDetailRequest } from 'hotels/types/request/HotelDetailRequest';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { HotelSearchResponse } from 'hotels/types/response/SearchResponse';

export const searchHotels = async (
  searchParameters: HotelSearchRequest,
) =>
  axios.get<HotelSearchResponse>('/hotels', {
    params: searchParameters,
  });

export const getDetail = async (
  id: any,
  detailParameters: HotelDetailRequest,
) =>
  axios.get<HotelDetailResponse>(`/hotels/${id}`, {
    params: detailParameters,
  });
