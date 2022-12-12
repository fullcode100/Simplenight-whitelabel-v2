import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';
import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';

export abstract class ServerSearcher<
  SearchResponse,
> extends ServerRequester<SearchResponse> {
  protected constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<SearchResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, SearchResponse>, any>> {
    const { query: params } = request;

    const endpoint = params.apiUrl as string;
    const url = applyApiBaseUrlV2(endpoint, request);

    delete params.apiUrl;

    return axios.get<ApiResponse<any, SearchResponse>>(url, {
      params,
    });
  }
}
