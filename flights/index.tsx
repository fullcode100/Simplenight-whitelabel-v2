import { CategoryOption } from 'types/search/SearchTypeOptions';

import PlaneIcon from 'public/icons/categories/Flights.svg';
export const FLIGHT_CATEGORY = 'flights';

const Category: CategoryOption = {
  id: 3,
  name: FLIGHT_CATEGORY,
  value: FLIGHT_CATEGORY,
  icon: <PlaneIcon />,
  selectedIcon: <></>,
  searchForm: <></>,
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

export const FlightCategory = Category;
