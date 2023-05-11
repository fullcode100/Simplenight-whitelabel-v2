import { Dispatch } from 'react';
import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';

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
  return (
    <FilterContainer>
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
