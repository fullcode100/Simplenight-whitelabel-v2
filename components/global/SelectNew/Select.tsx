import { BaseInputProps } from '../Input/BaseInput';
import IconInput from '../Input/IconInput';
import { Listbox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import classnames from 'classnames';

interface SelectProps extends Omit<BaseInputProps, 'onChange'> {
  onChange: (val: string) => void;
  icon: ReactNode;
  items: SelectItem[];
}

export type SelectItem = {
  label: string;
  value: string;
};

export const Select = ({
  value,
  onChange,
  items,
  ...props
}: SelectProps): JSX.Element => (
  <section className="relative w-full">
    <Listbox as={Fragment} value={value} onChange={onChange}>
      <Listbox.Button as={Fragment}>
        <div>
          <IconInput
            {...props}
            value={items.find((i) => i.value === value)?.label}
            onChange={() => false}
          />
        </div>
      </Listbox.Button>
      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {items.map((item, index) => (
          <Listbox.Option key={index} value={item.value} as={Fragment}>
            {({ selected, active }) => (
              <span
                className={classnames(
                  'block relative cursor-default select-none p-2',
                  {
                    'bg-primary-1000 text-white': selected,
                    'bg-primary-100': active && !selected,
                  },
                )}
              >
                {item.label}
              </span>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  </section>
);
