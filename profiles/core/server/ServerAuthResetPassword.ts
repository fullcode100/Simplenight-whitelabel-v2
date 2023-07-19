import { applyApiAuthUrlV1 } from '../../../apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerRequesterAuth } from '../../../core/server/ServerRequesterAuth';
import { ResetPasswordClientRequest } from '../types/request/ResetPasswordClientRequest';
import { ResetPasswordServerRequest } from '../types/request/ResetPasswordServerRequest';

export class ServerAuthResetPassword extends ServerRequesterAuth<null> {
  public constructor() {
    super({
      name: 'ServerAuthResetPassword',
      value: 'ServerAuthResetPassword',
    });
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<null>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<null>> {
    const body: ResetPasswordClientRequest = request.body;
    const url = applyApiAuthUrlV1(`/auth/reset-password?token=${body.token}`);
    const requestBody: ResetPasswordServerRequest = { password: body.password };
    return axios.post<null>(url, requestBody);
  }
}
