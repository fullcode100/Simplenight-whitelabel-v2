import { useAppSelector } from 'hooks/redux/useAppSelector';
import { DiningState } from './diningState';

const select = (selector: (state: any) => any) => useAppSelector(selector);

export const getRestaurants = (state: DiningState) => state.items;
