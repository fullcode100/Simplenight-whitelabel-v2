import { ClientDetailer } from 'core/client/ClientDetailer';
import {
  FlightDetailPreRequest,
  FlightDetailRequest,
} from 'flights/types/request/FlightDetailRequest';
import { FlightDetailResponse } from 'flights/types/response/FlightDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class FlightClientDetailer extends ClientDetailer<
  FlightDetailRequest,
  FlightDetailResponse,
  FlightDetailPreRequest
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
    request: FlightDetailPreRequest,
    ...args: any
  ): FlightDetailRequest {
    let newRequest = Object.assign({}, request as any);

    newRequest = this.flattenOccupancy(newRequest);

    return newRequest;
  }
}
