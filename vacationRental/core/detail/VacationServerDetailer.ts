import { ServerDetailer } from 'core/server/ServerDetailer';
import { VacationDetailResponse } from 'vacationRental/types/response/VacationDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class VacationServerDetailer extends ServerDetailer<VacationDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
