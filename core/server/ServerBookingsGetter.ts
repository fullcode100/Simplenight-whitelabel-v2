/* eslint-disable camelcase */
import { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  applyApiBaseUrlV2,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';
import { ServerRequester } from './ServerRequester';
import { ApiResponse } from 'types/global/Request';
import { GetBookingResponse } from 'types/confirmation/GetBookingResponse';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { NextApiRequestWithSession } from 'types/core/server';

export class ServerBookingsGetter extends ServerRequester<GetBookingResponse> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking',
      name: 'Booking',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    _response: NextApiResponse<GetBookingResponse>,
    axios: AxiosInstance,
  ) {
    const { query } = request;
    const { sn_order_number, customer_last_name } = query;

    const endpoint = `/bookings/?sn_order_number=${sn_order_number}&customer_last_name=${customer_last_name}`;

    const url = applyApiBaseUrlV2(endpoint, request);

    return axios.get<ApiResponse<any, GetBookingResponse>>(url);
  }

  protected override postRequestResult(
    _request: NextApiRequest,
    response: NextApiResponse<GetBookingResponse>,
    result: GetBookingResponse,
  ): void {
    if (result.booking) {
      const { booking } = result;
      sendSuccess(response, { booking });
    }
  }
}
