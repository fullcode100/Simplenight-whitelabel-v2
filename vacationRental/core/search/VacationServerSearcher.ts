import { ServerSearcher } from 'core/server/ServerSearcher';
import { VacationSearchResponse } from 'vacationRental/types/response/VacationSearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class VacationServerSearcher extends ServerSearcher<VacationSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
