import { ReduxReducerAction } from '../../../types/redux/ReduxReducerAction';
import { initialState } from './initialState';

import * as types from './types';

const coreReducer = (
  state = initialState,
  { payload, type }: ReduxReducerAction,
) => {
  switch (type) {
    case types.SET_BRAND_CONFIG:
      return {
        ...state,
        brandConfig: payload,
      };
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
    default:
      return state;
  }
};

export default coreReducer;
