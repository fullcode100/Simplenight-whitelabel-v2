import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from 'components/global/Checkbox/Checkbox';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface PropertyFilterProps {
  cars: boolean;
  vacationRentals: boolean;
  onChangeCars:
    | Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void);
  onChangeVacationRentals:
    | Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void);
}

const PropertyFilter = ({
  cars,
  vacationRentals,
  onChangeCars,
  onChangeVacationRentals,
}: PropertyFilterProps) => {
  const [t, i18n] = useTranslation('cars');
  const propertyTypesLabel = t('propertyType', 'Property Type');
  const carLabel = t('car', 'Car');
  const vacationRentalLabel = t('vacationRental', 'Vacation Rental');

  return (
    <FilterContainer>
      <section className="grid gap-3">
        <FilterTitle label={propertyTypesLabel} />
        <Checkbox
          value={'cars'}
          checked={cars}
          name={'cars'}
          onChange={onChangeCars}
        >
          {carLabel}
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
