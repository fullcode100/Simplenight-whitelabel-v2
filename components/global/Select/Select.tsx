/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

interface SelectProps {
  options: string[];
  label?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  selectedIcon?: boolean;
}

const Select = ({
  options,
  label = '',
  onChange,
  defaultValue,
  selectedIcon = true,
}: SelectProps) => {
  const [selected, setSelected] = useState(defaultValue ?? options[0] ?? '');

  const handleChange = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block mb-2 text-sm font-semibold text-gray-700">
              {label}
            </Listbox.Label>
          )}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
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
              <Listbox.Options className="absolute z-[115] w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      classNames(
                        'cursor-default select-none relative py-2 pl-3',
                        {
                          'text-white bg-primary-600': active,
                          'text-gray-900': !active,
                          'pr-9': selectedIcon,
                        },
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

                        {isSelected && selectedIcon ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
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
