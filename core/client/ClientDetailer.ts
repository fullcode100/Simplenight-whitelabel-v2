import { AxiosInstance, AxiosResponse } from 'axios';
import { flattenedObject } from 'helpers/stringUtils';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ClientRequester } from './ClientRequester';

export abstract class ClientDetailer<
  DetailRequest,
  DetailResponse,
  PreDetailRequest,
> extends ClientRequester<DetailRequest, DetailResponse, PreDetailRequest> {
  protected constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: DetailRequest,
    axios: AxiosInstance,
    id: any,
  ): Promise<AxiosResponse<DetailResponse, any>> {
    const { urls: categoryUrls } = this.category.core;

    const clientDetailUrl = `${categoryUrls.detail.client}/${id}`;

    return axios.get<DetailResponse>(clientDetailUrl, {
      params: request,
    });
  }
}
