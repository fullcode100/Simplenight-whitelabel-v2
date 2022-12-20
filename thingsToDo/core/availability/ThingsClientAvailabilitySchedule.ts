import { ClientRequester } from 'core/client/ClientRequester';
import { ThingsAvailabilityScheduleRequest } from 'thingsToDo/types/request/ThingsAvailabilityScheduleRequest';
import { ThingsAvailabilityScheduleResponse } from 'thingsToDo/types/response/ThingsAvailabilityScheduleResponse';
import { ThingsDetailPreRequest } from 'thingsToDo/types/request/ThingsDetailRequest';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ThingsClientAvailabilitySchedule extends ClientRequester<
  ThingsAvailabilityScheduleRequest,
  ThingsAvailabilityScheduleResponse,
  ThingsDetailPreRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override doRequest(
    request: ThingsAvailabilityScheduleRequest,
    axios: AxiosInstance,
    id: any,
  ): Promise<AxiosResponse<ThingsAvailabilityScheduleResponse, any>> {
    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }

    const clientScheduleUrl = `${categoryUrls?.availability?.client}/${id}/items/availability/schedule`;

    return axios.get(clientScheduleUrl, {
      params: request,
    });
  }
}
