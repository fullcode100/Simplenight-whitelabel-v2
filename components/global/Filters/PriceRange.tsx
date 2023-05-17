import { Dispatch } from 'react';
import FilterContainer from './FilterContainer';
import RangesliderLegacy from './RangesliderLegacy';

export interface PriceRangeFilterProps {
  limitsPrice?: number[];
  minPrice: number;
  maxPrice: number;
  onChangeMaxPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMinPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const PriceRangeFilter = ({
  limitsPrice,
  minPrice,
  maxPrice,
  onChangeMinPrice,
  onChangeMaxPrice,
}: PriceRangeFilterProps) => {
  return (
    <FilterContainer>
      {/* Avoid using this legacy component, instead use /components/global/RangeSlider/RangeSlider.tsx */}
      <RangesliderLegacy
        initialMin={minPrice}
        initialMax={maxPrice}
        min={limitsPrice ? limitsPrice[0] : 0}
        max={limitsPrice ? limitsPrice[1] : 5000}
        step={1}
        minDifference={100}
        type="price"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );
};

export default PriceRangeFilter;
