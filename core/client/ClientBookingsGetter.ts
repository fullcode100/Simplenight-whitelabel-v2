import { GetBookingsRequest } from 'types/confirmation/GetBookingRequest';
import { GetBookingResponse } from 'types/confirmation/GetBookingResponse';
import { ClientRequester } from './ClientRequester';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ClientBookingsGetter extends ClientRequester<
  GetBookingsRequest,
  GetBookingResponse,
  GetBookingsRequest
> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking',
      name: 'Booking',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: GetBookingsRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<GetBookingResponse, any>> {
    const { snOrderNumber, customerLastName } = request;
    const endpoint = `/bookings/?sn_order_number=${snOrderNumber}&customer_last_name=${customerLastName}`;

    return axios.get<GetBookingResponse>(endpoint);
  }
}
