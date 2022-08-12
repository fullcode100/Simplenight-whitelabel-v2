import { Dispatch } from 'react';
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
}

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onChangeMinPrice,
  onChangeMaxPrice,
}: PriceRangeFilterProps) => {
  const [t, i18n] = useTranslation('hotels');
  const priceRangeLabel = t('priceRange', 'Price Range');

  return (
    <FilterContainer>
      <FilterTitle label={priceRangeLabel} />
      <RangeSlider
        initialMin={minPrice ? parseInt(minPrice) : 100}
        initialMax={maxPrice ? parseInt(maxPrice) : 5000}
        min={100}
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
