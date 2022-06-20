import { AxiosInstance, AxiosResponse } from 'axios';
import { CreateBookingRequest } from 'types/checkout/CreateBookingRequest';
import { CreateBookingResponse } from 'types/checkout/CreateBookingResponse';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ClientRequester } from './ClientRequester';

export class ClientBookingCreator extends ClientRequester<
  CreateBookingRequest,
  CreateBookingResponse,
  CreateBookingRequest
> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking',
      name: 'Booking',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: CreateBookingRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<CreateBookingResponse, any>> {
    const url = '/bookings';

    return axios.post<CreateBookingResponse>(url, {
      ...request,
    });
  }
}
