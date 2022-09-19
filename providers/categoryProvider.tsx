import { HotelCategory } from 'hotels';
import { ThingsCategory } from 'thingsToDo';
import { FlightCategory } from 'flights';

const categoryExists = (category: any) => !!category;
export const getCategoryOptions = () =>
  [HotelCategory, ThingsCategory, FlightCategory].filter(categoryExists);
