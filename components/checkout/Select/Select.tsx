/* eslint-disable react/display-name */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useRef,
  useState,
  ForwardedRef,
  forwardRef,
  ComponentPropsWithRef,
} from 'react';
import classnames from 'classnames';
import { useOnOutsideClick } from 'hooks/windowInteraction/useOnOutsideClick';
import ChevronUp from 'public/icons/assets/chevron-up-arrow.svg';
import { type ComponentPropsWithoutRef } from 'react';

export interface GeneralProps extends ComponentPropsWithoutRef<'input'> {
  inputSize?: 'large' | 'small';
  state?: 'idle' | 'disabled' | 'error' | 'success';
}

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectProps = Omit<
  GeneralProps,
  'value' | 'onChange' | 'defaultValue'
>;

export interface SelectSpecificProps extends SelectProps {
  leftPadding?: string;
  hideArrow?: boolean;
  options: SelectOption[];
  defaultValue?: SelectOption;
  searchable?: boolean;
  error?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (option: SelectOption) => void;
}

function getStylesBySize(inputSize: 'large' | 'small') {
  return {
    height: inputSize === 'small' ? 'h-8' : 'h-11',
    textSize: inputSize === 'small' ? 'text-sm' : 'text-base',
    iconSize: inputSize === 'large' ? 'w-5 h-5' : 'w-4 h-4',
  };
}

const Select = forwardRef(
  (
    {
      searchable = false,
      options,
      defaultValue,
      inputSize = 'large',
      state = 'idle',
      placeholder = '',
      onChange,
      leftPadding = 'pl-0',
      hideArrow = false,
      error,
      ...rest
    }: SelectSpecificProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [input, setInput] = useState(defaultValue?.label || '');
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState(options);
    const { height, textSize, iconSize } = getStylesBySize(inputSize);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);
    useOnOutsideClick(selectRef, () => setOpen(false));
    // / COLORS:
    const idleBorderColor = selectedOption
      ? 'border-dark-400'
      : 'border-dark-300';
    const errorColors = `text-dark-1000 ${
      open ? 'border-primary-1000' : 'border-error-1000'
    } `;
    const disabledColors = 'text-dark-600 border-dark-300 bg-dark-200';
    const inputColors = `text-dark-1000 ${
      open ? 'border-primary-1000' : idleBorderColor
    }
      ${error && errorColors}
      ${rest.disabled && disabledColors}`;

    return (
      <section ref={selectRef} className="relative mt-2">
        <section
          ref={searchInputRef}
          className={`flex items-center w-full border pl-3 pr-2 rounded ${height} ${inputColors} ${
            open && 'rounded-t'
          }`}
          onClick={(e) => {
            if (rest.disabled || !searchInputRef.current) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            if (!searchable || (searchable && !open)) setOpen((o) => !o);
            if (searchable && !open) searchInputRef.current.focus();
            if (searchable && open) searchInputRef.current.blur();
          }}
        >
          <input
            type="text"
            className={`${leftPadding} ${textSize} ${inputColors} ${
              !searchable && 'cursor-pointer'
            } w-full h-full  border-none focus:shadow-none focus:inset-0 focus:ring-0 focus:outline-none focus:border-transparent`}
            ref={ref}
            placeholder={placeholder}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSelectedOption(undefined);
              setOpen(true);
              setSearchResults(
                options.filter((option) =>
                  option.label
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }}
            readOnly={!searchable}
            {...rest}
          />
          {!hideArrow && (
            <button type="button">
              <ChevronUp
                className={`text-dark-700 transition-all ${iconSize} ${
                  !open && 'rotate-180'
                }`}
              />
            </button>
          )}
        </section>
        <section
          className={`border border-t-0 rounded-b absolute bg-white max-h-[264px] w-full text-left z-10 overflow-scroll scrollbar-hide ${inputColors} ${
            !open ? 'hidden' : 'block'
          }`}
        >
          {searchResults.map((option: SelectOption) => (
            <button
              key={option.value}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedOption(option);
                setInput(option.label);
                setOpen(false);
                onChange?.(option);
              }}
              className="block w-full p-2 border-b border-solid cursor-pointer select-none border-dark-200 hover:bg-dark-100 last:border-b-0"
            >
              {option.label}
            </button>
          ))}
        </section>
      </section>
    );
  },
);
export default Select;
