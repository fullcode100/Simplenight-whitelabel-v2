/* eslint indent: off */
/* eslint @typescript-eslint/ban-types: off */
import { CustomWindow } from 'types/global/CustomWindow';
import { AppThunk } from '..';
import * as types from '../reducers/core/types';

declare let window: CustomWindow;

export const setIsMapsLoaded =
  (isMapsLoaded: boolean): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: types.SET_IS_MAPS_LOADED,
      payload: isMapsLoaded,
    });
  };

export const setHomepageScrollHandler =
  (handler: Function): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: types.SET_HOME_PAGE_SCROLL_HANDLER,
      payload: handler,
    });
  };

export const setCurrency =
  (currency: string): AppThunk =>
  async (dispatch) => {
    window.currency = currency;
    localStorage.setItem('currency', currency);
    dispatch({
      type: types.SET_CURRENCY,
      payload: currency,
    });
  };
