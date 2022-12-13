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
}

const SeatsFilter = ({ value, onChangeSeats }: SeatsFilterProps) => {
  const [t, i18n] = useTranslation('events');
  const starRatingLabel = t('seatsAvailable', 'Seat Available');

  return (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <RangesliderLegacy
        initialMax={value ? parseInt(value) : 1}
        min={1}
        max={6}
        step={1}
        minDifference={0}
        marks={true}
        type="number"
        setMaxState={onChangeSeats}
      />
    </FilterContainer>
  );
};

export default SeatsFilter;
