import {
  Address,
  CancellationPolicy,
  Category,
  ExtraData,
} from './ThingsDetailResponse';

export interface ThingsCartItemData {
  id: string;
  name: string;
  cancellation_policy: CancellationPolicy;
  supplier: string;
  address: Address;
  phone_number: null;
  reviews: null;
  thumbnail: string;
  categories: Category[];
  extra_data: ExtraData;
}
