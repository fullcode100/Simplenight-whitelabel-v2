import {
  applyApiBaseUrlV2,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { GetBookingResponse } from 'types/confirmation/GetBookingResponse';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerBookingGetter extends ServerRequester<GetBookingResponse> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking',
      name: 'Booking',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    _response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query } = request;
    const { id } = query;

    const endpoint = `/bookings/${id}`;

    const url = applyApiBaseUrlV2(endpoint, request);

    return axios.get<ApiResponse<any, GetBookingResponse>>(url);
  }

  protected override postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<GetBookingResponse>,
    result: GetBookingResponse,
  ): void {
    if (result.booking) {
      const { booking } = result;
      sendSuccess(response, { booking });
    }
  }
}
