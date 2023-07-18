import { useCoreStore } from 'hooks/core/useCoreStore';
import { useEffect } from 'react';

export const useInitialCurrency = () => {
  const setCurrency = useCoreStore((state) => state.setCurrency);
  useEffect(() => {
    const currentCurrency = localStorage.getItem('currency');
    setCurrency(currentCurrency || 'USD');
  }, []);
};
