import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from '../../../core/client/ClientRequester';
import { SignUpServerResponse } from '../types/response/SignUpServerResponse';
import { SignUpClientRequest } from '../types/request/SignUpClientRequest';
import { generateRandomString, setTemporalCredentials } from '../utils';

export class ClientProfileCreate extends ClientRequester<
  SignUpClientRequest,
  SignUpServerResponse,
  SignUpClientRequest
> {
  constructor() {
    super({
      name: 'ClientProfileCreate',
      value: 'ClientProfileCreate',
    });
  }
  protected override async doRequest(
    request: SignUpClientRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<SignUpServerResponse, any>> {
    const url = 'profile';
    const temporalPassword = generateRandomString();
    const result = await axios.post<SignUpServerResponse>(url, {
      ...request,
      password: temporalPassword,
    });
    setTemporalCredentials({
      email: request.email,
      password: temporalPassword,
    });
    return result;
  }
}
