import { useEffect, useState } from 'react';

export const usePlural = (
  counter: number,
  singular: string,
  plural: string,
) => {
  const [value, setValue] = useState(counter === 1 ? singular : plural);

  useEffect(() => {
    setValue(counter === 1 ? singular : plural);
  }, [counter, singular, plural]);

  return value;
};
