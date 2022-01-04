import { combineReducers } from 'redux';

import coreReducer from './core/core.ts';

const reducers = {
  core: coreReducer,
};

export default combineReducers(reducers);
