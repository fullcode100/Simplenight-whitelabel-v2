import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';

export class ClientAuthVerifyEmail extends ClientRequester<
  string,
  null,
  string
> {
  constructor() {
    super({
      name: 'ClientAuthVerifyEmail',
      value: 'ClientAuthVerifyEmail',
    });
  }
  protected override doRequest(
    request: string,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<null, any>> {
    const url = `auth/verifyEmail?token=${request}`;
    return axios.post(url);
  }
}
