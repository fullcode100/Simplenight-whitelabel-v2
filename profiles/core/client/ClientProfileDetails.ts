import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { SignUpRequest } from '../types/request/SignUpRequest';
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
