import React, { useRef, useState } from 'react';
import Input, { InputProps } from './Input';
import classnames from 'classnames';

interface InputGroupProps {
  icon?: string;
}

const InputGroup = ({
  icon,
  onChange,
  value,
  name,
  disabled = false,
  placeholder,
  type,
}: InputGroupProps & InputProps) => {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      {/* <Label value={label} htmlFor={name} /> */}
      <section
        className={classnames(
          `border rounded-4 flex ${disabled ? 'bg-dark-200' : 'bg-white'}`,
          { 'border-dark-300': !focused },
          { 'border-primary-1000': focused },
          { 'border-dark-400': !focused && value != '' },
          { 'border-dark-300': disabled },
        )}
        onClick={inputFocus}
      >
        {icon}
        <Input
          onChange={onChange}
          value={value}
          name={name}
          innerRef={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
        />
      </section>
    </div>
  );
};

export default InputGroup;
