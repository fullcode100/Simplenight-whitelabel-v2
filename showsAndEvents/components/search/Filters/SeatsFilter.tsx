import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import RangesliderLegacy from 'components/global/Filters/RangesliderLegacy';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface SeatsFilterProps {
  value: string;
  onChangeSeats:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMinSeats?:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMaxSeats?:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  minValue?: string;
  maxValue?: string;
}

const SeatsFilter = ({
  value,
  onChangeSeats,
  onChangeMinSeats,
  onChangeMaxSeats,
  minValue,
  maxValue,
}: SeatsFilterProps) => {
  const [t, i18n] = useTranslation('events');
  const starRatingLabel = t('seatsAvailable', 'Seat Available');

  return (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <RangesliderLegacy
        initialMin={minValue ? parseInt(minValue) : 1}
        initialMax={maxValue ? parseInt(maxValue) : value ? parseInt(value) : 6}
        min={1}
        max={6}
        step={1}
        minDifference={0}
        marks={true}
        type="number"
        setMinState={onChangeMinSeats}
        setMaxState={onChangeMaxSeats || onChangeSeats}
      />
    </FilterContainer>
  );
};

export default SeatsFilter;
