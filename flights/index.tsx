import { CategoryOption } from 'types/search/SearchTypeOptions';

import FlightSearchForm from 'flights/components/search/FlightSearchForm';

import flightReducer from './redux/reducer';
import flightActions from './redux/actions';

import BedFillGray from 'public/icons/categories/BedFillGray.svg';
import FlightResultsDisplay from 'flights/components/search/FlightResultsDisplay';
import FlightDetailDisplay from './components/detail/FlightDetailDisplay';
import FlightItineraryDisplay from './components/itinerary/FlightItineraryDisplay';
import FlightBreakdownDisplay from './components/checkout/FlightBreakdownDisplay';
import FlightConfirmationDisplay from './components/confirmation/FlightConfirmationDisplay';
import FlightCancelledDisplay from './components/confirmation/FlightCancelledDisplay';
import { FlightClientSearcher } from './core/search/FlightClientSearcher';
import { FlightServerSearcher } from './core/search/FlightServerSearcher';
import { FlightClientDetailer } from './core/detail/FlightClientDetailer';
import { FlightServerDetailer } from './core/detail/FlightServerDetailer';
import FlightSearchFormReadState from './components/search/FlightSearchFormReadState';
import FlightsIcon from 'public/icons/assets/flights1.svg';
import FlightSecondarySearchOptions from './components/search/FlightSecondarySearchOptions';
import FlightCheckoutDisplay from './components/checkout/FlightCheckoutDisplay';

export const FLIGHT_CATEGORY = 'flights';

const Category: CategoryOption = {
  id: 2,
  name: FLIGHT_CATEGORY,
  value: FLIGHT_CATEGORY,
  icon: <FlightsIcon />,
  store: {
    reducer: flightReducer,
    actions: flightActions,
  },
  selectedIcon: <BedFillGray />,
  searchForm: <FlightSearchForm />,
  secondarySearchOptions: <FlightSecondarySearchOptions />,
  readStateSearchForm: <FlightSearchFormReadState />,
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
        client: '/flights',
        server: '/flights/',
      },
      detail: {
        client: '/flights',
        server: '/flights',
      },
    },
    ClientSearcher: null,
    ServerSearcher: null,
    ClientDetailer: null,
    ServerDetailer: null,
  },
};

Category.resultsDisplay = <FlightResultsDisplay FlightCategory={Category} />;
Category.detailDisplay = <FlightDetailDisplay Category={Category} />;
Category.itineraryDisplay = <FlightItineraryDisplay Category={Category} />;
Category.breakdownDisplay = <FlightBreakdownDisplay Category={Category} />;
Category.checkoutDisplay = <FlightCheckoutDisplay Category={Category} />;
Category.confirmationDisplay = <FlightConfirmationDisplay Category={Category} />;
Category.cancelledDisplay = <FlightCancelledDisplay Category={Category} />;

Category.core.ClientSearcher = new FlightClientSearcher(Category);
Category.core.ServerSearcher = new FlightServerSearcher(Category);

Category.core.ClientDetailer = new FlightClientDetailer(Category);
Category.core.ServerDetailer = new FlightServerDetailer(Category);

export const FlightCategory = Category;
