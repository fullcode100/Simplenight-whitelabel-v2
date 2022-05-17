import { AxiosInstance, AxiosResponse } from 'axios';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ClientRequester } from './ClientRequester';

export abstract class ClientSearcher<
  SearchRequest,
  SearchResponse,
  SearchPreRequest,
> extends ClientRequester<SearchRequest, SearchResponse, SearchPreRequest> {
  public constructor(protected readonly category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: SearchRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<SearchResponse, any>> {
    const { urls: categoryUrls } = this.category.core;

    const clientSearchUrl = categoryUrls.search.client;

    return axios.get<SearchResponse>(clientSearchUrl, {
      params: request,
    });
  }
}
