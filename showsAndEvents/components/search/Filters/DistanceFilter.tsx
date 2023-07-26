import { Dispatch } from 'react';
import RangesliderLegacy from 'components/global/Filters/RangesliderLegacy';
import FilterContainer from './FilterContainer';

interface DistanceFilterProps {
  value: number;
  onChangeDistance:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMinDistance?:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  onChangeMaxDistance?:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  minValue?: number;
  maxValue?: number;
}

const DistanceFilter = ({
  value,
  onChangeDistance,
  onChangeMinDistance,
  onChangeMaxDistance,
  minValue,
  maxValue,
}: DistanceFilterProps) => (
  <FilterContainer>
    <RangesliderLegacy
      initialMin={minValue ? minValue : 0}
      initialMax={maxValue ? maxValue : value ? value : 3000}
      min={0}
      max={3000}
      step={1}
      minDifference={0}
      type="distance"
      setMinState={onChangeMinDistance}
      setMaxState={onChangeMaxDistance || onChangeDistance}
    />
  </FilterContainer>
);

export default DistanceFilter;
