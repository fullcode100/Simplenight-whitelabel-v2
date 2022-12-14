import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from 'components/global/Checkbox/Checkbox';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface PropertyFilterProps {
  recommended: boolean;
  openNow: boolean;
  offeringDiscounts: boolean;
  onChangeHotels:
    | Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void);
  onChangeVacationRentals:
    | Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void);
}

const SortByFilter = ({
  recommended,
  openNow,
  offeringDiscounts,
  onChangeHotels,
  onChangeVacationRentals,
}: PropertyFilterProps) => {
  const [t, i18n] = useTranslation('dining');
  const propertyTypesLabel = t('sortBy', 'Sort by');
  const recommendedLabel = t('recommended', 'Recommended');
  const openNowLabel = t('openNow', 'Open Now');
  const offeringDiscountsLabel = t('offeringDiscounts', 'Offering Discounts');

  return (
    <FilterContainer>
      <section className="grid gap-3">
        <FilterTitle label={propertyTypesLabel} />
        <Checkbox
          value={'Dinings'}
          checked={recommended}
          name={'recommended'}
          onChange={onChangeHotels}
        >
          {recommendedLabel}
        </Checkbox>
        <Checkbox
          value={'openNow'}
          checked={openNow}
          name={'openNow'}
          onChange={onChangeVacationRentals}
        >
          {openNowLabel}
        </Checkbox>
        <Checkbox
          value={'offeringDiscounts'}
          checked={offeringDiscounts}
          name={'offeringDiscounts'}
          onChange={onChangeVacationRentals}
        >
          {offeringDiscountsLabel}
        </Checkbox>
      </section>
    </FilterContainer>
  );
};
export default SortByFilter;
