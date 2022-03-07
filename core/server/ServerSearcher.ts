import { applyApiBaseUrlV2 } from "apiCalls/config/responseHelpers";
import { AxiosInstance, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryOption } from "types/search/SearchTypeOptions";
import { ServerRequester } from "./ServerRequester";

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
  ): Promise<AxiosResponse<SearchResponse, any>> {
    const { query: params } = request;

    const categoryUrls = this.category.core.urls;
    const { server: endpoint } = categoryUrls.search;
    const url = applyApiBaseUrlV2(endpoint);

    return axios.get<SearchResponse>(url, {
      params,
    });
  }
}
