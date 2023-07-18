import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';

export class ClientAuthSendVerificationEmail extends ClientRequester<
  string,
  null,
  string
> {
  constructor() {
    super({
      name: 'ClientAuthSendVerificationEmail',
      value: 'ClientAuthSendVerificationEmail',
    });
  }
  protected override doRequest(
    request: string,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<null, any>> {
    const url = 'auth/sendVerificationEmail';
    return axios.post(url, {
      email: request,
    });
  }
}
