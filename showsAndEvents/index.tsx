import { CategoryOption } from 'types/search/SearchTypeOptions';

import { ShowsClientSearcher } from './core/search/ShowsClientSearcher';
import { ShowsServerSearcher } from './core/search/ShowsServerSearcher';
import { ShowClientDetailer } from './core/detail/ShowsClientDetailer';
import { ShowsServerDetailer } from './core/detail/ShowsServerDetailer';

import ShowsItineraryDisplay from './components/itinerary/ShowsItineraryDisplay';
import ShowsAndEvents from './components/search/ShowsAndEventsSearchForm';
import ShowsSearchFormReadState from './components/search/ShowsSearchFormReadState';
import ThingsResultsDisplay from './components/search/SearchAndEventsResultsDisplay';

import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';
import ShowsSecondarySearchOptions from './components/search/ShowsSecondarySearchOptions';
import ShowAndEventsDetailDisplay from './components/detail/ShowAndEventsDetailDisplay';
import HomeContent from './components/HomeContent/HomeContent';
import ShowsCheckoutDisplay from './components/checkout/ShowsCheckoutDisplay';
import ShowsCheckoutItemDisplay from './components/checkout/ShowsCheckoutItemDisplay';
import ShowsBreakdownDisplay from './components/checkout/ShowsBreakdownDisplay';
import ShowsConfirmationDisplay from './components/confirmation/ShowsConfirmationDisplay';
import showAndEventsReducer from './redux/reducer';

export const SHOWS_AND_EVENTS = 'shows-events';
export const categorySectorUUID = '97807fd1-6561-4f3b-a798-42233d9e2b09';
const Category: CategoryOption = {
  id: 5,
  name: SHOWS_AND_EVENTS,
  value: SHOWS_AND_EVENTS,
  icon: <CategoryIcon categoryName={SHOWS_AND_EVENTS} className={'h-5 w-5'} />,
  store: {
    reducer: showAndEventsReducer,
  },
  selectedIcon: <></>,
  searchForm: <ShowsAndEvents />,
  secondarySearchOptions: <ShowsSecondarySearchOptions />,
  readStateSearchForm: <ShowsSearchFormReadState />,
  resultsDisplay: <></>,
  detailDisplay: <></>,
  itineraryDisplay: <></>,
  breakdownDisplay: <></>,
  checkoutDisplay: <></>,
  confirmationDisplay: <></>,
  cancelledDisplay: <></>,
  homeDisplay: <></>,
  core: {
    urls: {
      search: {
        client: '/showsAndEvents',
        server: '/categories/shows-events',
      },
      detail: {
        client: '/showsAndEvents',
        server: '/categories/items/details',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};
Category.resultsDisplay = <ThingsResultsDisplay ShowsCategory={Category} />;
Category.detailDisplay = <ShowAndEventsDetailDisplay Category={Category} />;
Category.itineraryDisplay = <ShowsItineraryDisplay Category={Category} />;
Category.homeDisplay = <HomeContent Category={Category} />;
Category.checkoutItemDisplay = <ShowsCheckoutItemDisplay Category={Category} />;
Category.breakdownDisplay = <ShowsBreakdownDisplay Category={Category} />;
Category.checkoutDisplay = <ShowsCheckoutDisplay Category={Category} />;
Category.confirmationDisplay = <ShowsConfirmationDisplay Category={Category} />;

Category.core.ClientSearcher = new ShowsClientSearcher(Category);
Category.core.ServerSearcher = new ShowsServerSearcher(Category);

Category.core.ClientDetailer = new ShowClientDetailer(Category);
Category.core.ServerDetailer = new ShowsServerDetailer(Category);

export const ShowsAndEventsCategory = Category;
