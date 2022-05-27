import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { CreateBookingResponse } from 'types/checkout/CreateBookingResponse';
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
    request: NextApiRequest,
    _response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { body } = request;

    const endpoint = '/bookings';
    const url = applyApiBaseUrlV2(endpoint);

    return axios.post<ApiResponse<any, CreateBookingResponse>>(url, {
      ...body,
    });
  }
}
