import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from 'core/client/ClientRequester';
import { AirportRequest } from 'flights/types/request/AirportRequest';
import { AirportResponse } from 'flights/types/response/AirportResponse';
import { CoreOption } from 'types/search/SearchTypeOptions';

export class ClientAirportGetter extends ClientRequester<
  AirportRequest,
  AirportResponse,
  AirportRequest
> {
  public constructor() {
    const AirportCoreOption: CoreOption = {
      value: 'Airport',
      name: 'Airport',
    };
    super(AirportCoreOption);
  }

  protected override doRequest(
    request: AirportRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<AxiosResponse, any>> {
    const endpoint = '/flights/airports';

    return axios.get<AxiosResponse>(endpoint, {
      params: request,
    });
  }
}
