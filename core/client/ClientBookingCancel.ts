import { AxiosInstance, AxiosResponse } from 'axios';
import { GetBookingResponse } from 'types/confirmation/GetBookingResponse';
import { CancelBookingRequest } from 'types/confirmation/DeleteBookingRequest';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ClientRequester } from './ClientRequester';

export class ClientBookingCancel extends ClientRequester<
  CancelBookingRequest,
  GetBookingResponse,
  CancelBookingRequest
> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking',
      name: 'Booking',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: CancelBookingRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<GetBookingResponse, any>> {
    const { bookingId } = request;
    const endpoint = request.apiUrl;
    const url = `${endpoint || '/bookings'}/${bookingId}`;
    delete request.apiUrl;

    return axios.delete<GetBookingResponse>(url);
  }
}
