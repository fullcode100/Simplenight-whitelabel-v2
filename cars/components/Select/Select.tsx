/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
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
            <Listbox.Button className="block w-full bg-white border border-gray-300 rounded pl-3 pr-10 py-2 text-left text-gray-500 cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm h-11 min-w-[120px]">
              <span className="block truncate">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
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
                        active ? 'text-white bg-primary-600' : 'text-gray-700',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      )
                    }
                    value={option}
                  >
                    {({ selected: isSelected, active }) => (
                      <>
                        <span
                          className={classNames(
                            isSelected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {option}
                        </span>

                        {isSelected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
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
