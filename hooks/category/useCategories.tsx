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
import TransportIcon from 'public/icons/categories/Category-Transport.svg';
import { Category } from 'types/settings/BrandConfig';

interface IconsMap {
  [key: string]: ReactElement;
}

export const getCategoryIcon = (key: string) => {
  const iconsMapping: IconsMap = {
    bed: <BedIcon />,
    plane: <PlaneIcon />,
    car: <CarSideviewIcon />,
    'car-sideview': <CarSideviewIcon />,
    'ground-transport': <TransportIcon />,
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
  if (['shows-events'].includes(key)) return 'shows-events';
  if (
    [
      'air-activities',
      'attractions',
      'casino',
      'classes',
      'culinary',
      'cultural',
      'entertainment',
      'excursion',
      'festivals',
      'hop-on-hop-off',
      'indoor',
      'markets',
      'nature',
      'nightlife',
      'outdoor',
      'other',
      'rentals',
      'seasonal',
      'shopping',
      'shows',
      'sightseeing',
      'sports',
      'theme-parks',
      'tours',
      'transfer',
      'water-activities',
      'wedding',
      'wellness',
      'fun-games',
      'shows-events',
    ].includes(key)
  )
    return 'entertainment';
  if (['transportation', 'flights', 'car-rental'].includes(key))
    return 'transportation';
  if (key === 'dining') return 'dining';
  if (['showandevents'].includes(key)) return 'showandevents';
  if (['food-beverage', 'dining'].includes(key)) return 'food-beverage';
  if (['other', 'vacation-rentals'].includes(key)) return 'other';
  if (['parking'].includes(key)) return 'parking';
  if (['ground-transportation'].includes(key)) return 'ground-transportation';
  return '';
};

const getCategoryApiUrl = (category: Category) => {
  const itemTypePattern = '/(.*?)/';
  const apiTypeSettings = category.apiUrl?.match(itemTypePattern)?.[1];

  let apiType;
  if (apiTypeSettings === 'sector') {
    apiType = 'sectors';
  }

  if (apiTypeSettings === 'category') {
    apiType = 'categories';
  }

  const apiUrl = `/${apiType}/${category.slug}`;
  return apiUrl;
};

export interface CategoryInfo {
  name: string;
  type: string;
  slug: string;
  icon: ReactElement;
  apiUrl: string;
}

const useCategories = () => {
  const categories = useSelector(getCategories);

  const categoriesTabs = categories?.map((category) => {
    const apiUrl = getCategoryApiUrl(category);
    return {
      name: category.alias,
      type: getSectorWhitelabelId(category.whitelabelId),
      slug: category.slug,
      icon: getCategoryIcon(category.icon),
      apiUrl,
    };
  });

  return categoriesTabs;
};

export default useCategories;
