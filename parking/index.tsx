import { CategoryOption } from 'types/search/SearchTypeOptions';
import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';
import { ParkingSearchForm } from './components/search/ParkingSearchForm';
import { ParkingSearchFormReadState } from './components/search/ParkingSearchFormReadState';
import { ParkingSecondarySearchOptions } from './components/search/ParkingSecondarySearchOptions';
import { ParkingResultsDisplay } from './components/search/ParkingResultsDisplay';
import { ParkingClientSearcher } from './core/search/ParkingClientSearcher';
import { ParkingServerSearcher } from './core/search/ParkingServerSearcher';
import { ParkingServerDetailer } from './core/detail/ParkingServerDetailer';
import { ParkingClientDetailer } from './core/detail/ParkingClientDetailer';
import { ParkingDetailDisplay } from './components/detail';
import {
  ParkingBreakdownDisplay,
  ParkingItineraryDisplay,
} from './components/Itinerary';

export const PARKING_CATEGORY = 'parking';

const Category: CategoryOption = {
  id: 3,
  name: PARKING_CATEGORY,
  value: PARKING_CATEGORY,
  icon: <CategoryIcon categoryName={PARKING_CATEGORY} className={'h-5 w-5'} />,
  selectedIcon: <></>,
  searchForm: <ParkingSearchForm />,
  secondarySearchOptions: <ParkingSecondarySearchOptions />,
  readStateSearchForm: <ParkingSearchFormReadState />,
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
        client: '/parking',
        server: '/categories/parking/items/details',
      },
      detail: {
        client: '/parking',
        server: '/categories/parking/items/details',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};

Category.resultsDisplay = <ParkingResultsDisplay parkingCategory={Category} />;
Category.detailDisplay = <ParkingDetailDisplay Category={Category} />;

Category.itineraryDisplay = <ParkingItineraryDisplay Category={Category} />;
Category.breakdownDisplay = <ParkingBreakdownDisplay Category={Category} />;
Category.checkoutDisplay = <></>;
Category.confirmationDisplay = <></>;
Category.cancelledDisplay = <></>;

Category.core.ClientSearcher = new ParkingClientSearcher(Category);
Category.core.ServerSearcher = new ParkingServerSearcher(Category);

Category.core.ClientDetailer = new ParkingClientDetailer(Category);
Category.core.ServerDetailer = new ParkingServerDetailer(Category);
export const ParkingCategory = Category;
