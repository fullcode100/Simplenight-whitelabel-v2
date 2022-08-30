import { ClientSearcher } from 'core/client/ClientSearcher';
import {
  VacationSearchPreRequest,
  VacationSearchRequest,
} from 'vacationRental/types/request/VacationSearchRequest';
import { VacationSearchResponse } from 'vacationRental/types/response/VacationSearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class VacationClientSearcher extends ClientSearcher<
  VacationSearchRequest,
  VacationSearchResponse,
  VacationSearchPreRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
