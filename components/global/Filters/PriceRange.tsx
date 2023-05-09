import { Dispatch } from 'react';
import FilterContainer from './FilterContainer';
import RangesliderLegacy from './RangesliderLegacy';

export interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
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
  onChangeMinPrice,
  onChangeMaxPrice,
}: PriceRangeFilterProps) => {
  return (
    <FilterContainer>
      {/* Avoid using this legacy component, instead use /components/global/RangeSlider/RangeSlider.tsx */}
      <RangesliderLegacy
        initialMin={minPrice ? parseInt(minPrice) : 0}
        initialMax={maxPrice ? parseInt(maxPrice) : 5000}
        min={0}
        max={5000}
        step={100}
        minDifference={100}
        type="price"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );
};

export default PriceRangeFilter;
