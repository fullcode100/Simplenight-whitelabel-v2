import { ReactElement } from 'react';

export type SearchTypeOptions = SearchTypeOption[];

export interface SearchTypeOption {
  id: number;
  name: string;
  value: string;
  icon: ReactElement;
  selectedIcon: ReactElement;
  searchForm?: ReactElement;
}
