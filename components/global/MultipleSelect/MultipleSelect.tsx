import classnames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';

interface MultipleSelectProps {
  options: string[];
  onChange?: (value: string) => void;
  placeholder?: string;
  values: string[];
}

const MultipleSelect = ({
  options,
  onChange,
  values: selectedOptions,
  placeholder,
}: MultipleSelectProps) => {
  return (
    <Listbox value="" onChange={() => null}>
      {({ open }) => (
        <section className="relative">
          <Listbox.Button
            className={classnames(
              'bg-white relative w-full border border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm',
              {
                'border-primary-1000 rounded-t-md': open,
                'rounded-md': !open,
              },
            )}
          >
            <span className="block truncate capitalize">
              {selectedOptions.join(', ') || placeholder || 'Select any option'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {open ? (
                <ChevronUpIcon
                  className="h-6 w-6 text-dark-700"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="h-6 w-6 text-dark-700"
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
                'absolute mt-[-1px] z-10 w-full bg-dark-200 shadow-lg max-h-60 rounded-b-md text-base overflow-auto focus:outline-none sm:text-sm',
                {
                  'border border-primary-1000': open,
                },
              )}
            >
              <section className="grid gap-[1px]">
                {options.map((option) => {
                  const isSelected = selectedOptions.includes(option as never);
                  return (
                    <button
                      key={option}
                      onClick={() => onChange?.(option)}
                      className={classnames(
                        'block w-full p-2 text-left bg-white hover:bg-dark-100',
                        {
                          'flex justify-between items-center': isSelected,
                        },
                      )}
                    >
                      {option}

                      {isSelected && (
                        <CheckIcon
                          className="h-4 w-4 text-primary-1000"
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
