import { Reducer } from 'redux';
import { HotelsActionTypes } from './types';
import { SearchItem } from 'hotels/types/adapters/SearchItem';

const initialState = {
  loading: false,
  hotels: [],
  hotel: {} as SearchItem,
};

const hotelReducer: Reducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case HotelsActionTypes.FETCH_REQUEST:
      return {
        ...state,
        loading: action.loading,
        hotel: action.hotels,
      };
    case HotelsActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        hotels: action.hotels,
        filteredHotels: action.hotels,
      };
    case HotelsActionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default hotelReducer;
