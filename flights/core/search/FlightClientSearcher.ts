import { ClientSearcher } from 'core/client/ClientSearcher';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import { FlightSearchResponse } from 'flights/types/response/SearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class FlightClientSearcher extends ClientSearcher<
  FlightSearchRequest,
  FlightSearchResponse,
  FlightSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
