import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerDetailer } from 'core/server/ServerDetailer';
import dayjs from 'dayjs';
import { DiningDetailResponse } from 'dining/types/response/DiningDetailResponse';
import { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class DiningServerDetailer extends ServerDetailer<DiningDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<DiningDetailResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, DiningDetailResponse>, any>> {
    const { query: params } = request;
    const { id } = params;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.detail.server || '';
    const url = applyApiBaseUrlV2(endpoint, request);

    params.rsp_fields_set = 'extended';
    params.inventory_ids = id;
    if (typeof params.date === 'string') {
      params.date = dayjs(params.date).format('YYYY-MM-DD');
    }

    if (typeof params.end_date === 'string') {
      params.end_date = dayjs(params.end_date).format('YYYY-MM-DD');
    }

    params.time = '20:00'; // Default because we dont support it yet in client side

    delete params.id;

    const resp = axios.get<ApiResponse<unknown, DiningDetailResponse>>(url, {
      params,
    });

    return resp;
  }
}
