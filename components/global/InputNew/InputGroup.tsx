import React, { useRef, useState } from 'react';
import classnames from 'classnames';

interface InputGroupProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  leftAddon?: string;
  rightAddon?: string;
  value?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const InputGroup = ({
  iconLeft,
  iconRight,
  leftAddon,
  rightAddon,
  value,
  disabled = false,
  children,
}: InputGroupProps) => {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputFocus = () => {
    inputRef.current?.focus();
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { inputRef, onFocus, onBlur, disabled });
    }
    return child;
  });

  return (
    <div>
      {/* <Label value={label} htmlFor={name} /> */}
      <section
        className={classnames(
          `border rounded-4 flex overflow-hidden ${
            disabled ? 'bg-dark-200' : 'bg-white'
          }`,
          { 'border-dark-300': !focused },
          { 'border-primary-1000': focused },
          { 'border-dark-400': !focused && value != '' },
          { 'border-dark-300': disabled },
        )}
        onClick={inputFocus}
      >
        {leftAddon && (
          <div
            className={`flex items-center justify-center text-sm text-dark-800 px-2 ${
              disabled ? 'bg-transparent' : 'bg-dark-100'
            }`}
          >
            {leftAddon}
          </div>
        )}
        {iconLeft && (
          <div
            className={`flex items-center pl-3 ${
              focused ? 'text-dark-1000' : 'text-dark-700'
            }`}
          >
            {iconLeft}
          </div>
        )}
        {childrenWithProps}
        {iconRight && (
          <div
            className={`flex items-center pr-3 ${
              focused ? 'text-dark-1000' : 'text-dark-700'
            }`}
          >
            {iconRight}
          </div>
        )}
        {rightAddon && (
          <div
            className={`flex items-center justify-center text-sm text-dark-800 px-2 ${
              disabled ? 'bg-transparent' : 'bg-dark-100'
            }`}
          >
            {rightAddon}
          </div>
        )}
      </section>
    </div>
  );
};

export default InputGroup;
