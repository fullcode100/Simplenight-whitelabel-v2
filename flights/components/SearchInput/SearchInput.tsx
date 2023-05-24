/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactNode, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import CloseIcon from 'public/icons/assets/close.svg';
import classNames from 'classnames';

export interface OptionItem {
  id: string;
  name: string;
}

interface SearchInputProps {
  options: OptionItem[];
  value?: OptionItem | null;
  label?: string;
  onSelect?: (value: OptionItem | null) => void;
  onChange?: (value: string) => void;
  icon?: ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  placeholder?: string;
}

const SearchInput = ({
  options,
  value,
  label,
  onSelect,
  onChange,
  icon,
  loading,
  loadingMessage = 'Loading',
  placeholder,
}: SearchInputProps) => {
  const [selected, setSelected] = useState(value);

  const handleChange = (value: OptionItem | null) => {
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  return (
    <section className="w-full">
      <Combobox value={selected} onChange={handleChange} disabled={!!selected}>
        {({ open }) => (
          <section className="relative">
            <Combobox.Label className="block text-sm font-semibold text-dark-800 hover:cursor-pointer">
              {label}
            </Combobox.Label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {icon}
              </span>
              <Combobox.Input
                onChange={(event) => onChange?.(event.target.value)}
                displayValue={(opt: OptionItem) => opt?.name}
                className={classNames(
                  'focus:ring-primary-500 focus:border-primary-500 block w-full h-11 sm:text-sm border-gray-300 rounded pl-10',
                  {
                    'pr-10': !!selected,
                  },
                )}
                placeholder={placeholder}
                autoComplete="off"
              />

              {!!selected && (
                <section
                  className="absolute right-2 inset-y-0 flex items-center z-10 w-[30px]"
                  onClick={() => {
                    handleChange(null);
                    onChange?.('');
                  }}
                >
                  <CloseIcon className="text-dark-700" />
                </section>
              )}

              <Transition
                show={open && !loading}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => onChange?.('')}
              >
                <Combobox.Options
                  className={classNames(
                    'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
                    {
                      hidden: options.length === 0,
                    },
                  )}
                >
                  {options.map((option) => (
                    <Combobox.Option
                      key={option.id}
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
                        {option.name}
                      </span>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
            {loading && (
              <section className="absolute">{loadingMessage}...</section>
            )}
          </section>
        )}
      </Combobox>
    </section>
  );
};

export default SearchInput;
