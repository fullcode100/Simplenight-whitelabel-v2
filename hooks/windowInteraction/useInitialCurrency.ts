import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrency } from 'store/actions/core';

export const useInitialCurrency = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentCurrency = localStorage.getItem('currency');
    dispatch(setCurrency(currentCurrency || 'USD'));
  }, []);
};
