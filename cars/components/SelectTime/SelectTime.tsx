/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ClockIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

interface SelectProps {
  options: string[];
  value: string;
  label?: string;
  onChange?: (value: string) => void;
}

const Select = ({ options, value, label = '', onChange }: SelectProps) => {
  const [selected, setSelected] = useState(value);

  const handleChange = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-semibold text-gray-700">
            {label}
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="block w-full bg-white border border-gray-300 rounded pl-3 pl-10 py-2 text-left text-dark-1000 cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm h-11 min-w-[130px]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <ClockIcon
                  className="h-5 w-5 text-dark-700"
                  aria-hidden="true"
                />
              </span>
              <span className="block truncate pl-6">{selected}</span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'text-primary-1000 bg-primary-100'
                          : 'text-gray-700',
                        'cursor-default select-none relative py-2 pl-3 pr-3',
                      )
                    }
                    value={option}
                  >
                    <span className={classNames('block truncate')}>
                      {option}
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
