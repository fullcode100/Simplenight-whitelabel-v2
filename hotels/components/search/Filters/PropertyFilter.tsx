import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from 'components/global/Checkbox/Checkbox';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface PropertyFilterProps {
  hotels: boolean;
  vacationRentals: boolean;
  onChangeHotels:
    | Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void);
  onChangeVacationRentals:
    | Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void);
}

const PropertyFilter = ({
  hotels,
  vacationRentals,
  onChangeHotels,
  onChangeVacationRentals,
}: PropertyFilterProps) => {
  const [t, i18n] = useTranslation('hotels');
  const propertyTypesLabel = t('propertyType', 'Property Type');
  const hotelLabel = t('hotel', 'Hotel');
  const vacationRentalLabel = t('vacationRental', 'Vacation Rental');

  return (
    <FilterContainer>
      <section className="grid gap-3">
        <FilterTitle label={propertyTypesLabel} />
        <Checkbox
          value={'hotels'}
          checked={hotels}
          name={'hotels'}
          onChange={onChangeHotels}
        >
          {hotelLabel}
        </Checkbox>
        <Checkbox
          value={'vacationRentals'}
          checked={vacationRentals}
          name={'vacationRentals'}
          onChange={onChangeVacationRentals}
        >
          {vacationRentalLabel}
        </Checkbox>
      </section>
    </FilterContainer>
  );
};
export default PropertyFilter;
