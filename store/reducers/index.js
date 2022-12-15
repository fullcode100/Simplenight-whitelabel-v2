import { combineReducers } from 'redux';

import coreReducer from './core/core.ts';
import { HotelCategory } from 'hotels';
import { FlightCategory } from 'flights';
import { CarCategory } from 'cars';
import cartReducer from './cart/cartReducers';

const reducers = {
  core: coreReducer,
  hotels: HotelCategory.store.reducer,
  flights: FlightCategory.store.reducer,
  cars: CarCategory.store.reducer,
  cartStore: cartReducer,
};

export default combineReducers(reducers);
