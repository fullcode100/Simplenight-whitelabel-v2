import { Rate } from '../response/ShowsDetailResponse';
import { Address } from './SearchItem';

export interface DetailItem {
  id: string;
  name: string;
  description: string;
  category: string;
  address: Address;
  rate: Rate;
  seats: [];
  relationId: string;
  startsAt: string;
}
