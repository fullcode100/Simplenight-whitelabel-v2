import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiResponse } from 'next';
import { GetBookingResponse } from 'types/confirmation/GetBookingResponse';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerBookingCancel extends ServerRequester<GetBookingResponse> {
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
    const { id: bookingId } = query;

    const endpoint = `/bookings/${bookingId}`;
    const url = applyApiBaseUrlV2(endpoint, request);

    return axios.delete<ApiResponse<any, GetBookingResponse>>(url);
  }
}
