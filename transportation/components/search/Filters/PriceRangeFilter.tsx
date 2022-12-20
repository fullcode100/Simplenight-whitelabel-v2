import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  onChangeMaxPrice:
  | Dispatch<React.SetStateAction<string>>
  | ((value: string) => void);
  onChangeMinPrice:
  | Dispatch<React.SetStateAction<string>>
  | ((value: string) => void);
  setMaxValue: any;
  setMinValue: any
  min?: number
  max?: number
}

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onChangeMinPrice,
  onChangeMaxPrice,
  setMaxValue,
  setMinValue,
  min,
  max
}: PriceRangeFilterProps) => {
  const [t] = useTranslation('ground-transportation');
  const priceRangeLabel = t('priceRange', 'Price Range');

  return (
    <FilterContainer>
      <FilterTitle label={priceRangeLabel} />
      <RangeSlider
        minValue={minPrice ? parseInt(minPrice) : 80}
        maxValue={maxPrice ? parseInt(maxPrice) : 1000}
        min={min ? min : 80}
        max={max ? max : 1000}
        step={1}
        minDifference={1}
        type="price"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
        setMaxValue={setMaxValue}
        setMinValue={setMinValue}
      />
    </FilterContainer>
  );
};

export default PriceRangeFilter;