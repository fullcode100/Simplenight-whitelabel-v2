import { HotelCategory } from 'hotels';
import { ThingsCategory } from 'thingsToDo';
import { ShowsAndEventsCategory } from 'showsAndEvents';

const categoryExists = (category: any) => !!category;
export const getCategoryOptions = () =>
  [HotelCategory, ThingsCategory, ShowsAndEventsCategory].filter(
    categoryExists,
  );
