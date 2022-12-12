import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from 'components/global/Checkbox/Checkbox';
import FilterContainer from './FilterContainer';

export interface PaymentFilterProps {
  freeCancellation: boolean;
  onChangeFreeCancellation:
    | Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void);
}

const PaymentFilter = ({
  freeCancellation,
  onChangeFreeCancellation,
}: PaymentFilterProps) => {
  const [t] = useTranslation('global');
  const freeCancellationLabel = t('freeCancellation', 'Free Cancellation');

  return (
    <FilterContainer>
      <section className="grid gap-[22px]">
        <Checkbox
          value={'freeCancellation'}
          checked={freeCancellation}
          name={'freeCancellation'}
          onChange={onChangeFreeCancellation}
        >
          {freeCancellationLabel}
        </Checkbox>
      </section>
    </FilterContainer>
  );
};
export default PaymentFilter;
