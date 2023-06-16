import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';

export interface Option {
  value: string;
  label: string;
}

interface MultipleSelectProps {
  options: Option[];
  onChange?: (value: Option) => void;
  placeholder?: string;
  values: Option[];
  translation: string;
  showCountSelected?: boolean;
}

const MultipleSelect = ({
  options,
  onChange,
  values: selectedOptions,
  placeholder,
  translation,
  showCountSelected = false,
}: MultipleSelectProps) => {
  const [t, i18n] = useTranslation(translation);
  const [tg, i18ng] = useTranslation('global');

  const selectAnyOption = tg('selectAnyOption', 'Select Any Option');
  const selectedLabel = tg('selected', 'Selected');

  const selectedOptionsLabels = selectedOptions.map((option) =>
    t(option.label),
  );

  return (
    <Listbox value="" onChange={() => null}>
      {({ open }) => (
        <section className="relative">
          <Listbox.Button
            className={classnames(
              'bg-white relative w-full border border-gray-300 pl-3 pr-10 py-2 text-left cursor-default text-sm font-normal',
              {
                'border-primary-1000 rounded-t-md': open,
                'rounded-md': !open,
              },
            )}
          >
            <span className="block truncate">
              {showCountSelected
                ? `${selectedOptions.length} ${selectedLabel}`
                : selectedOptionsLabels.join(', ') ||
                  placeholder ||
                  selectAnyOption}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {open ? (
                <ChevronUpIcon
                  className="w-6 h-6 text-dark-700"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="w-6 h-6 text-dark-700"
                  aria-hidden="true"
                />
              )}
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={classnames(
                'absolute mt-[-1px] z-10 w-full max-h-60 rounded-b-md text-sm font-normal overflow-auto styled-scrollbar focus:outline-none ',
                {
                  'border border-primary-1000': open,
                },
              )}
            >
              <section className="grid gap-[1px] bg-dark-200">
                {options.map((option) => {
                  const isSelected = selectedOptions.includes(option);
                  return (
                    <button
                      key={option.value}
                      onClick={() => onChange?.(option)}
                      className={classnames(
                        'block w-full p-2 text-left bg-white hover:bg-dark-100',
                        {
                          'flex justify-between items-center': isSelected,
                        },
                      )}
                    >
                      {t(option.label)}

                      {isSelected && (
                        <CheckIcon
                          className="w-4 h-4 text-primary-1000"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </section>
            </Listbox.Options>
          </Transition>
        </section>
      )}
    </Listbox>
  );
};

export default MultipleSelect;
