import { SearchRequest } from 'types/search/SearchRequest';

export interface ParkingSearchRequest extends SearchRequest {
  type: ParkingType;
  surface_type: ParkingSurfaceType;
}

type ParkingType = 'ON_STREET' | 'PUBLIC' | 'PRIVATE';
type ParkingSurfaceType =
  | 'COVERED'
  | 'MULTISTORY'
  | 'NOT_COVERED'
  | 'UNDERGROUND';
