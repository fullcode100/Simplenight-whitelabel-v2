import { applyApiAuthUrlV1 } from '../../../apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerRequesterAuth } from '../../../core/server/ServerRequesterAuth';
import { LoginServerResponse } from '../types/response/LoginServerResponse';
import { ConfigurePasswordClientRequest } from '../types/request/ConfigurePasswordClientRequest';

export class ServerAuthConfigurePassword extends ServerRequesterAuth<LoginServerResponse> {
  public constructor() {
    super({
      name: 'ServerAuthConfigurePassword',
      value: 'ServerAuthConfigurePassword',
    });
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<LoginServerResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<LoginServerResponse>> {
    const body: ConfigurePasswordClientRequest = request.body;

    const loginUrl = '/profile';

    const url = applyApiAuthUrlV1(loginUrl);
    const headers = {
      authentication: `Bearer ${body.token}`,
    };
    const bodyRequest = {
      password: body.password,
    };
    return axios.patch<LoginServerResponse>(url, bodyRequest, { headers });
  }
}
