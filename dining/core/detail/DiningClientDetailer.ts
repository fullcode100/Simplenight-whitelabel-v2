import { ClientDetailer } from 'core/client/ClientDetailer';
import {
  DiningDetailPreRequest,
  DiningDetailRequest,
} from 'dining/types/request/DiningDetailRequest';
import { DiningDetailResponse } from 'dining/types/response/DiningDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class DiningClientDetailer extends ClientDetailer<
  DiningDetailRequest,
  DiningDetailResponse,
  DiningDetailPreRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override preRequest(
    request: DiningDetailPreRequest,
    ...args: any
  ): DiningDetailRequest {
    const newRequest = Object.assign({}, request as any);

    return newRequest;
  }
}
