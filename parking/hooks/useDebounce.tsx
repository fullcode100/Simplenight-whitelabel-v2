import { useEffect, useState } from 'react';

interface UseDebounce {
  <T>(value: T, delay: number): T;
}

export const useDebounce: UseDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
