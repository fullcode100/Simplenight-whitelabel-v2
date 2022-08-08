import { ServerDetailer } from 'core/server/ServerDetailer';
import { ThingsDetailResponse } from 'thingsToDo/types/response/ThingsDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsServerDetailer extends ServerDetailer<ThingsDetailResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
