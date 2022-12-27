import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';
import { SORT_BY_OPTIONS } from 'hotels/constants/sortByOptions';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import { DATES_OPTIONS } from 'hotels/constants/amenities';
import { useState } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface MultipleSelectProps {
  options: Option[];
  onChange?: (value: Option) => void;
  placeholder?: string;
  translation: string;
}

const SingleSelectDropdown = ({
  options,
  onChange,
  placeholder,
  translation,
}: MultipleSelectProps) => {
  const [t, i18n] = useTranslation(translation);
  const [tg, i18ng] = useTranslation('global');

  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const selectAnyOption = tg('selectAnyOption', 'Select Any Option');

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
            <span className="block truncate">{selectedValue}</span>
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
                'absolute mt-[-1px] z-10 w-full bg-white max-h-60 rounded-b-md text-sm font-normal overflow-auto focus:outline-none ',
                {
                  'border border-primary-1000': open,
                },
              )}
            >
              <section className="grid gap-[1px] p-3">
                <RadioGroup
                  onChange={(e) => {
                    setSelectedValue(e);
                  }}
                  value={selectedValue}
                >
                  {options.map((option, i) => (
                    <Radio key={i} value={option?.value}>
                      {t(option.label)}
                    </Radio>
                  ))}
                </RadioGroup>
              </section>
            </Listbox.Options>
          </Transition>
        </section>
      )}
    </Listbox>
  );
};

export default SingleSelectDropdown;
