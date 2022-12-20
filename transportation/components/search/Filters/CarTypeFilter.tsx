import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from 'components/global/Checkbox/Checkbox';
import FilterContainer from './FilterContainer';

export interface CarTypeFilterProps {
  carType: string[];
  onChangeFreeCancellation:
  | Dispatch<React.SetStateAction<boolean>>
  | ((value: boolean) => void);
}

const CarTypeFilter = ({
  carType,
  onChangeFreeCancellation,
}: CarTypeFilterProps) => {
  const [t] = useTranslation('ground-transportation');
  const freeCancellationLabel = t('freeCancellation', 'Free Cancellation');

  return (
    <FilterContainer>
      <section className="grid gap-[22px]">
        {carType?.map((e) => (
          <Checkbox
            value={e}
            checked={false}
            name={e}
            onChange={onChangeFreeCancellation}
          >
            {capitalizeFirst(e)}
          </Checkbox>
        ))}
      </section>
    </FilterContainer>
  );
};
export default CarTypeFilter;

const capitalizeFirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};