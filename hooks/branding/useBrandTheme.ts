import { useSelector } from 'react-redux';
import { getBrandTheme } from 'store/selectors/core';

export const useBrandTheme = () => useSelector(getBrandTheme);
