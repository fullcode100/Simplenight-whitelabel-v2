import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerDetailer } from 'core/server/ServerDetailer';
import { FlightDetailResponse } from 'flights/types/response/FlightDetailResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ApiResponse } from 'types/global/Request';
import { NextApiRequestWithSession } from 'types/core/server';

export class FlightServerDetailer extends ServerDetailer<FlightDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<FlightDetailResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, FlightDetailResponse>, any>> {
    const { query: params } = request;
    const { id } = params;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.detail.server;
    const url = applyApiBaseUrlV2(`${endpoint}/${id}`, request);

    delete params.id;
    delete params.flight_id;

    return axios.get<ApiResponse<any, FlightDetailResponse>>(url, {
      params,
    });
  }

  protected override postRequest(
    request: NextApiRequest,
    response: NextApiResponse<FlightDetailResponse>,
    result: AxiosResponse<ApiResponse<any, FlightDetailResponse>, any>,
  ): void {
    result.data.data.flights[0].nights = result.data.echo_request.nights;
    result.data.data.flights[0].guests = result.data.echo_request.guests;
  }
}
