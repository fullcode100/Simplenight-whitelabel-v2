import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { ResetPasswordClientRequest } from '../types/request/ResetPasswordClientRequest';

export class ClientAuthResetPassword extends ClientRequester<
  ResetPasswordClientRequest,
  null,
  ResetPasswordClientRequest
> {
  constructor() {
    super({
      name: 'ClientAuthResetPassword',
      value: 'ClientAuthResetPassword',
    });
  }
  protected override doRequest(
    request: ResetPasswordClientRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<null, any>> {
    const url = 'auth/resetPassword';
    return axios.post<null>(url, request);
  }
}
