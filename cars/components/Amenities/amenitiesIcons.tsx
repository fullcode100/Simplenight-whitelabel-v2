import BreakfastIcon from 'public/icons/assets/amenities/breakfast-small.svg';
import PoolIcon from 'public/icons/assets/amenities/pool-small.svg';
import CasinoIcon from 'public/icons/assets/amenities/casino-small.svg';
import AirIcon from 'public/icons/assets/amenities/air-small.svg';
import RestaurantIcon from 'public/icons/assets/amenities/restaurant-small.svg';
import WifiIcon from 'public/icons/assets/amenities/wifi-small.svg';
import GymIcon from 'public/icons/assets/amenities/gym-small.svg';
import BarIcon from 'public/icons/assets/amenities/bar-small.svg';
import HotTubIcon from 'public/icons/assets/amenities/hot-tub-small.svg';
import SpaIcon from 'public/icons/assets/amenities/spa-small.svg';
import SaunaIcon from 'public/icons/assets/amenities/sauna-small.svg';
import LaundryIcon from 'public/icons/assets/amenities/laundry-small.svg';
import PetIcon from 'public/icons/assets/amenities/pet-small.svg';

const amenitiesIcons = [
  {
    options: ['Fitness', 'Gym'],
    iconLarge: <GymIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <GymIcon />,
  },
  {
    options: ['Breakfast'],
    iconLarge: <BreakfastIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <BreakfastIcon />,
  },
  {
    options: ['Pool'],
    iconLarge: <PoolIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <PoolIcon />,
  },
  {
    options: ['Casino'],
    iconLarge: <CasinoIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <CasinoIcon />,
  },
  {
    options: ['A.C.', 'Air Conditioning'],
    iconLarge: <AirIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <AirIcon />,
  },
  {
    options: ['Restaurant'],
    iconLarge: <RestaurantIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <RestaurantIcon />,
  },
  {
    options: ['WiFi', 'Wi-Fi'],
    iconLarge: <WifiIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <WifiIcon />,
  },
  {
    options: ['Bar'],
    iconLarge: <BarIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <BarIcon />,
  },
  {
    options: ['Hot Tub'],
    iconLarge: <HotTubIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <HotTubIcon />,
  },
  {
    options: ['Spa'],
    iconLarge: <SpaIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <SpaIcon />,
  },
  {
    options: ['Sauna'],
    iconLarge: <SaunaIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <SaunaIcon />,
  },
  {
    options: ['Laundry'],
    iconLarge: <LaundryIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <LaundryIcon />,
  },
  {
    options: ['Pet Friendly'],
    iconLarge: <PetIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <PetIcon />,
  },
];

export default amenitiesIcons;
