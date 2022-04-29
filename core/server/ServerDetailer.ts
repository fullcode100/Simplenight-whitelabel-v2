import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export abstract class ServerDetailer<
  DetailResponse,
> extends ServerRequester<DetailResponse> {
  protected constructor(category: CategoryOption) {
    super(category);
  }

  // protected override onError(
  //   err: any,
  //   res: NextApiResponse<DetailResponse>,
  // ): void {
  //   console.log(err);
  //   debugger;
  //   res.status(500).json(err.response);
  // }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query: params } = request;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.detail.server;

    const endpointWithId = `${endpoint}/${params.id}`;
    const url = applyApiBaseUrlV2(endpointWithId, request);

    delete params.id;

    return axios.get<ApiResponse<any, DetailResponse>>(url, {
      params,
    });
  }
}
