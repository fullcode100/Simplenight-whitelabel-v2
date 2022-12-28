import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface SeatsFilterProps {
  value: number;
  onChangeSeats:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMinSeats?:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMaxSeats?:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  setMinValue?: React.Dispatch<React.SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;
}

const SeatsFilter = ({
  value,
  onChangeSeats,
  onChangeMinSeats,
  onChangeMaxSeats,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}: SeatsFilterProps) => {
  const [t, i18n] = useTranslation('events');
  const starRatingLabel = t('seatsAvailable', 'Seat Available');

  return (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <RangeSlider
        minValue={minValue ? minValue : 1}
        maxValue={maxValue ? maxValue : value ? value : 6}
        min={1}
        max={6}
        step={1}
        minDifference={0}
        marks={true}
        type="number"
        setMinState={onChangeMinSeats}
        setMaxState={onChangeMaxSeats || onChangeSeats}
        setMaxValue={setMaxValue}
        setMinValue={setMinValue}
      />
    </FilterContainer>
  );
};

export default SeatsFilter;
