import { useEffect } from 'react';
import { CustomWindow } from 'types/global/CustomWindow';

declare let window: CustomWindow;

const setInitialCurrency = (currency: string) => (window.currency = currency);

export const useInitialCurrency = () => {
  useEffect(() => {
    setInitialCurrency('USD');
  }, []);
};
