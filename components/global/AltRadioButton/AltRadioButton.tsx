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

const AltRadioButton: FC<RadioItemType & RadioInputType> = (props) => {
  return (
    <label
      className={classNames(
        'bg-white h-9 border hover:bg-primary-100 hover:border-primary-300 rounded flex justify-center items-center cursor-pointer grow basis-0',
        {
          'bg-primary-100 border-primary-1000 border-primary-1000 hover:border-primary-1000 text-primary-1000':
            props.checked,
          'px-4': !props.square,
          'w-8': props.square,
        },
      )}
    >
      <span className="absolute opacity-0 pointer-events-none">
        <input
          type="radio"
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </span>
      <span className="text-xs">{props.label}</span>
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
