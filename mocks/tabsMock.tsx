import CarIcon from 'public/icons/assets/car.svg';
import BedIcon from 'public/icons/assets/bed.svg';
import ThingsIcon from 'public/icons/categories/Category-Things.svg';

export const tabsMock = [
  {
    value: 'Hotels',
    url: 'hotels',
    href: '/',
    current: true,
    icon: <BedIcon />,
  },
  {
    value: 'Cars',
    url: 'cars',
    href: '/',
    current: true,
    icon: <CarIcon />,
  },
  {
    value: 'Things To Do',
    url: 'things-to-do',
    href: '/',
    current: true,
    icon: <ThingsIcon />,
  },
];
