import { AxiosInstance, AxiosResponse } from 'axios';
import { Item } from 'types/booking/bookingType';
import { DeleteBookingItemRequest } from 'types/confirmation/DeleteBookingRequest';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ClientRequester } from './ClientRequester';

export class ClientBookingItemRemover extends ClientRequester<
  DeleteBookingItemRequest,
  Item,
  DeleteBookingItemRequest
> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking',
      name: 'Booking',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: DeleteBookingItemRequest,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<Item, any>> {
    const { bookingId, itemId } = request;
    const endpoint = `/bookings/${bookingId}/items/${itemId}`;

    return axios.get<Item>(endpoint);
  }
}
