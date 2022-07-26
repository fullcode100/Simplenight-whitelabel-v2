import React from 'react';
import classnames from 'classnames';

export interface InputProps {
  type?: 'text' | 'number' | 'password' | 'date';
  name?: string;
  value?: string | number;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  max?: number;
  min?: number;
  error?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  innerRef?: React.RefObject<HTMLInputElement>;
}

const Input = ({
  type = 'text',
  name = '',
  value = '',
  disabled = false,
  className,
  placeholder = '',
  onChange,
  autoFocus = false,
  max,
  min,
  error,
  innerRef,
  onFocus,
  onBlur,
  ...others
}: InputProps) => {
  const inputStateClasses = classnames(
    { 'text-dark-1000': (value != '' && !disabled) || error },
    {
      'text-dark-600': value == '' || disabled,
    },
  );

  return (
    <input
      type={type}
      name={name}
      id={name}
      ref={innerRef}
      value={value}
      disabled={disabled}
      className={classnames(
        'focus:ring-0 focus:ring-offset-0 border-none w-full bg-transparent h-11 text-sm p-3',
        className,
        inputStateClasses,
      )}
      placeholder={placeholder}
      onChange={onChange && onChange}
      autoFocus={autoFocus}
      max={type == 'number' ? max : ''}
      min={type == 'number' ? min : ''}
      onFocus={onFocus}
      onBlur={onBlur}
      {...others}
    />
  );
};

export default Input;
