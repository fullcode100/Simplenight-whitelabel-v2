/* eslint indent: off */
/* eslint @typescript-eslint/ban-types: off */
import { flattenObjectOfObjects } from 'helpers/stringUtils';
import { AppThunk } from '..';
import { getBrandConfig } from '../../config/configJson';
import * as types from '../reducers/core/types';

export const setBrandConfig =
  (brandCode: string): AppThunk =>
  async (dispatch) => {
    const brandConfig = await getBrandConfig(brandCode);

    brandConfig.theme = flattenObjectOfObjects(brandConfig.theme);

    dispatch({
      type: types.SET_BRAND_CONFIG,
      payload: brandConfig,
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

export const setIsPaymentLoaded =
  (isPaymentLoaded: boolean): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: types.SET_IS_PAYMENT_LOADED,
      payload: isPaymentLoaded,
    });
  };
