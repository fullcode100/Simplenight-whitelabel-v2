import { Dispatch } from 'react';

import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';

interface PriceRangeFilterProps {
  step?: number;
  max?: number;
  minDifference?: number;
  onChangeMaxPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMinPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  minValue: number;
  maxValue: number;
}

const PriceRangeFilter = ({
  step = 5,
  minDifference = 100,
  max = 5000,
  minValue,
  maxValue,
  onChangeMinPrice,
  onChangeMaxPrice,
  setMinValue,
  setMaxValue,
}: PriceRangeFilterProps) => (
  <FilterContainer>
    <RangeSlider
      min={0}
      max={max}
      step={step}
      minDifference={minDifference}
      type="price"
      setMinState={onChangeMinPrice}
      setMaxState={onChangeMaxPrice}
      setMaxValue={setMaxValue}
      setMinValue={setMinValue}
      minValue={minValue}
      maxValue={maxValue}
    />
  </FilterContainer>
);

export default PriceRangeFilter;
