import { Dispatch } from 'react';

import RangesliderLegacy from 'components/global/Filters/RangesliderLegacy';
import FilterContainer from './FilterContainer';

interface ScoreRangeFilterProps {
  maxPrice: string;
  minPrice: string;
  max?: number;
  onChangeMinPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMaxPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const ScoreRangeFilter = ({
  maxPrice,
  minPrice,
  max = 4,
  onChangeMaxPrice,
  onChangeMinPrice,
}: ScoreRangeFilterProps) => {
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
        type="star"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );
};

export default ScoreRangeFilter;
