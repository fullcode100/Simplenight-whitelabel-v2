import BedIcon from 'public/icons/assets/bed.svg';
import ThingsIcon from 'public/icons/categories/Category-Things.svg';
import FlightsIcon from 'public/icons/categories/Category-Flights.svg';

export const tabsMock = [
  {
    value: 'Hotels',
    url: 'hotels',
    href: '/',
    current: true,
    icon: <BedIcon />,
  },
  {
    value: 'Flights',
    url: 'flights',
    href: '/',
    current: true,
    icon: <FlightsIcon />,
  },
  {
    value: 'Things To Do',
    url: 'things-to-do',
    href: '/',
    current: true,
    icon: <ThingsIcon />,
  },
];
