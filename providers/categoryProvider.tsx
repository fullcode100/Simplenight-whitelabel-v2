import { HotelCategory } from 'hotels';

const categoryExists = (category: any) => !!category;
export const getCategoryOptions = () => [HotelCategory].filter(categoryExists);
