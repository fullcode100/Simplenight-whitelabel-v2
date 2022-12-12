import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerDetailer } from 'core/server/ServerDetailer';
import { CarDetailResponse } from 'cars/types/response/CarDetailResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ApiResponse } from 'types/global/Request';
import { NextApiRequestWithSession } from 'types/core/server';

export class CarServerDetailer extends ServerDetailer<CarDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<CarDetailResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, CarDetailResponse>, any>> {
    const { query: params } = request;
    const { id } = params;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.detail.server;
    const url = applyApiBaseUrlV2(`${endpoint}/${id}`, request);

    delete params.id;
    delete params.car_id;

    return axios.get<ApiResponse<any, CarDetailResponse>>(url, {
      params,
    });
  }

  protected override postRequest(
    request: NextApiRequest,
    response: NextApiResponse<CarDetailResponse>,
    result: AxiosResponse<ApiResponse<any, CarDetailResponse>, any>,
  ): void {
    result.data.data.cars[0].nights = result.data.echo_request.nights;
    result.data.data.cars[0].guests = result.data.echo_request.guests;
    result.data.data.cars[0].roomsQty = result.data.echo_request.rooms;
  }
}
