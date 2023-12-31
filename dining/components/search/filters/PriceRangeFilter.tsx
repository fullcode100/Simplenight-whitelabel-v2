import { Dispatch } from 'react';

import RangesliderLegacy from 'components/global/Filters/RangesliderLegacy';
import FilterContainer from './FilterContainer';

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
  return (
    <FilterContainer>
      <RangesliderLegacy
        initialMin={minPrice ? parseInt(minPrice) : 1}
        initialMax={maxPrice ? parseInt(maxPrice) : 4}
        min={1}
        max={max}
        step={1}
        minDifference={1}
        marks={true}
        type="priceRange"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );
};

export default PriceRangeFilter;
