import { FC, useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';

interface CheckboxListProps {
  value: string[];
  items: CheckboxListItemType[];
  onChange: (checked: string[]) => void;
}

type CheckboxListItemType = {
  label: string;
  value: string;
};

type ValueType = { [key: string]: boolean };

const valueArrToObj = (value: string[]): ValueType => {
  return value.reduce((all, curr) => {
    return { ...all, [curr]: true };
  }, {});
};

export const CheckboxList: FC<CheckboxListProps> = ({
  value,
  items,
  onChange,
}) => {
  const [itemsList, setItemsList] = useState<ValueType>(valueArrToObj(value));

  useEffect(() => {
    setItemsList(valueArrToObj(value));
  }, [value.length]);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Checkbox
          key={item.value + index}
          value={item.value}
          checked={Boolean(itemsList[item.value])}
          onChange={(checked: boolean) => {
            const checkedItems = {
              ...itemsList,
              [item.value]: checked,
            };
            setItemsList(checkedItems);
            onChange(
              Object.entries(checkedItems)
                .filter(([, value]) => value)
                .map(([key]) => key),
            );
          }}
        >
          <p className="font-semibold text-sm leading-5 text-dark-1000">
            {item.label}
          </p>
        </Checkbox>
      ))}
    </div>
  );
};
