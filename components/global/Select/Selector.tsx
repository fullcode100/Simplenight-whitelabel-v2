import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

type Option = { name: string; id: string };
interface SelectProps {
  options: Array<Option>;
  label?: string;
  onChange?: (value: string) => void;
  idSelected?: string;
  icon?: React.ReactElement;
  containerClassName?: string;
}

const Selector = ({
  options,
  label = '',
  onChange,
  idSelected,
  icon,
  containerClassName,
}: // defaultValue,
SelectProps) => {
  const selected = idSelected
    ? options.find((option) => option.id === idSelected)
    : options[0];

  const handleChange = (value: Option) => {
    if (onChange) onChange(value.id);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block mb-2 text-sm font-semibold text-gray-700">
            {label}
          </Listbox.Label>
          <div className={classNames('relative mt-1', containerClassName)}>
            <Listbox.Button className="flex gap-2 relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {icon}
              <span className="block truncate">{selected?.name}</span>
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
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-primary-600' : 'text-gray-900',
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
                          {option.name}
                        </span>

                        {isSelected ? (
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

export default Selector;
