import {
  applyApiBaseUrl,
  applyApiBaseUrlV2,
} from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerDetailer } from 'core/server/ServerDetailer';
import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ApiResponse } from 'types/global/Request';

export class HotelServerDetailer extends ServerDetailer<HotelDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<HotelDetailResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, HotelDetailResponse>, any>> {
    const { query: params } = request;
    const { id } = params;

    const categoryUrls = this.category.core.urls;
    const { server: endpoint } = categoryUrls.detail;
    const url = applyApiBaseUrlV2(`${endpoint}/${id}`);

    delete params.id;
    delete params.hotel_id;

    return axios.post<ApiResponse<any, HotelDetailResponse>>(url, {
      params,
    });
  }
}
