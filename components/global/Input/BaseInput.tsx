import { FC, useRef } from 'react';
import I18nHOC from '../I18nHOC/I18nHOC';
import Label from '../Label/Label';
import classnames from 'classnames';
import ClearIcon from 'public/icons/assets/clear.svg';

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
}

type InputType = 'text' | 'number' | 'date' | 'select' | 'email';

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
      <div className="max-w-[44px] max-h-[44px] relative">
        {children}
        {leftIcon}
        {Input}
        {rightIcon}
        {clearable && <ClearIcon />}
      </div>
    </section>
  );

  const CustomInput = customInput;
  const inputBaseClass =
    'focus:ring-primary-500 focus:border-primary-500 block w-full h-11 sm:text-sm border-gray-300 rounded';
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
        {leftIcon}
        {Input}
        {rightIcon}
        {!!clearable && !!value && <ClearButton onClick={onClear} />}
      </div>
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
