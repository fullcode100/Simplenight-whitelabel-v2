import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { ConfigurePasswordClientRequest } from '../types/request/ConfigurePasswordClientRequest';

export class ClientAuthConfigurePassword extends ClientRequester<
  ConfigurePasswordClientRequest,
  null,
  ConfigurePasswordClientRequest
> {
  constructor() {
    super({
      name: 'ClientAuthConfigurePassword',
      value: 'ClientAuthConfigurePassword',
    });
  }
  protected override doRequest(
    request: ConfigurePasswordClientRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<null, any>> {
    const url = 'auth/configurePassword';
    return axios.patch(url, request);
  }
}
