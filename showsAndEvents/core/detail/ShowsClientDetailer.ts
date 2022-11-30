import { ClientDetailer } from 'core/client/ClientDetailer';
import {
  ShowsDetailPreRequest,
  ShowsDetailRequest,
} from 'showsAndEvents/types/request/ShowsDetailRequest';
import { ShowDetailResponse } from 'showsAndEvents/types/response/ShowsDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ShowClientDetailer extends ClientDetailer<
  ShowsDetailPreRequest,
  ShowDetailResponse,
  ShowsDetailRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
