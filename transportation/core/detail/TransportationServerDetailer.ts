import { ServerDetailer } from 'core/server/ServerDetailer';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { TransportationDetailsResponse } from '../../types/response/TransportationDetailsResponse';
import { NextApiResponse } from 'next';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../../../types/global/Request';
import { applyApiBaseUrlV2 } from '../../../apiCalls/config/responseHelpers';
import { NextApiRequestWithSession } from '../../../types/core/server';

export class TransportationServerDetailer extends ServerDetailer<TransportationDetailsResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<TransportationDetailsResponse>,
    axios: AxiosInstance,
  ): Promise<
    AxiosResponse<ApiResponse<any, TransportationDetailsResponse>, any>
  > {
    const params = request.query;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.detail.server;
    const url = applyApiBaseUrlV2(`${endpoint}`, request);
    delete params.id;
    return axios.get<ApiResponse<any, TransportationDetailsResponse>>(url, {
      params,
    });
  }
}
