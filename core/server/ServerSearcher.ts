import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export abstract class ServerSearcher<
  SearchResponse,
> extends ServerRequester<SearchResponse> {
  protected constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<SearchResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, SearchResponse>, any>> {
    const { query: params } = request;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.search.server ?? '';
    const url = applyApiBaseUrlV2(endpoint, request);

    return axios.get<ApiResponse<any, SearchResponse>>(url, {
      params,
    });
  }
}
