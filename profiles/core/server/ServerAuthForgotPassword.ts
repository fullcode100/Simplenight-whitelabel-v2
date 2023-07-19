import { applyApiAuthUrlV1 } from '../../../apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerRequesterAuth } from '../../../core/server/ServerRequesterAuth';
import { LoginServerResponse } from '../types/response/LoginServerResponse';
import { LoginServerRequest } from '../types/request/LoginServerRequest';

export class ServerAuthForgotPassword extends ServerRequesterAuth<LoginServerResponse> {
  public constructor() {
    super({
      name: 'ServerAuthForgotPassword',
      value: 'ServerAuthForgotPassword',
    });
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<LoginServerResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<LoginServerResponse>> {
    const body: LoginServerRequest = request.body;

    const loginUrl = '/auth/forgot-password';

    const url = applyApiAuthUrlV1(loginUrl);
    return axios.post<LoginServerResponse>(url, body);
  }
}
