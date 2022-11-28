import {
  applyApiBaseUrlV2,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiResponse } from 'next';
import { Item } from 'types/booking/bookingType';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerBookingItemRemover extends ServerRequester<Item> {
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
    const { id: bookingId, itemId } = query;

    const endpoint = `/bookings/${bookingId}/items/${itemId}`;
    const url = applyApiBaseUrlV2(endpoint, request);

    return axios.delete<ApiResponse<any, Item>>(url);
  }
}
