import { CarDetailResponse } from 'cars/types/response/CarDetailResponse';
import { Car } from 'cars/types/response/SearchResponse';

export interface CarState {
  cars: Car[];
  car: CarDetailResponse | Car;
}
