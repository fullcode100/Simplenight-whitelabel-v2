import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export abstract class ServerDetailer<
  DetailResponse,
> extends ServerRequester<DetailResponse> {
  protected constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query: params } = request;

    const endpoint = params.apiUrl as string;
    const endpointWithId = `${endpoint}/${params.id}`;
    const url = applyApiBaseUrlV2(endpointWithId, request);

    delete params.id, params.apiUrl;

    return axios.get<ApiResponse<any, DetailResponse>>(url, {
      params,
    });
  }
}
