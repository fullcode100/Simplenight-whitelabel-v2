import { Reducer } from 'redux';
import { Hotel } from 'hotels/types/response/SearchResponse';
import { HotelsActionTypes } from './types';

const initialState = {
  loading: false,
  hotels: [],
  hotel: {} as Hotel,
  filteredHotels: [] as Hotel[],
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
        hotels: action.hotels.hotels,
        filteredHotels: action.hotels.hotels,
      };
    case HotelsActionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: action.loading,
      };
    case HotelsActionTypes.SET_FILTERED_HOTELS:
      return {
        ...state,
        filteredHotels: action.hotels,
      };
    default:
      return state;
  }
};

export default hotelReducer;
