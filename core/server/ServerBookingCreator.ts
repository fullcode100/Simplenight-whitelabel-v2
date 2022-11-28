import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiResponse } from 'next';
import { CreateBookingResponse } from 'types/checkout/CreateBookingResponse';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerBookingCreator extends ServerRequester<CreateBookingResponse> {
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
    const { body } = request;

    const endpoint = '/bookings';
    const url = applyApiBaseUrlV2(endpoint, request);

    return axios.post<ApiResponse<any, CreateBookingResponse>>(url, {
      ...body,
    });
  }
}
