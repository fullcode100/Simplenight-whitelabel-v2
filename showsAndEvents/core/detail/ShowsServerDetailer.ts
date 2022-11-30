import { ServerDetailer } from 'core/server/ServerDetailer';
import { ShowDetailResponse } from 'showsAndEvents/types/response/ShowsDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ShowsServerDetailer extends ServerDetailer<ShowDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
