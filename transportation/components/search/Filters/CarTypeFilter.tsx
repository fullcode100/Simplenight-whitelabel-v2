import { useTranslation } from 'react-i18next';
import { useCapitalizeFirstChar } from 'transportation/hooks/useCapitalizeFirstChar';
import { CheckboxList } from '../../../../components/global/Checkbox/CheckboxList';
import FilterContainer from './FilterContainer';

export interface CarTypeFilterProps {
  value: string[];
  items: string[]
  onChange: (items: string[]) => void;
}

const CarTypeFilter = ({
  value,
  onChange,
  items
}: CarTypeFilterProps) => {
  const [t] = useTranslation('ground-transportation');

  return (
    <FilterContainer>
      <section className="grid gap-[22px]">
        <CheckboxList
          value={value}
          onChange={onChange}
          items={items?.map((e) => ({ value: e, label: t(useCapitalizeFirstChar(e)) }))}
        />
      </section>
    </FilterContainer>
  );
};
export default CarTypeFilter;