import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import RangesliderLegacy from 'components/global/Filters/RangesliderLegacy';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  max?: number;
  onChangeMaxPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMinPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  max = 4,
  onChangeMinPrice,
  onChangeMaxPrice,
}: PriceRangeFilterProps) => {
  const [t] = useTranslation('dining');
  const priceRangeLabel = t('priceRange');

  return (
    <FilterContainer>
      <FilterTitle label={priceRangeLabel} />
      <RangesliderLegacy
        initialMin={minPrice ? parseInt(minPrice) : 1}
        initialMax={maxPrice ? parseInt(maxPrice) : 4}
        min={1}
        max={max}
        step={1}
        minDifference={1}
        marks={true}
        type="price"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );
};

export default PriceRangeFilter;
