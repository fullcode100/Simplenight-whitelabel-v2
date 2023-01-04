import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface PassengersRangeFilterProps {
  minPassengers: string;
  maxPassengers: string;
  onChangeMaxPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMinPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  setMaxValue: any;
  setMinValue: any;
  min?: number;
  max?: number;
}

const PassengersRangeFilter = ({
  minPassengers,
  maxPassengers,
  onChangeMinPrice,
  onChangeMaxPrice,
  setMaxValue,
  setMinValue,
  min,
  max,
}: PassengersRangeFilterProps) => {
  const [t] = useTranslation('ground-transportation');
  const passengersRangeLabel = t('passengersRange', 'Passengers Range');

  return (
    <FilterContainer>
      <FilterTitle label={passengersRangeLabel} />
      <RangeSlider
        minValue={minPassengers ? parseInt(minPassengers) : 0}
        maxValue={maxPassengers ? parseInt(maxPassengers) : 6}
        min={min ? min : 0}
        max={max ? max : 6}
        step={1}
        minDifference={1}
        type="number"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
        setMaxValue={setMaxValue}
        setMinValue={setMinValue}
      />
    </FilterContainer>
  );
};

export default PassengersRangeFilter;
