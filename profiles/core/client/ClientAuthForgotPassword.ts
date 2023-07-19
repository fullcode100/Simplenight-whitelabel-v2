import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { LoginServerRequest } from '../types/request/LoginServerRequest';
import { ForgotPasswordServerRequest } from '../types/request/ForgotPasswordServerRequest';

export class ClientAuthForgotPassword extends ClientRequester<
  ForgotPasswordServerRequest,
  null,
  ForgotPasswordServerRequest
> {
  constructor() {
    super({
      name: 'ClientAuthForgotPassword',
      value: 'ClientAuthForgotPassword',
    });
  }
  protected override doRequest(
    request: LoginServerRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<null, any>> {
    const url = 'auth/forgotPassword';
    return axios.post<null>(url, request);
  }
}
