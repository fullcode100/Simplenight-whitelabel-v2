import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { ServerDetailer } from 'core/server/ServerDetailer';
import { NextApiResponse } from 'next';
import { ThingsDetailResponse } from 'thingsToDo/types/response/ThingsDetailResponse';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsServerDetailer extends ServerDetailer<ThingsDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query: params } = request;
    const { id } = params;

    params['inventory_ids'] = id;

    const endpoint = params.apiUrl as string;
    const endpointFormatted = `${endpoint}/items/details`;
    const url = applyApiBaseUrlV2(endpointFormatted, request);

    delete params.id, params.apiUrl;

    return axios.get<ApiResponse<any, ThingsDetailResponse>>(url, {
      params,
    });
  }
}
