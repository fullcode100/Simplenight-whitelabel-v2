import {
  Address,
  CancellationPolicy,
  Category,
  Rates,
} from '../response/ThingsSearchResponse';

export interface SearchItem {
  id: string;
  name: string;
  cancellationPolicy: CancellationPolicy;
  rate: Rates;
  thumbnail: string;
  description: string;
  rating: number;
  reviewAmount: number;
  totalAmount: string;
  categories: Category[];
  address: Address;
  mainCategory: string;
}
