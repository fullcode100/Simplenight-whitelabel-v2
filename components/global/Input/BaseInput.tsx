import { useEffect, useRef } from 'react';
import I18nHOC from '../I18nHOC/I18nHOC';
import Label from '../Label/Label';
import classnames from 'classnames';
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
  error?: boolean;
}

type InputType = 'text' | 'number' | 'date' | 'select';

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
  error,
  ...others
}: BaseInputProps & BaseInputHiddenProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const internalInputClassName = classnames({
    'w-11 h-11 text-center': type === 'number',
  });
  const NumberInput = () => (
    <section className="w-full h-full flex items-center justify-between">
      <section className="flex flex-col gap-1">
        <div className="text-dark-850 text-[16px] leading-[16px]">{label}</div>
        <div className="text-dark-800 text-[16px] leading-[16px]">
          {sublabel}
        </div>
      </section>
      <div className="max-w-[44px] max-h-[44px] relative">
        {children}
        {leftIcon}
        {Input}
        {rightIcon}
      </div>
    </section>
  );

  const CustomInput = customInput;
  const inputBaseClass =
    'shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded';
  const inputDynamicClass = classnames(
    `${inputBaseClass} ${inputClassName} ${internalInputClassName}`,
    {
      'border-error-500 focus:border-error-500': error,
    },
  );
  const Input = (customInput && <CustomInput />) || (
    <input
      type={type}
      name={name}
      id={name}
      ref={inputRef}
      value={value}
      disabled={disabled}
      className={inputDynamicClass}
      placeholder={placeholder}
      onChange={onChange}
      autoFocus={autoFocus}
      max={type == 'number' ? max : ''}
      {...others}
    />
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
      </div>
    </div>
  );
};

/* eslint new-cap: ["off"] */
export default I18nHOC<BaseInputProps & BaseInputHiddenProps>(BaseInput);
