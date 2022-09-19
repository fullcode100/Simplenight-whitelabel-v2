import BedIcon from 'public/icons/assets/bed.svg';
import ThingsIcon from 'public/icons/categories/Category-Things.svg';
import FlightsIcon from 'public/icons/categories/Category-Flights.svg';

export const tabsMock = [
  {
    value: 'Flights',
    href: '/',
    current: true,
    icon: <FlightsIcon />,
  },
  {
    value: 'Hotels',
    href: '/',
    current: true,
    icon: <BedIcon />,
  },
  {
    value: 'Things To Do',
    href: '/',
    current: true,
    icon: <ThingsIcon />,
  },
];
