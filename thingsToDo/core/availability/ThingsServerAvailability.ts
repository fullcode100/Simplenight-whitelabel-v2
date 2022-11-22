import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { ServerRequester } from 'core/server/ServerRequester';
import { NextApiRequest, NextApiResponse } from 'next';
import { Ticket } from 'thingsToDo/types/response/ThingsDetailResponse';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsServerAvailability extends ServerRequester<Ticket[]> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { body } = request;

    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.availability?.server;

    const endpointWithId = `${endpoint}/${body.data.id}/items/availability`;
    const url = applyApiBaseUrlV2(endpointWithId, request);

    return axios.post<ApiResponse<any, Ticket[]>>(url, {
      ...body.data.request,
    });
  }
}
