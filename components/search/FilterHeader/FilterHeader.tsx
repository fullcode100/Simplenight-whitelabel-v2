import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterContainer } from '@/components/search';

interface FilterHeader {
  handleClearFilters: () => void;
}

export const FilterHeader: FC<FilterHeader> = ({ handleClearFilters }) => {
  const [tg] = useTranslation('global');

  return (
    <FilterContainer>
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{tg('filters')}</p>
        <button
          className="text-base font-semibold capitalize text-primary-1000"
          onClick={handleClearFilters}
        >
          {tg('clearFilters')}
        </button>
      </section>
    </FilterContainer>
  );
};
