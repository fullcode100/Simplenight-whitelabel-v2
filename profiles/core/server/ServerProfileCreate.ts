import { applyApiAuthUrlV1 } from '../../../apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerRequesterAuth } from '../../../core/server/ServerRequesterAuth';
import { SignUpServerResponse } from '../types/response/SignUpServerResponse';
import { LoginServerRequest } from '../types/request/LoginServerRequest';

export class ServerProfileCreate extends ServerRequesterAuth<SignUpServerResponse> {
  public constructor() {
    super({
      name: 'ServerProfileCreate',
      value: 'ServerProfileCreate',
    });
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<SignUpServerResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<SignUpServerResponse>> {
    const body: LoginServerRequest = request.body;

    const loginUrl = '/profile';

    const url = applyApiAuthUrlV1(loginUrl);
    return axios.post<SignUpServerResponse>(url, body);
  }
}
