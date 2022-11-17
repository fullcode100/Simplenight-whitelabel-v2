import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { ServerDetailer } from 'core/server/ServerDetailer';
import { NextApiRequest, NextApiResponse } from 'next';
import { ThingsDetailResponse } from 'thingsToDo/types/response/ThingsDetailResponse';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsServerDetailer extends ServerDetailer<ThingsDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query: params } = request;
    const { id } = params;

    params['inventory_ids'] = id;
    delete params.id;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.detail.server;

    const endpointFormatted = `${endpoint}/items/details`;
    const url = applyApiBaseUrlV2(endpointFormatted, request);

    return axios.get<ApiResponse<any, ThingsDetailResponse>>(url, {
      params,
    });
  }
}
