import { Dispatch } from 'react';

import RangesliderLegacy from './RangesliderLegacy';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

export interface StarRangeFilterProps {
  minStarRating: string;
  maxStarRating: string;
  onChangeMinRating:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMaxRating:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  starRatingLabel: string;
}

const StarRangeFilter = ({
  minStarRating,
  maxStarRating,
  onChangeMinRating,
  onChangeMaxRating,
  starRatingLabel,
}: StarRangeFilterProps) => {
  return (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      {/* Avoid using this legacy component, instead use /components/global/RangeSlider/RangeSlider.tsx */}
      <RangesliderLegacy
        initialMin={minStarRating ? parseInt(minStarRating) : 1}
        initialMax={maxStarRating ? parseInt(maxStarRating) : 5}
        min={1}
        max={5}
        step={1}
        minDifference={0}
        type="star"
        setMinState={onChangeMinRating}
        setMaxState={onChangeMaxRating}
      />
    </FilterContainer>
  );
};

export default StarRangeFilter;
