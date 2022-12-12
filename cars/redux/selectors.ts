import { useAppSelector } from 'hooks/redux/useAppSelector';
import { CarDetailResponse } from 'cars/types/response/CarDetailResponse';
import { CarState } from './CarState';

// const select = (selector: (state: any) => any) => useAppSelector(selector);

export const getCars = (state: CarState) => state.cars;

/*
export const getCarDetail = (): CarDetailResponse =>
  select((state: any) => state.cars.car);
*/
