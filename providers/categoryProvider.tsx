import { HotelCategory } from 'hotels';
import { CarCategory } from 'cars';
import { ThingsCategory } from 'thingsToDo';
import { ParkingCategory } from 'parking';
import { ShowsAndEventsCategory } from 'showsAndEvents';

const categoryExists = (category: any) => !!category;
export const getCategoryOptions = () =>
  [
    HotelCategory,
    ThingsCategory,
    ParkingCategory,
    ShowsAndEventsCategory,
    CarCategory,
  ].filter(categoryExists);
