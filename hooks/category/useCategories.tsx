import { useSelector } from 'react-redux';
import { ReactElement } from 'react';

import { getCategories } from 'store/selectors/core';

import BedIcon from 'public/icons/assets/bed.svg';
import BackpackIcon from 'public/icons/categories/Category-Things.svg';
import RentalsIcon from 'public/icons/categories/Category-Rentals.svg';
import PlaneIcon from 'public/icons/categories/Category-Flights.svg';
import CarSideviewIcon from 'public/icons/categories/Category-Cars.svg';
import PlaneSideviewIcon from 'public/icons/categories/plane-fly.svg';
import RocketIcon from 'public/icons/categories/rocket.svg';
import BookReaderIcon from 'public/icons/categories/book-reader.svg';
import UtensilsIcon from 'public/icons/categories/utensils.svg';
import GolfBallIcon from 'public/icons/categories/golf-ball.svg';
import UserMdIcon from 'public/icons/categories/user-md.svg';
import GlassMartiniIcon from 'public/icons/categories/glass-martini-alt.svg';
import MountainsSunIcon from 'public/icons/categories/mountains-sun.svg';
import ShoppingBagIcon from 'public/icons/categories/shopping-bag.svg';
import WaterIcon from 'public/icons/categories/water.svg';
import TicketIcon from 'public/icons/categories/ticket.svg';
import BedDoubleIcon from 'public/icons/categories/bed-double.svg';
import CoffeeIcon from 'public/icons/categories/coffee.svg';
import ParkingIcon from 'public/icons/categories/parking-square.svg';

interface IconsMap {
  [key: string]: ReactElement;
}

export const getCategoryIcon = (key: string) => {
  const iconsMapping: IconsMap = {
    bed: <BedIcon />,
    plane: <PlaneIcon />,
    'car-sideview': <CarSideviewIcon />,
    'plane-fly': <PlaneSideviewIcon />,
    estate: <RentalsIcon />,
    backpack: <BackpackIcon />,
    rocket: <RocketIcon />,
    'book-reader': <BookReaderIcon />,
    utensils: <UtensilsIcon />,
    'golf-ball': <GolfBallIcon />,
    'user-md': <UserMdIcon />,
    'glass-martini-alt': <GlassMartiniIcon />,
    'mountains-sun': <MountainsSunIcon />,
    'shopping-bag': <ShoppingBagIcon />,
    water: <WaterIcon />,
    ticket: <TicketIcon />,
    'bed-double': <BedDoubleIcon />,
    coffee: <CoffeeIcon />,
    'parking-square': <ParkingIcon />,
  };

  return iconsMapping[key];
};

const getSectorWhitelabelId = (key: string) => {
  if (['hotels', 'accommodations', 'vacation-rentals'].includes(key))
    return 'hotels';
  if (
    [
      'entertainment',
      'air-tours',
      'attractions',
      'classes-workshops',
      'culinary-experiences',
      'golf',
      'history-culture',
      'nightlife',
      'outdoor-activities',
      'private-custom-tours',
      'shopping-fashion',
      'spa-wellness',
      'theme-park',
      'tours-sightseeing',
      'wedding-honeymoons',
      'other-activities',
      'shows-events',
    ].includes(key)
  )
    return 'entertainment';
  if (['transportation', 'flights', 'car-rental'].includes(key))
    return 'transportation';
  if (['food-beverage', 'dining'].includes(key)) return 'food-beverage';
  if (['other', 'parking', 'vacation-rentals'].includes(key)) return 'other';
  return '';
};

const useCategories = () => {
  const categories = useSelector(getCategories);
  const categoriesTabs = categories.map((category) => {
    return {
      name: category.alias,
      type: getSectorWhitelabelId(category.whitelabelId),
      slug: category.slug,
      icon: getCategoryIcon(category.icon),
    };
  });

  return categoriesTabs;
};

export default useCategories;
