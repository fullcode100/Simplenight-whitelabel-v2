import { ReactNode } from 'react';

const FilterContainer = ({ children }: { children?: ReactNode }) => (
  <section className="flex flex-col mb-6">{children}</section>
);

export default FilterContainer;
