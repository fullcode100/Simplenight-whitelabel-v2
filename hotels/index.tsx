import { CategoryOption } from 'types/search/SearchTypeOptions';

import HotelSearchForm from 'hotels/components/search/HotelSearchForm';

import hotelReducer from './redux/reducer';
import hotelActions from './redux/actions';

import BedFillGray from 'public/icons/categories/BedFillGray.svg';
import HotelResultsDisplay from 'hotels/components/search/HotelResultsDisplay';
import HotelDetailDisplay from './components/detail/HotelDetailDisplay';
import { HotelClientSearcher } from './core/search/HotelClientSearcher';
import { HotelServerSearcher } from './core/search/HotelServerSearcher';
import { HotelClientDetailer } from './core/detail/HotelClientDetailer';
import { HotelServerDetailer } from './core/detail/HotelServerDetailer';

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
  detailDisplay: <></>,
  core: {
    urls: {
      search: {
        client: '/api/hotels',
        server: '/hotels/',
      },
      detail: {
        client: '/hotels',
        server: '/multi/hotel-details',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};

Category.resultsDisplay = <HotelResultsDisplay HotelCategory={Category} />;
Category.detailDisplay = <HotelDetailDisplay Category={Category} />;

Category.core.ClientSearcher = new HotelClientSearcher(Category);
Category.core.ServerSearcher = new HotelServerSearcher(Category);

Category.core.ClientDetailer = new HotelClientDetailer(Category);
Category.core.ServerDetailer = new HotelServerDetailer(Category);

export const HotelCategory = Category;
