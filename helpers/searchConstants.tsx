import React from 'react';

// import BedFillGray from '../public/icons/categories/BedFillGray.svg';
import BedFillGray from '../public/icons/categories/BedFillGray.svg';
import ShowAllFillGray from '../public/icons/categories/ShowAllFillGray.svg';
import ShowAllWhite from '../public/icons/categories/ShowAllWhite.svg';
import CarTransparent from '../public/icons/categories/TransportationTransparent.svg';
import TransportationIcon from '../public/icons/categories/Transportation_Category_Icon.svg';
import GasStation from '../public/icons/categories/GasStation.svg';
import GasStationWhite from '../public/icons/categories/GasStationWhite.svg';
import ToursActivitiesWhite from '../public/icons/categories/ToursActivitiesWhite.svg';
import ShowsEvents from '../public/icons/categories/ShowsEvents.svg';
import ShowsEventsWhite from '../public/icons/categories/ShowsEventsWhite.svg';
import DiningWhiteSvg from '../public/icons/categories/DiningWhite.svg';
import Nightlife from '../public/icons/categories/Nightlife.svg';
import NightlifeWhite from '../public/icons/categories/NightlifeWhite.svg';
import FlightsTransparent from '../public/icons/categories/Flights.svg';
import Shopping from '../public/icons/categories/Icon_Category_Shopping.svg';
import ShoppingWhite from '../public/icons/categories/Icon_Category_Shopping_White.svg';
import { SearchTypeOptions } from '../types/search/SearchTypeOptions';
import HotelSearchForm from '../components/categories/hotels/search/HotelSearchForm';

export const searchTypeOptions: SearchTypeOptions = [
  {
    id: 1,
    name: 'showAll',
    value: 'all',
    icon: <ShowAllFillGray />,
    selectedIcon: <ShowAllWhite />,
  },
  {
    id: 2,
    name: 'hotels',
    value: 'hotels',
    icon: <BedFillGray />,
    selectedIcon: <BedFillGray />,
    searchForm: <HotelSearchForm />,
  },
  {
    id: 3,
    name: 'flights',
    value: 'flights',
    icon: <FlightsTransparent />,
    selectedIcon: <FlightsTransparent />,
  },
  {
    id: 4,
    name: 'transportation',
    value: 'transports',
    icon: <TransportationIcon />,
    selectedIcon: <TransportationIcon />,
  },
  {
    id: 5,
    name: 'carRentals',
    value: 'carrentals',
    icon: <CarTransparent />,
    selectedIcon: <CarTransparent />,
  },
  {
    id: 6,
    name: 'gasAndCharging',
    value: 'gas',
    icon: <GasStation />,
    selectedIcon: <GasStationWhite />,
  },
  {
    id: 7,
    name: 'toursAndActivities',
    value: 'tours',
    icon: <ToursActivitiesWhite />,
    selectedIcon: <ToursActivitiesWhite />,
  },
  {
    id: 8,
    name: 'showsAndEvents',
    value: 'events',
    icon: <ShowsEvents />,
    selectedIcon: <ShowsEventsWhite />,
  },
  {
    id: 9,
    name: 'dining',
    value: 'dining',
    icon: <DiningWhiteSvg />,
    selectedIcon: <DiningWhiteSvg />,
  },
  {
    id: 10,
    name: 'nightLife',
    value: 'nightlife',
    icon: <Nightlife />,
    selectedIcon: <NightlifeWhite />,
  },
  {
    id: 11,
    name: 'shopping',
    value: 'shopping',
    icon: <Shopping />,
    selectedIcon: <ShoppingWhite />,
  },
];
