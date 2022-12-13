import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface StarRatingFilterProps {
  onChangeMinRating:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMaxRating:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  minValue: number;
  maxValue: number;
}

const StarRatingFilter = ({
  onChangeMinRating,
  onChangeMaxRating,
  setMaxValue,
  setMinValue,
  minValue,
  maxValue,
}: StarRatingFilterProps) => {
  const [t, i18n] = useTranslation('hotels');
  const starRatingLabel = t('starRating', 'Star Rating');

  return (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <RangeSlider
        min={1}
        max={5}
        step={1}
        minDifference={0}
        type="star"
        marks={true}
        setMinState={onChangeMinRating}
        setMaxState={onChangeMaxRating}
        setMaxValue={setMaxValue}
        setMinValue={setMinValue}
        minValue={minValue}
        maxValue={maxValue}
      />
    </FilterContainer>
  );
};

export default StarRatingFilter;
