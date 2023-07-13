import { combineReducers } from 'redux';

import coreReducer from './core/core.ts';
import { FlightCategory } from 'flights';
import { CarCategory } from 'cars';
import { ShowsAndEventsCategory } from 'showsAndEvents';

const reducers = {
  core: coreReducer,
  flights: FlightCategory.store.reducer,
  cars: CarCategory.store.reducer,
  showsAndEvents: ShowsAndEventsCategory.store.reducer,
};

export default combineReducers(reducers);
