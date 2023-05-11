import { AxiosInstance, AxiosResponse } from 'axios';
import { CreateBookingRequest } from 'types/checkout/CreateBookingRequest';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ClientRequester } from './ClientRequester';

export class ClientBookingValidator extends ClientRequester<
  CreateBookingRequest,
  boolean,
  CreateBookingRequest
> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking validator',
      name: 'Booking validator',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: CreateBookingRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<boolean, any>> {
    const endpoint = request.apiUrl;
    const url = endpoint || '';
    delete request.apiUrl;

    return axios.post<boolean>(url, {
      ...request,
    });
  }
}
