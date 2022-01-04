import { AppThunk } from '..';
import { getBrandConfig } from '../../config/configJson';
import * as types from '../reducers/core/types';

export const setBrandConfig =
  (brandCode: string): AppThunk =>
    async (dispatch) => {
    const brandConfig = await getBrandConfig(brandCode);

    dispatch({
      type: types.SET_BRAND_CONFIG,
      payload: brandConfig,
    });
  };
