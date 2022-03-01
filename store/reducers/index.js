import { combineReducers } from 'redux';

import coreReducer from './core/core.ts';
import { HotelCategory } from 'hotels';

const reducers = {
  core: coreReducer,
  hotels: HotelCategory.store.reducer,
};

export default combineReducers(reducers);
