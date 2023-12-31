import { HotelCategory } from 'hotels';
import { CarCategory } from 'cars';
import { ThingsCategory } from 'thingsToDo';
import { ParkingCategory } from 'parking';
import { ShowsAndEventsCategory } from 'showsAndEvents';
import { FlightCategory } from 'flights';
import { DiningCategory } from 'dining';
import { TransportationCategory } from 'transportation';

const categoryExists = (category: any) => !!category;
export const getCategoryOptions = () =>
  [
    HotelCategory,
    ThingsCategory,
    ParkingCategory,
    ShowsAndEventsCategory,
    TransportationCategory,
    FlightCategory,
    CarCategory,
    DiningCategory,
  ].filter(categoryExists);
