/* eslint indent: off */
/* eslint @typescript-eslint/ban-types: off */
import { getSettings } from 'apiCalls/settings';
import { CustomWindow } from 'types/global/CustomWindow';
import { BrandConfig } from 'types/settings/BrandConfig';
import { AppThunk } from '..';
import * as types from '../reducers/core/types';

declare let window: CustomWindow;

export const setBrandConfig = (): AppThunk => async (dispatch) => {
  dispatch({ type: types.SET_LOAD_BRAND_CONFIG });
  const settings: BrandConfig = await getSettings();
  dispatch({
    type: types.SET_BRAND_CONFIG,
    payload: settings,
  });
};

export const setBrandColor =
  (key: string, brandColor: string): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: types.SET_BRAND_COLOR,
      payload: { key, brandColor },
    });
  };

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
    dispatch({
      type: types.SET_CURRENCY,
      payload: currency,
    });
  };
