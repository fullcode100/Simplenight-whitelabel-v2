import { applyApiAuthUrlV1 } from '../../../apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerRequesterAuth } from '../../../core/server/ServerRequesterAuth';
import { LoginServerResponse } from '../types/response/LoginServerResponse';

export class ServerAuthSendVerificationEmail extends ServerRequesterAuth<null> {
  public constructor() {
    super({
      name: 'ServerAuthSendVerificationEmail',
      value: 'ServerAuthSendVerificationEmail',
    });
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<null>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<null>> {
    const loginUrl = '/auth/send-verification-email';

    const url = applyApiAuthUrlV1(loginUrl);
    return axios.post<null>(url);
  }
}
