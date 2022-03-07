import { ServerSearcher } from "core/server/ServerSearcher";
import { HotelSearchResponse } from "hotels/types/response/SearchResponse";
import { CategoryOption } from "types/search/SearchTypeOptions";

export class HotelServerSearcher extends ServerSearcher<HotelSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
