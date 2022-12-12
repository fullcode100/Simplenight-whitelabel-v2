import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import RangeSlider from '../../RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface PassengerNumberFilterProps {
  minPassengerNumber: string;
  maxPassengerNumber: string;
  onChangeMinRating:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMaxRating:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const PassengerNumberFilter = ({
  minPassengerNumber,
  maxPassengerNumber,
  onChangeMinRating,
  onChangeMaxRating,
}: PassengerNumberFilterProps) => {
  const [t, i18n] = useTranslation('cars');
  const passengersLabel = t('passengers', 'Passengers');

  return (
    <FilterContainer>
      <FilterTitle label={passengersLabel} />
      <RangeSlider
        initialMin={minPassengerNumber ? parseInt(minPassengerNumber) : 1}
        initialMax={maxPassengerNumber ? parseInt(maxPassengerNumber) : 5}
        min={1}
        max={5}
        step={1}
        minDifference={0}
        type="number"
        setMinState={onChangeMinRating}
        setMaxState={onChangeMaxRating}
      />
    </FilterContainer>
  );
};

export default PassengerNumberFilter;
