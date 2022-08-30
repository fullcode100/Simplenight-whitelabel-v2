import { CategoryOption } from 'types/search/SearchTypeOptions';

import VacationIcon from 'public/icons/categories/Category-Hotel.svg';
import { VacationClientSearcher } from './core/search/VacationClientSearcher';
import { VacationServerSearcher } from './core/search/VacationServerSearcher';
import { VacationClientDetailer } from './core/detail/VacationClientDetailer';
import { VacationServerDetailer } from './core/detail/VacationServerDetailer';

export const VACATION_RENTAL_CATEGORY = 'vacation-rental';

const Category: CategoryOption = {
  id: 3,
  name: VACATION_RENTAL_CATEGORY,
  value: VACATION_RENTAL_CATEGORY,
  icon: <VacationIcon />,
  selectedIcon: <></>,
  searchForm: <></>,
  secondarySearchOptions: <></>,
  readStateSearchForm: <></>,
  resultsDisplay: <></>,
  detailDisplay: <></>,
  itineraryDisplay: <></>,
  breakdownDisplay: <></>,
  checkoutDisplay: <></>,
  confirmationDisplay: <></>,
  cancelledDisplay: <></>,
  core: {
    urls: {
      search: {
        client: '/vacation-rental',
        server: '/vacation-rental/',
      },
      detail: {
        client: '/vacation-rental',
        server: '/vacation-rental',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};

// Category.core.ClientSearcher = new VacationClientSearcher(Category);
// Category.core.ServerSearcher = new VacationServerSearcher(Category);

// Category.core.ClientDetailer = new VacationClientDetailer(Category);
// Category.core.ServerDetailer = new VacationServerDetailer(Category);

export const VacationCategory = Category;
