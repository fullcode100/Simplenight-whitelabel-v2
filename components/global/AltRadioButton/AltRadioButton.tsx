import { FC, ReactNode } from 'react';
import classNames from 'classnames';

export interface RadioItemType {
  value: string;
  label: ReactNode;
}

interface RadioInputType {
  name: string;
  onChange: (value: string) => void;
  checked: boolean;
  square?: boolean;
}

const AltRadioButton: FC<RadioItemType & RadioInputType> = ({
  checked,
  square,
  name,
  value,
  onChange,
  label,
}) => {
  return (
    <label
      className={classNames(
        'h-10 rounded flex justify-center items-center cursor-pointer grow basis-0 ',
        square ? 'w-10' : 'px-4',
        checked
          ? 'bg-primary-100 text-primary-1000 shadow-container'
          : 'text-dark-400',
      )}
    >
      <span className="absolute opacity-0 pointer-events-none">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
        />
      </span>
      <span className="text-xs">{label}</span>
    </label>
  );
};

interface AltRadioButtonGroupProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
  items: RadioItemType[];
  square?: boolean;
}

export const AltRadioButtonGroup: FC<AltRadioButtonGroupProps> = ({
  name,
  items,
  onChange,
  value,
  square,
}) => {
  return (
    <section className="flex gap-2 w-full">
      {items.map((item, index) => (
        <AltRadioButton
          key={`radio-item-${name}-${index}`}
          name={name}
          onChange={onChange}
          checked={value === item.value}
          square={square}
          {...item}
        />
      ))}
    </section>
  );
};
