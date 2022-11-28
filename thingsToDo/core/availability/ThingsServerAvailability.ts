import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { ServerRequester } from 'core/server/ServerRequester';
import { NextApiRequest, NextApiResponse } from 'next';
import { Ticket } from 'thingsToDo/types/response/ThingsDetailResponse';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsServerAvailability extends ServerRequester<Ticket[]> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { params } = request.body;

    const endpoint = params.apiUrl as string;
    const endpointWithId = `${endpoint}/items/availability`;
    const url = applyApiBaseUrlV2(endpointWithId, request);

    delete params.apiUrl;

    return axios.post<ApiResponse<any, Ticket[]>>(url, {
      ...params,
    });
  }
}
