import { ClientDetailer } from 'core/client/ClientDetailer';
import {
  HotelDetailPreRequest,
  HotelDetailRequest,
} from 'hotels/types/request/HotelDetailRequest';
import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class HotelClientDetailer extends ClientDetailer<
  HotelDetailRequest,
  HotelDetailResponse,
  HotelDetailPreRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected flattenOccupancy(request: any) {
    Object.keys(request.occupancy).forEach((key) => {
      request[key] = request.occupancy[key];
    });

    delete request.occupancy;

    return request;
  }

  protected override preRequest(
    request: HotelDetailPreRequest,
    ...args: any
  ): HotelDetailRequest {
    let newRequest = Object.assign({}, request as any);

    newRequest = this.flattenOccupancy(newRequest);

    return newRequest;
  }
}
