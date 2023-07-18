import { applyApiAuthUrlV1 } from '../../../apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerRequesterAuth } from '../../../core/server/ServerRequesterAuth';
import { ProfileDetailsServerResponse } from '../types/response/ProfileDetailsServerResponse';

export class ServerProfileDetails extends ServerRequesterAuth<ProfileDetailsServerResponse> {
  public constructor() {
    super({
      name: 'ServerProfileDetails',
      value: 'ServerProfileDetails',
    });
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse<ProfileDetailsServerResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ProfileDetailsServerResponse>> {
    const loginUrl = '/profile';

    const url = applyApiAuthUrlV1(loginUrl);
    return axios.get<ProfileDetailsServerResponse>(url);
  }
}
