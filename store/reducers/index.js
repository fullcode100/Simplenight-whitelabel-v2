import { combineReducers } from 'redux';
import { CarCategory } from 'cars';

const reducers = {
  cars: CarCategory.store.reducer,
};

export default combineReducers(reducers);
