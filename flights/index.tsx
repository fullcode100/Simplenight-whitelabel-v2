import { CategoryOption } from 'types/search/SearchTypeOptions';

import FlightSearchForm from 'flights/components/search/FlightSearchForm';

import BedFillGray from 'public/icons/categories/BedFillGray.svg';
import FlightResultsDisplay from 'flights/components/search/FlightResultsDisplay';
import FlightItineraryDisplay from './components/itinerary/FlightItineraryDisplay';
import FlightBreakdownDisplay from './components/checkout/FlightBreakdownDisplay';
import FlightsConfirmationAccordion from './components/confirmation/FlightsConfirmationAccordion/FlightsConfirmationAccordion';
import { FlightClientSearcher } from './core/search/FlightClientSearcher';
import { FlightServerSearcher } from './core/search/FlightServerSearcher';
import { FlightClientDetailer } from './core/detail/FlightClientDetailer';
import { FlightServerDetailer } from './core/detail/FlightServerDetailer';
import FlightSearchFormReadState from './components/search/FlightSearchFormReadState';
import FlightsIcon from 'public/icons/assets/flights1.svg';
import FlightSecondarySearchOptions from './components/search/FlightSecondarySearchOptions';
import FlightCheckoutDisplay from './components/checkout/FlightCheckoutDisplay';
import FlightCheckoutItemDisplay from './components/checkout/FlightCheckoutItemDesplay';
import PassengerInformationDisplay from './components/PassengerInformation/PassengerInformationDisplay';
import FlightsCancelledAccordion from './components/Cancelled/FlightsCancelledAccordion';

export const FLIGHT_CATEGORY = 'flights';
export const FLIGHT_DEBUG =
  process.env.NEXT_PUBLIC_FLIGHTS_MS_DEBUG === 'true' ? true : false;

export const minAdultAge = 18;
export const minChildrenAge = 2;
export const maxChildrenAge = 17;

const Category: CategoryOption = {
  id: 2,
  name: FLIGHT_CATEGORY,
  value: FLIGHT_CATEGORY,
  icon: <FlightsIcon categoryName={FLIGHT_CATEGORY} className={'h-5 w-5'} />,
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
        server: '/categories/flights',
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
// Category.detailDisplay = <FlightDetailDisplay Category={Category} />;
Category.detailDisplay = <PassengerInformationDisplay Category={Category} />;
Category.itineraryDisplay = <FlightItineraryDisplay Category={Category} />;
Category.breakdownDisplay = <FlightBreakdownDisplay Category={Category} />;
Category.checkoutDisplay = <FlightCheckoutDisplay Category={Category} />;
Category.checkoutItemDisplay = (
  <FlightCheckoutItemDisplay Category={Category} />
);
Category.confirmationDisplay = (
  <FlightsConfirmationAccordion Category={Category} />
);
Category.cancelledDisplay = <FlightsCancelledAccordion Category={Category} />;

Category.core.ClientSearcher = new FlightClientSearcher(Category);
Category.core.ServerSearcher = new FlightServerSearcher(Category);

Category.core.ClientDetailer = new FlightClientDetailer(Category);
Category.core.ServerDetailer = new FlightServerDetailer(Category);

export const FlightCategory = Category;
