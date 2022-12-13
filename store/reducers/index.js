import { combineReducers } from 'redux';

import coreReducer from './core/core.ts';
import { HotelCategory } from 'hotels';
import { CarCategory } from 'cars';
import cartReducer from './cart/cartReducers';

const reducers = {
  core: coreReducer,
  hotels: HotelCategory.store.reducer,
  cars: CarCategory.store.reducer,
  cartStore: cartReducer,
};

export default combineReducers(reducers);
