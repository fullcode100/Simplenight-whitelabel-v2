import { ClientDetailer } from 'core/client/ClientDetailer';
import {
  VacationDetailPreRequest,
  VacationDetailRequest,
} from 'vacationRental/types/request/VacationDetailRequest';
import { VacationDetailResponse } from 'vacationRental/types/response/VacationDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class VacationClientDetailer extends ClientDetailer<
  VacationDetailRequest,
  VacationDetailResponse,
  VacationDetailPreRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
