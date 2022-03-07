import { ClientDetailer } from "core/client/ClientDetailer";
import { HotelDetailRequest } from "hotels/types/request/HotelDetailRequest";
import { HotelDetailResponse } from "hotels/types/response/HotelDetailResponse";
import { CategoryOption } from "types/search/SearchTypeOptions";

export class HotelClientDetailer extends ClientDetailer<HotelDetailRequest, HotelDetailResponse, HotelDetailRequest> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
