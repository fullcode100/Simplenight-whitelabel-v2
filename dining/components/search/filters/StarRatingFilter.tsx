import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import RangesliderLegacy from 'components/global/Filters/RangesliderLegacy';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface StarRatingFilterProps {
  minStarRating: string;
  maxStarRating: string;
  onChangeMinRating:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMaxRating:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const StarRatingFilter = ({
  minStarRating,
  maxStarRating,
  onChangeMinRating,
  onChangeMaxRating,
}: StarRatingFilterProps) => {
  const [t, i18n] = useTranslation('hotels');
  const starRatingLabel = t('starRating', 'Star Rating');

  return (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <RangesliderLegacy
        initialMin={minStarRating ? parseInt(minStarRating) : 1}
        initialMax={maxStarRating ? parseInt(maxStarRating) : 5}
        min={1}
        max={5}
        step={1}
        minDifference={0}
        type="star"
        marks={true}
        setMinState={onChangeMinRating}
        setMaxState={onChangeMaxRating}
      />
    </FilterContainer>
  );
};

export default StarRatingFilter;
