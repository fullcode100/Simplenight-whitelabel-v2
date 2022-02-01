import { useAppDispatch } from 'hooks/redux/useAppDispatch';
import { useEffect } from 'react';
import { setBrandConfig } from 'store/actions/core';

export const useBrandConfigSetup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBrandConfig('GENTEX'));
  }, []);
};
