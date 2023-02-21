/* eslint indent: off */
import { CoreTheme } from 'types/redux/CoreState';
import { ReduxReducerAction } from '../../../types/redux/ReduxReducerAction';
import { initialState } from './initialState';

import * as types from './types';

const coreReducer = (
  state = initialState,
  { payload, type }: ReduxReducerAction & { payload: any },
) => {
  switch (type) {
    case types.SET_INTL_MESSAGES:
      return {
        ...state,
        languages: {
          ...state.languages,
          intlMessages: payload,
        },
      };
    case types.SET_LOCALE:
      return {
        ...state,
        languages: {
          ...state.languages,
          locale: payload,
        },
      };
    case types.SET_IS_MAPS_LOADED:
      return {
        ...state,
        isMapsLoaded: payload,
      };
    case types.SET_HOME_PAGE_SCROLL_HANDLER:
      return {
        ...state,
        homepageScrollHandler: payload,
      };
    case types.SET_CURRENCY:
      return {
        ...state,
        currency: payload,
      };
    default:
      return state;
  }
};

export default coreReducer;
