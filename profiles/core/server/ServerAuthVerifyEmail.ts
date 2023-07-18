import { applyApiAuthUrlV1 } from '../../../apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerRequesterAuth } from '../../../core/server/ServerRequesterAuth';

export class ServerAuthVerifyEmail extends ServerRequesterAuth<null> {
  public constructor() {
    super({
      name: 'ServerAuthVerifyEmail',
      value: 'ServerAuthVerifyEmail',
    });
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<null>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<null>> {
    const loginUrl = `/auth/verify-email?token=${request.query.token}`;

    const url = applyApiAuthUrlV1(loginUrl);
    return axios.post<null>(url);
  }
}
