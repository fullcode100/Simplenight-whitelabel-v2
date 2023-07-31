import { useCallback, FC } from 'react';

import Checkbox from 'components/global/Checkbox/Checkbox';
import FilterContainer from './FilterContainer';

interface MultipleCheckboxFilterProps {
  list: { value: string; label: string }[];
  onChangeSelection: (list: string[]) => void;
  selected: string[];
}

const MultipleCheckboxFilter: FC<MultipleCheckboxFilterProps> = ({
  onChangeSelection,
  list,
  selected,
}) => {
  const onCheck = useCallback((value: string) => {
    if (selected.includes(value)) {
      const newArray = [...selected].filter((e) => e !== value);
      onChangeSelection(newArray);
    } else {
      const currentValue = [...selected];
      currentValue.push(value);
      onChangeSelection(currentValue);
    }
  }, []);

  return (
    <FilterContainer>
      <section className="grid gap-[22px]">
        {list.map((e, i) => (
          <Checkbox
            key={i}
            value={e.value}
            checked={selected.includes(e.value)}
            name={e.label}
            onChange={() => onCheck(e.value)}
          >
            {e.label}
          </Checkbox>
        ))}
      </section>
    </FilterContainer>
  );
};
export default MultipleCheckboxFilter;
