import { CategoryOption } from 'types/search/SearchTypeOptions';

import { DiningClientSearcher } from './core/search/DiningClientSearcher';
import { DiningServerSearcher } from './core/search/DiningServerSearcher';
import { DiningClientDetailer } from './core/detail/DiningClientDetailer';
import { DiningServerDetailer } from './core/detail/DiningServerDetailer';

import DiningSearchForm from 'dining/components/search/DiningSearchForm';

import DiningCategoryIcon from 'public/icons/categories/Category-Dining.svg';
import DiningResultsDisplay from 'dining/components/search/DiningResultsDisplay';
import DiningDetailDisplay from './components/detail/DiningDetailDisplay';
import DiningSearchFormReadState from './components/search/DiningSearchFormReadState';
import DiningSecondarySearchOptions from './components/search/DiningSecondarySearchOptions';
import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';
import DiningItineraryDisplay from './components/itinerary/DiningItineraryDisplay';
import diningReducer from './redux/reducer';
import diningActions from './redux/actions';
import DiningCheckoutItemDisplay from './components/checkout/DiningCheckoutItemDisplay';
import DiningConfirmationDisplay from './components/confirmation/DiningConfirmationDisplay';
import DiningCancelledDisplay from './components/confirmation/DiningCancelledDisplay';
import DiningBreakdownDisplay from './components/checkout/DiningBreakDownDisplay';

export const DINING_CATEGORY = 'dining';

const Category: CategoryOption = {
  id: 4,
  name: DINING_CATEGORY,
  value: DINING_CATEGORY,
  icon: <CategoryIcon categoryName={DINING_CATEGORY} className={'h-5 w-5'} />,
  store: {
    reducer: diningReducer,
    actions: diningActions,
  },
  selectedIcon: <DiningCategoryIcon />,
  searchForm: <DiningSearchForm />,
  secondarySearchOptions: <DiningSecondarySearchOptions />,
  readStateSearchForm: <DiningSearchFormReadState />,
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
        client: '/dining',
        server: '/categories/dining',
      },
      detail: {
        client: '/dining',
        server: '/categories/dining/items/details',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};

Category.resultsDisplay = <DiningResultsDisplay />;
Category.detailDisplay = <DiningDetailDisplay Category={Category} />;
Category.itineraryDisplay = <DiningItineraryDisplay Category={Category} />;
Category.checkoutItemDisplay = (
  <DiningCheckoutItemDisplay Category={Category} />
);
Category.confirmationDisplay = (
  <DiningConfirmationDisplay Category={Category} />
);
Category.cancelledDisplay = <DiningCancelledDisplay Category={Category} />;
Category.breakdownDisplay = <DiningBreakdownDisplay Category={Category} />;

Category.core.ClientSearcher = new DiningClientSearcher(Category);
Category.core.ServerSearcher = new DiningServerSearcher(Category);

Category.core.ClientDetailer = new DiningClientDetailer(Category);
Category.core.ServerDetailer = new DiningServerDetailer(Category);

export const DiningCategory = Category;
