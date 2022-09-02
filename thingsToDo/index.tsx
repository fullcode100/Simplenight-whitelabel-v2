import { CategoryOption } from 'types/search/SearchTypeOptions';

import ThingsIcon from 'public/icons/categories/Category-Things.svg';
import { ThingsClientSearcher } from './core/search/ThingsClientSearcher';
import { ThingsServerSearcher } from './core/search/ThingsServerSearcher';
import { ThingsClientDetailer } from './core/detail/ThingsClientDetailer';
import { ThingsServerDetailer } from './core/detail/ThingsServerDetailer';
import ThingsSearchForm from './components/search/ThingsSearchForm';

export const THINGS_CATEGORY = 'things-to-do';

const Category: CategoryOption = {
  id: 3,
  name: THINGS_CATEGORY,
  value: THINGS_CATEGORY,
  icon: <ThingsIcon />,
  selectedIcon: <></>,
  searchForm: <ThingsSearchForm />,
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
        client: '/things-to-do',
        server: '/things-to-do/',
      },
      detail: {
        client: '/things-to-do',
        server: '/things-to-do',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};

// Category.core.ClientSearcher = new ThingsClientSearcher(Category);
// Category.core.ServerSearcher = new ThingsServerSearcher(Category);

// Category.core.ClientDetailer = new ThingsClientDetailer(Category);
// Category.core.ServerDetailer = new ThingsServerDetailer(Category);

export const ThingsCategory = Category;
