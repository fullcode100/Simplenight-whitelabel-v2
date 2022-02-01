import { LocationPrefix } from './LocationPrefixResponse';

export interface BasicSearchFormData {
  startLocation: LocationPrefix | null;
  startDate: string;
}
