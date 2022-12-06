import { FC, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';

interface CheckboxListProps {
  items: CheckboxListItemType[];
  onChange: (checked: string[]) => void;
}

type CheckboxListItemType = {
  label: string;
  value: string;
};

export const CheckboxList: FC<CheckboxListProps> = ({ items, onChange }) => {
  const [itemsList, setItemsList] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Checkbox
          key={item.value + index}
          value={item.value}
          checked={itemsList[item.value]}
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
          {item.label}
        </Checkbox>
      ))}
    </div>
  );
};
