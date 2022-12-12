import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import RangesliderLegacy from 'components/global/Filters/RangesliderLegacy';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface DistanceFilterProps {
  value: string;
  onChangeDistance:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const DistanceFilter = ({ value, onChangeDistance }: DistanceFilterProps) => {
  const [t, i18n] = useTranslation('events');
  const starRatingLabel = t('distanceRange', 'Distance Range');

  return (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <RangesliderLegacy
        initialMax={value ? parseInt(value) : 3000}
        min={0}
        max={3000}
        step={1}
        minDifference={0}
        type="distance"
        setMaxState={onChangeDistance}
      />
    </FilterContainer>
  );
};

export default DistanceFilter;
