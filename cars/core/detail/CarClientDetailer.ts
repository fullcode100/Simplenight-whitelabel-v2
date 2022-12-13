import { ClientDetailer } from 'core/client/ClientDetailer';
import {
  CarDetailPreRequest,
  CarDetailRequest,
} from 'cars/types/request/CarDetailRequest';
import { CarDetailResponse } from 'cars/types/response/CarDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class CarClientDetailer extends ClientDetailer<
  CarDetailRequest,
  CarDetailResponse,
  CarDetailPreRequest
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
    request: CarDetailPreRequest,
    ...args: any
  ): CarDetailRequest {
    let newRequest = Object.assign({}, request as any);

    newRequest = this.flattenOccupancy(newRequest);

    return newRequest;
  }
}
