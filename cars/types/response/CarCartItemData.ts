import { Car } from 'cars/types/response/SearchResponse';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';

export interface CarCartItemData {
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
