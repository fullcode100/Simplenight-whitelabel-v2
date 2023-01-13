import { Reducer } from 'redux';
import {
  ShowsAndEventsActionTypes,
  iShowsAndEventsActionStateType,
} from './types';

const initialState: iShowsAndEventsActionStateType = {
  loading: false,
  showsAndEvents: [],
  filteredShowsAndEvents: [],
  filters: {},
  error: false,
};

const hotelReducer: Reducer<iShowsAndEventsActionStateType> = (
  state = initialState,
  action,
): iShowsAndEventsActionStateType => {
  switch (action.type) {
    case ShowsAndEventsActionTypes.FETCH_REQUEST:
      return {
        ...state,
        loading: action.loading,
        showsAndEvents: action.showsAndEvents,
      };
    case ShowsAndEventsActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        showsAndEvents: action.showsAndEvents,
        filteredShowsAndEvents: action.showsAndEvents,
      };
    case ShowsAndEventsActionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: action.loading,
      };
    case ShowsAndEventsActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case ShowsAndEventsActionTypes.SET_FILTERED_SHOWS_AND_EVENTS:
      return {
        ...state,
        filteredShowsAndEvents: action.showsAndEvents,
      };
    default:
      return state;
  }
};

export default hotelReducer;
