import { useSelector } from 'react-redux';
import { getBrandHeroTitle } from 'store/selectors/core';

export const useBrandHeroTitle = () => useSelector(getBrandHeroTitle);
