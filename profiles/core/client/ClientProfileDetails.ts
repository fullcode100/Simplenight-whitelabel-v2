import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { SignUpServerRequest } from '../types/request/SignUpServerRequest';
import { SignUpServerResponse } from '../types/response/SignUpServerResponse';

export class ClientProfileDetails extends ClientRequester<
  null,
  SignUpServerResponse,
  null
> {
  constructor() {
    super({
      name: 'ClientProfileDetails',
      value: 'ClientProfileDetails',
    });
  }
  protected override doRequest(
    request: null,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<SignUpServerResponse, any>> {
    const url = 'profile';
    return axios.get<SignUpServerResponse>(url);
  }
}
