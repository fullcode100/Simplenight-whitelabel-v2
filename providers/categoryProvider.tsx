import { HotelCategory } from 'hotels';
import { ThingsCategory } from 'thingsToDo';
import { ParkingCategory } from 'parking';
import { ShowsAndEventsCategory } from 'showsAndEvents';
import { FlightCategory } from 'flights';

const categoryExists = (category: any) => !!category;
export const getCategoryOptions = () =>
  [
    HotelCategory,
    ThingsCategory,
    ParkingCategory,
    ShowsAndEventsCategory,
    FlightCategory,
  ].filter(categoryExists);
