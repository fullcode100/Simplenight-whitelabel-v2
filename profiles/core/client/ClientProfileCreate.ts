import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { SignUpRequest } from '../types/request/SignUpRequest';
import { SignUpServerResponse } from '../types/response/SignUpServerResponse';

export class ClientProfileCreate extends ClientRequester<
  SignUpRequest,
  SignUpServerResponse,
  SignUpRequest
> {
  constructor() {
    super({
      name: 'ClientProfileCreate',
      value: 'ClientProfileCreate',
    });
  }
  protected override doRequest(
    request: SignUpRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<SignUpServerResponse, any>> {
    const url = 'profile';
    return axios.post<SignUpServerResponse>(url, request);
  }
}
