import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from 'core/client/ClientRequester';
import { ThingsAvailabilityRequest } from 'thingsToDo/types/request/ThingsAvailabilityRequest';
import { ThingsDetailPreRequest } from 'thingsToDo/types/request/ThingsDetailRequest';
import { Ticket } from 'thingsToDo/types/response/ThingsDetailResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsClientAvailability extends ClientRequester<
  ThingsAvailabilityRequest,
  Ticket[],
  ThingsDetailPreRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: ThingsAvailabilityRequest,
    axios: AxiosInstance,
    id: any,
  ): Promise<AxiosResponse<Ticket[], any>> {
    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }

    const clientAvailabilityUrl = `${categoryUrls?.availability?.client}/${id}/items/availability`;

    return axios.post<Ticket[]>(clientAvailabilityUrl, {
      data: { request, id },
    });
  }
}
