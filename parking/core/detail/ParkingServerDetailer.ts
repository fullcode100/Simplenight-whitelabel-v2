import { ServerDetailer } from 'core/server/ServerDetailer';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ParkingDetailsResponse } from '../../types/response/ParkingDetailsResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../../../types/global/Request';
import {
  applyApiBaseUrlV2,
  sendSuccess,
} from '../../../apiCalls/config/responseHelpers';
import { NextApiRequestWithSession } from '../../../types/core/server';

export class ParkingServerDetailer extends ServerDetailer<ParkingDetailsResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<ParkingDetailsResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, ParkingDetailsResponse>, any>> {
    const params = request.query;
    const { id } = params;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.detail.server;
    const url = applyApiBaseUrlV2(`${endpoint}`, request);
    delete params.id;
    return axios.get<ApiResponse<any, ParkingDetailsResponse>>(url, {
      params: {
        inventory_ids: id,
        rsp_fields_set: 'extended',
        ...params,
      },
    });
  }

  protected override postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<ParkingDetailsResponse>,
    result: ParkingDetailsResponse,
  ) {
    const parking = result.items[0].result.features[0];
    sendSuccess(response, { parking });
  }
}
