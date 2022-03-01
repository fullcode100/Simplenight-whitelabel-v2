import { CategoryOption } from 'types/search/SearchTypeOptions';

import HotelSearchForm from 'hotels/components/search/HotelSearchForm';

import hotelReducer from './redux/reducer';
import hotelActions from './redux/actions';

import BedFillGray from 'public/icons/categories/BedFillGray.svg';
import HotelResultsDisplay from 'hotels/components/search/HotelResultsDisplay';

export const HOTEL_CATEGORY = 'hotels';

const Category: CategoryOption = {
  id: 2,
  name: HOTEL_CATEGORY,
  value: HOTEL_CATEGORY,
  icon: <BedFillGray />,
  store: {
    reducer: hotelReducer,
    actions: hotelActions,
  },
  selectedIcon: <BedFillGray />,
  searchForm: <HotelSearchForm />,
  resultsDisplay: <></>,
};

Category.resultsDisplay = <HotelResultsDisplay HotelCategory={Category} />;

export const HotelCategory = Category;
