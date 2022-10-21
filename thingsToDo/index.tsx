import { CategoryOption } from 'types/search/SearchTypeOptions';

import { ThingsClientSearcher } from './core/search/ThingsClientSearcher';
import { ThingsServerSearcher } from './core/search/ThingsServerSearcher';
import { ThingsClientDetailer } from './core/detail/ThingsClientDetailer';
import { ThingsServerDetailer } from './core/detail/ThingsServerDetailer';

import ThingsSearchForm from './components/search/ThingsSearchForm';
import ThingsSearchFormReadState from './components/search/ThingsSearchFormReadState';
import ThingsResultsDisplay from './components/search/ThingsResultsDisplay';

import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';
import ThingsDetailDisplay from './components/detail/ThingsDetailDisplay';

export const THINGS_CATEGORY = 'entertainment';

const Category: CategoryOption = {
  id: 3,
  name: THINGS_CATEGORY,
  value: THINGS_CATEGORY,
  icon: <CategoryIcon categoryName={THINGS_CATEGORY} className={'h-5 w-5'} />,
  selectedIcon: <></>,
  searchForm: <ThingsSearchForm />,
  secondarySearchOptions: <></>,
  readStateSearchForm: <ThingsSearchFormReadState />,
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
        client: '/entertainment',
        server: '/entertainment/',
      },
      detail: {
        client: '/entertainment',
        server: '/entertainment',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};
Category.resultsDisplay = <ThingsResultsDisplay ThingsCategory={Category} />;
Category.detailDisplay = <ThingsDetailDisplay Category={Category} />;

// Category.core.ClientSearcher = new ThingsClientSearcher(Category);
// Category.core.ServerSearcher = new ThingsServerSearcher(Category);

// Category.core.ClientDetailer = new ThingsClientDetailer(Category);
// Category.core.ServerDetailer = new ThingsServerDetailer(Category);

export const ThingsCategory = Category;
