import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { LoginServerResponse } from '../types/response/LoginServerResponse';
import { LoginServerRequest } from '../types/request/LoginServerRequest';

export class ClientAuthLogin extends ClientRequester<
  LoginServerRequest,
  LoginServerResponse,
  LoginServerRequest
> {
  constructor() {
    super({
      name: 'ClientAuthLogin',
      value: 'ClientAuthLogin',
    });
  }
  protected override doRequest(
    request: LoginServerRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<LoginServerResponse, any>> {
    const url = 'auth/login';
    return axios.post<LoginServerResponse>(url, request);
  }
}
