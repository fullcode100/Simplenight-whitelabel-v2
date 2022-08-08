import { ClientDetailer } from 'core/client/ClientDetailer';
import {
  ThingsDetailPreRequest,
  ThingsDetailRequest,
} from 'thingsToDo/types/request/ThingsDetailRequest';
import { ThingsDetailResponse } from 'thingsToDo/types/response/ThingsDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsClientDetailer extends ClientDetailer<
  ThingsDetailRequest,
  ThingsDetailResponse,
  ThingsDetailPreRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
