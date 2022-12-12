import { FC, useState } from 'react';
import FilterTitle from '../../../hotels/components/search/Filters/FilterTitle';
import { FilterContainer } from '../';
import ChevronDownIcon from '@/icons/assets/chevron-down.svg';

interface FilterItemProps {
  title: string;
  defaultExpanded?: boolean;
}

export const FilterItem: FC<FilterItemProps> = ({
  title,
  defaultExpanded = true,
  children,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const toggleExpandHandler = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <FilterContainer>
      <section className="grid gap-3">
        <header
          className="flex items-center gap-1"
          onClick={toggleExpandHandler}
        >
          <FilterTitle className="flex-1" label={title} />
          <ChevronDownIcon />
        </header>
        {expanded && <div>{children}</div>}
      </section>
    </FilterContainer>
  );
};
