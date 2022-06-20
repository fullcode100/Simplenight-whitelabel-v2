import { AxiosInstance, AxiosResponse } from 'axios';
import { GetBookingRequest } from 'types/confirmation/GetBookingRequest';
import { GetBookingResponse } from 'types/confirmation/GetBookingResponse';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ClientRequester } from './ClientRequester';

export class ClientBookingGetter extends ClientRequester<
  GetBookingRequest,
  GetBookingResponse,
  GetBookingRequest
> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking',
      name: 'Booking',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: GetBookingRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<GetBookingResponse, any>> {
    const { id } = request;
    const endpoint = `/bookings/${id}`;

    return axios.get<GetBookingResponse>(endpoint);
  }
}
