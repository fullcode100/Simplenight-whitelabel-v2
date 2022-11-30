import axios from 'apiCalls/config/axiosHelper';
import { HotelDetailPreRequest } from 'hotels/types/request/HotelDetailRequest';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { HotelSearchResponse } from 'hotels/types/response/SearchResponse';

export const searchHotels = async (searchParameters: HotelSearchRequest) => {
  axios.get<HotelSearchResponse>('/hotels', {
    params: searchParameters,
  });
};

export const getDetail = async (
  id: number,
  detailParameters: HotelDetailPreRequest,
) =>
  axios.get<HotelDetailResponse>(`/hotels/${id}`, {
    params: detailParameters,
  });
