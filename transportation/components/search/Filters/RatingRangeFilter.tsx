import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface RatingRangeFilterProps {
  minRating: string;
  maxRating: string;
  onChangeMaxRating:
  | Dispatch<React.SetStateAction<string>>
  | ((value: string) => void);
  onChangeMinRating:
  | Dispatch<React.SetStateAction<string>>
  | ((value: string) => void);
  setMaxValue: any;
  setMinValue: any;
  min?: number;
  max?: number;
}

const RatingRangeFilter = ({
  minRating,
  maxRating,
  onChangeMinRating,
  onChangeMaxRating,
  setMaxValue,
  setMinValue,
  min,
  max
}: RatingRangeFilterProps) => {
  const [t] = useTranslation('ground-transportation');
  const ratingLabel = t('rating', 'Rating Range');

  return (
    <FilterContainer>
      <FilterTitle label={ratingLabel} />
      <RangeSlider
        minValue={minRating ? parseInt(minRating) : 0}
        maxValue={maxRating ? parseInt(maxRating) : 6}
        min={min ? min : 0}
        max={max ? max : 6}
        step={1}
        minDifference={1}
        type="star"
        setMinState={onChangeMinRating}
        setMaxState={onChangeMaxRating}
        setMaxValue={setMaxValue}
        setMinValue={setMinValue}
      />
    </FilterContainer>
  );
};

export default RatingRangeFilter;
