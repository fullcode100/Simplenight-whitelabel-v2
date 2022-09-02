import { HotelCategory } from 'hotels';
import { ThingsCategory } from 'thingsToDo';

const categoryExists = (category: any) => !!category;
export const getCategoryOptions = () =>
  [HotelCategory, ThingsCategory].filter(categoryExists);
