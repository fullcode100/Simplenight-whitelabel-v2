import { useTranslation } from 'react-i18next';

import Checkbox from 'components/global/Checkbox/Checkbox';
import FilterContainer from './FilterContainer';
import { AllowsReservationFilterProps } from 'dining/constants/sortByOptions';

const AllowsReservationFilter = ({
  allowsReservation,
  onChangeAllowsReservation,
}: AllowsReservationFilterProps) => {
  const [t] = useTranslation('global');
  const allowsReservationLabel = t('allowsReservation', 'Allows Reservation');

  return (
    <FilterContainer>
      <section className="grid gap-[22px]">
        <Checkbox
          value={'allowsReservation'}
          checked={allowsReservation}
          name={'allowsReservation'}
          onChange={onChangeAllowsReservation}
        >
          {allowsReservationLabel}
        </Checkbox>
      </section>
    </FilterContainer>
  );
};
export default AllowsReservationFilter;
