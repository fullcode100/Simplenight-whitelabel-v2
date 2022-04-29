import { applyApiBaseUrl } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerDetailer } from 'core/server/ServerDetailer';
import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';

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

    const categoryUrls = this.category.core.urls;
    const { server: endpoint } = categoryUrls.detail;
    const url = applyApiBaseUrl(request, endpoint);

    delete params.id;

    return axios.post<ApiResponse<any, HotelDetailResponse>>(url, {
      params,
    });
  }
}
