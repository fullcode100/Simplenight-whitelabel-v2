import { CategoryOption } from 'types/search/SearchTypeOptions';

import CarSearchForm from 'cars/components/search/CarSearchForm';

import carReducer from './redux/reducer';
import carActions from './redux/actions';

import CategoryCarsIcon from 'public/icons/categories/Category-Cars.svg';
import CarResultsDisplay from 'cars/components/search/CarResultsDisplay';
import CarDetailDisplay from './components/detail/CarDetailDisplay';
import CarItineraryDisplay from './components/itinerary/CarItineraryDisplay';
import CarBreakdownDisplay from './components/checkout/CarBreakdownDisplay';
import CarConfirmationDisplay from './components/confirmation/CarConfirmationDisplay';
import CarCancelledDisplay from './components/confirmation/CarCancelledDisplay';
import { CarClientSearcher } from './core/search/CarClientSearcher';
import { CarServerSearcher } from './core/search/CarServerSearcher';
import { CarClientDetailer } from './core/detail/CarClientDetailer';
import { CarServerDetailer } from './core/detail/CarServerDetailer';
import CarSearchFormReadState from './components/search/CarSearchFormReadState';
import CarIcon from 'public/icons/assets/car.svg';
import CarSecondarySearchOptions from './components/search/CarSecondarySearchOptions';
import CarCheckoutDisplay from './components/checkout/CarCheckoutDisplay';
import CarCheckoutItemDisplay from './components/checkout/CarCheckoutItemDesplay';

export const CAR_CATEGORY = 'car-rental';

const Category: CategoryOption = {
  id: 2,
  name: CAR_CATEGORY,
  value: CAR_CATEGORY,
  icon: <CarIcon />,
  store: {
    reducer: carReducer,
    actions: carActions,
  },
  selectedIcon: <CategoryCarsIcon />,
  searchForm: <CarSearchForm />,
  secondarySearchOptions: <CarSecondarySearchOptions />,
  readStateSearchForm: <CarSearchFormReadState />,
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
        client: '/cars',
        server: '/cars',
      },
      detail: {
        client: '/cars',
        server: '/cars',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};

Category.resultsDisplay = <CarResultsDisplay CarCategory={Category} />;
Category.detailDisplay = <CarDetailDisplay Category={Category} />;
Category.itineraryDisplay = <CarItineraryDisplay Category={Category} />;
Category.breakdownDisplay = <CarBreakdownDisplay Category={Category} />;
Category.checkoutDisplay = <CarCheckoutDisplay Category={Category} />;
Category.checkoutItemDisplay = <CarCheckoutItemDisplay Category={Category} />;
Category.confirmationDisplay = <CarConfirmationDisplay Category={Category} />;
Category.cancelledDisplay = <CarCancelledDisplay Category={Category} />;

Category.core.ClientSearcher = new CarClientSearcher(Category);
Category.core.ServerSearcher = new CarServerSearcher(Category);

Category.core.ClientDetailer = new CarClientDetailer(Category);
Category.core.ServerDetailer = new CarServerDetailer(Category);

export const CarCategory = Category;
