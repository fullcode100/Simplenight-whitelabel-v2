import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerRequester } from 'core/server/ServerRequester';
import { NextApiResponse } from 'next';
import { ThingsAvailabilityScheduleResponse } from 'thingsToDo/types/response/ThingsAvailabilityScheduleResponse';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsServerAvailabilitySchedule extends ServerRequester<ThingsAvailabilityScheduleResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<ThingsAvailabilityScheduleResponse>,
    axios: AxiosInstance,
  ): Promise<
    AxiosResponse<ApiResponse<any, ThingsAvailabilityScheduleResponse>, any>
  > {
    const { query: params } = request;

    const endpoint = params.apiUrl as string;
    const endpointWithId = `${endpoint}/items/availability/schedule`;
    const url = applyApiBaseUrlV2(endpointWithId, request);

    delete params.apiUrl;
    delete params.id;

    return axios.get<ApiResponse<any, ThingsAvailabilityScheduleResponse>>(
      url,
      {
        params,
      },
    );
  }
}
