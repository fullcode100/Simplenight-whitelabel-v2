import { ClientSearcher } from 'core/client/ClientSearcher';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { HotelSearchResponse } from 'hotels/types/response/SearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class HotelClientSearcher extends ClientSearcher<
  HotelSearchRequest,
  HotelSearchResponse,
  HotelSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
