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
    case types.SET_LOAD_BRAND_CONFIG:
      return {
        ...state,
        brandConfigLoaded: false,
      };
    case types.SET_BRAND_CONFIG:
      return {
        ...state,
        brandConfig: payload,
        brandConfigLoaded: true,
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
    case types.SET_BRAND_COLOR:
      return {
        ...state,
        brandConfig: {
          ...state.brandConfig,
          theme: state.brandConfig.theme.map((theme: CoreTheme) => {
            if (theme.key === payload.key) {
              return {
                ...theme,
                value: payload.brandColor,
              };
            }
            return theme;
          }),
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
