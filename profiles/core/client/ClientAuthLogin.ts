import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { LoginRequest } from '../types/request/loginRequest';
import { LoginServerResponse } from '../types/response/LoginServerResponse';

export class ClientAuthLogin extends ClientRequester<
  LoginRequest,
  LoginServerResponse,
  LoginRequest
> {
  constructor() {
    super({
      name: 'ClientAuthLogin',
      value: 'ClientAuthLogin',
    });
  }
  protected override doRequest(
    request: LoginRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<LoginServerResponse, any>> {
    const url = 'auth/login';
    return axios.post<LoginServerResponse>(url, request);
  }
}
