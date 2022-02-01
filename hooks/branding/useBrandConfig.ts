import { useSelector } from 'react-redux';
import { getBrandConfig } from 'store/selectors/core';

export const useBrandConfig = () => useSelector(getBrandConfig);
