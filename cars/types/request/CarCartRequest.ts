import { Car } from 'cars/types/response/SearchResponse';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';
import { CartBookingData } from 'types/cart/CartType';

export interface CarCartRequestDetail extends CartBookingData {
  inventory_id?: string; // ???
  search: CarSearchRequest; // search criteria
  car: Car; // selected car
  rate?: {
    total: {
      prepaid: {
        amount: number;
        currency: string;
      };
    };
  };
}
