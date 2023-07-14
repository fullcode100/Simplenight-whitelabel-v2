import { combineReducers } from 'redux';

import coreReducer from './core/core.ts';
import { FlightCategory } from 'flights';
import { CarCategory } from 'cars';

const reducers = {
  core: coreReducer,
  flights: FlightCategory.store.reducer,
  cars: CarCategory.store.reducer,
};

export default combineReducers(reducers);
