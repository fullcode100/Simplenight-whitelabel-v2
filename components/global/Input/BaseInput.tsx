import React, { FC, useRef } from 'react';
import I18nHOC from '../I18nHOC/I18nHOC';
import Label from '../Label/Label';
import classnames from 'classnames';
import ClearIcon from 'public/icons/assets/clear.svg';
import ErrorMessage from '../ErrorMessage';

export interface BaseInputProps {
  children?: any;
  name?: string;
  value?: any;
  label?: string;
  sublabel?: string;
  placeholder?: string;
  inputClassName?: string;
  customInput?: any;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  max?: number;
  min?: number;
  error?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  defaultValue?: string;
  externalWidth?: boolean;
  errorMessage?: string;
}

type InputType = 'text' | 'number' | 'date' | 'select' | 'email' | 'password';

interface BaseInputHiddenProps {
  type?: InputType;
  leftIcon?: any;
  rightIcon?: any;
}

const BaseInput = ({
  label = '',
  sublabel = '',
  name = '',
  placeholder = '',
  inputClassName = '',
  type = 'text',
  className = '',
  disabled = false,
  leftIcon,
  rightIcon,
  customInput,
  value,
  onChange,
  onClick,
  children,
  autoFocus = false,
  max,
  min,
  error,
  clearable,
  onClear,
  defaultValue,
  externalWidth = false,
  errorMessage,
  ...others
}: BaseInputProps & BaseInputHiddenProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const internalInputClassName = classnames({
    'w-11 h-11 text-center': type === 'number',
  });
  const NumberInput = () => (
    <section className="flex items-center justify-between w-full h-full">
      <section className="flex flex-col gap-1">
        <div className="text-dark-850 text-[16px] leading-[16px] font-semibold">
          {label}
        </div>
        <div className="text-dark-800 text-[16px] leading-[16px] font-semibold">
          {sublabel}
        </div>
      </section>
      <div
        className={`max-h-[44px] relative ${
          externalWidth ? '' : 'max-w-[44px]'
        }`}
      >
        {children}
        {leftIcon}
        {Input}
        {rightIcon}
        {clearable && <ClearIcon />}
      </div>
    </section>
  );

  const CustomInput = customInput;
  const inputBaseClass = `${
    errorMessage
      ? 'focus:ring-error-1000 focus:border-error-1000 border-error-1000'
      : 'focus:ring-primary-500 focus:border-primary-500 border-gray-300'
  } block w-full h-11 sm:text-sm rounded`;
  const inputDynamicClass = classnames(
    `${inputBaseClass} ${inputClassName} ${internalInputClassName}`,
    {
      'border-error-500 focus:border-error-500': error,
    },
  );
  const Input = (customInput && <CustomInput />) || (
    <>
      <style>{`
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
      <input
        type={type}
        name={name}
        id={name}
        ref={inputRef}
        value={value}
        className={inputDynamicClass}
        placeholder={placeholder}
        onChange={onChange}
        autoFocus={autoFocus}
        max={type == 'number' ? max : ''}
        min={type == 'number' ? min : ''}
        onClick={onClick}
        defaultValue={defaultValue}
        readOnly={label === 'Returning' || label === 'Departing'}
        {...others}
      />
    </>
  );

  if (type === 'number') return <NumberInput />;

  return (
    <div className={`w-full ${className}`} onClick={onClick}>
      <Label value={label} htmlFor={name} />
      <div className="relative mt-2">
        {children}
        <div className="relative">
          {leftIcon}
          <div className={'h-full absolute right-0'}>{rightIcon}</div>
          {Input}
        </div>
        {!!clearable && !!value && <ClearButton onClick={onClear} />}
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

interface ClearButtonProps {
  onClick?: () => void;
}

const ClearButton: FC<ClearButtonProps> = (props) => (
  <section className="absolute top-0 right-0 pr-2 flex items-center inset-y-0">
    <button
      className="w-8 h-8 flex justify-center items-center  rounded-2xl hover:bg-primary-100"
      onClick={props.onClick}
    >
      <ClearIcon className="text-dark-700" />
    </button>
  </section>
);

/* eslint new-cap: ["off"] */
export default I18nHOC<BaseInputProps & BaseInputHiddenProps>(BaseInput);
