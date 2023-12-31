import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';
import BaseInput from 'components/global/Input/BaseInput';

interface PropertyFilterProps {
  name: string;
  onChangeHotels:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  handleClearName: () => void;
}

const NameFilter = ({
  name,
  onChangeHotels,
  handleClearName,
}: PropertyFilterProps) => {
  const [t, i18n] = useTranslation('hotels');
  const propertyTypesLabel = t('searchHotel', 'Search Hotel');

  return (
    <FilterContainer>
      <section className="grid gap-3">
        <FilterTitle label={propertyTypesLabel} />
        <BaseInput
          value={name}
          onChange={(e) => onChangeHotels(e.target.value)}
          clearable={true}
          onClear={handleClearName}
        />
      </section>
    </FilterContainer>
  );
};
export default NameFilter;
