import { sendSuccess } from 'apiCalls/config/responseHelpers';
import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerDetailer } from 'core/server/ServerDetailer';
import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ApiResponse } from 'types/global/Request';
import { NextApiRequestWithSession } from 'types/core/server';
import { detailAdapter } from '../../adapters/detail.adapter';

export class HotelServerDetailer extends ServerDetailer<HotelDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<HotelDetailResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, HotelDetailResponse>, any>> {
    const { query: params } = request;
    const { id } = params;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.detail.server;
    const url = applyApiBaseUrlV2(`${endpoint}/${id}`, request);

    delete params.id;
    delete params.hotel_id;

    return axios.get<ApiResponse<any, HotelDetailResponse>>(url, {
      params,
    });
  }

  protected override postRequest(
    request: NextApiRequest,
    response: NextApiResponse<HotelDetailResponse>,
    result: AxiosResponse<ApiResponse<any, HotelDetailResponse>, any>,
  ): void {
    result.data.data.hotels[0].nights = result.data.echo_request.nights;
    result.data.data.hotels[0].guests = result.data.echo_request.guests;
    result.data.data.hotels[0].roomsQty = result.data.echo_request.rooms;

    const adaptedResult = detailAdapter(result.data.data.hotels);
    sendSuccess(response, adaptedResult);
    return;
  }

  protected override postRequestResult(): void {
    return;
  }
}
