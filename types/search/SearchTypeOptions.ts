import React, { ReactElement } from 'react';
import { CategoryStoreActions } from 'types/redux/categories/CategoryStoreActions';

export type CategoryOptions = CategoryOption[];

export interface CategoryOption {
  id: number;
  name: string;
  value: string;
  icon: ReactElement;
  selectedIcon: ReactElement;
  store: CategoryStore;
  searchForm?: ReactElement;
  resultsDisplay?: ReactElement;
}

export interface CategoryStore {
  actions: CategoryStoreActions;
  reducer: any;
}
