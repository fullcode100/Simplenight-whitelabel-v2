import { combineReducers } from 'redux';

import coreReducer from './core/core.ts';
import { HotelCategory } from 'hotels';
import { FlightCategory } from 'flights';
import { CarCategory } from 'cars';
import { ShowsAndEventsCategory } from 'showsAndEvents';

const reducers = {
  core: coreReducer,
  hotels: HotelCategory.store.reducer,
  flights: FlightCategory.store.reducer,
  cars: CarCategory.store.reducer,
  showsAndEvents: ShowsAndEventsCategory.store.reducer,
};

export default combineReducers(reducers);
