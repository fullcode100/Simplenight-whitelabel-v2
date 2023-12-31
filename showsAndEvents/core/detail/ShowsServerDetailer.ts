import { ServerDetailer } from 'core/server/ServerDetailer';
import { ShowDetailResponse } from 'showsAndEvents/types/response/ShowsDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { NextApiRequestWithSession } from 'types/core/server';
import { NextApiResponse } from 'next';
import { AxiosInstance } from 'axios';
import {
  applyApiBaseUrlV2,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';
import { ApiResponse } from 'types/global/Request';
import { detailAdapter } from 'showsAndEvents/adapters/detail.adapter';

export class ShowsServerDetailer extends ServerDetailer<ShowDetailResponse> {
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

    return axios.get<ApiResponse<any, ShowDetailResponse>>(url, {
      params,
    });
  }

  protected override postRequestResult(
    request: NextApiRequestWithSession,
    response: NextApiResponse<ShowDetailResponse>,
    result: ShowDetailResponse,
  ): void {
    if (result) {
      const adaptedResult = detailAdapter(result);
      sendSuccess(response, adaptedResult);
      return;
    }
  }
}
