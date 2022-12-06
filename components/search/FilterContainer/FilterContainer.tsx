import { FC } from 'react';

export const FilterContainer: FC = ({ children }) => {
  return <section className="flex flex-col mt-4 mb-6">{children}</section>;
};
