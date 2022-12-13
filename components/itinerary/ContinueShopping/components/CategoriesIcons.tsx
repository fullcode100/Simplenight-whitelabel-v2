import Hotel from 'public/icons/categories/Category-Hotel.svg';
import Car from 'public/icons/categories/Category-Cars.svg';
import Info from 'public/icons/categories/InformationIcon.svg';
import Dining from 'public/icons/categories/Category-Dining.svg';
import ShowsEvents from 'public/icons/categories/Category-Shows.svg';
import Flights from 'public/icons/categories/Category-Flights.svg';
import GasStation from 'public/icons/categories/GasStation.svg';
import Nightlife from 'public/icons/categories/Nightlife.svg';
import Shopping from 'public/icons/categories/Shopping_blue.svg';
import Tours from 'public/icons/categories/ToursActivities.svg';
import Transports from 'public/icons/categories/TransportationIconOutline.svg';

const CategoriesIcons = [
  {
    category: 'cars',
    text: 'Car Rentals',
    icon: <Car className="mx-auto" />,
  },
  {
    category: 'cruise',
    text: 'Cruise',
    icon: <Info className="mx-auto" />,
  },
  {
    category: 'dining',
    text: 'Dining',
    icon: <Dining className="mx-auto" />,
  },
  {
    category: 'events',
    text: 'Shows & Events',
    icon: <ShowsEvents className="mx-auto" />,
  },
  {
    category: 'flights',
    text: 'Flights',
    icon: <Flights className="mx-auto" />,
  },
  {
    category: 'gas',
    text: 'Gas',
    icon: <GasStation className="mx-auto" />,
  },
  {
    category: 'hotels',
    text: 'Hotels',
    icon: <Hotel className="mx-auto" />,
  },
  {
    category: 'nightlife',
    text: 'Nightlife',
    icon: <Nightlife className="mx-auto" />,
  },
  {
    category: 'shopping',
    text: 'Shopping',
    icon: <Shopping className="mx-auto" />,
  },
  {
    category: 'tours',
    text: 'Tours',
    icon: <Tours className="mx-auto" />,
  },
  {
    category: 'transports',
    text: 'Transports',
    icon: <Transports className="mx-auto" />,
  },
];

export default CategoriesIcons;
