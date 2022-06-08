import React, { BaseSyntheticEvent, useState } from 'react';

interface IRadio {
  value: string;
  state: any;
  label: string;
  name: string;
  className?: string;
  checked?: boolean;
  onChange?: (value: any) => void;
}

const Radio = ({
  value,
  state,
  label,
  name,
  className = '',
  onChange,
}: IRadio) => {
  const handleChange = () => {
    if (onChange) onChange(value);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={value}
        name={name}
        type="radio"
        defaultChecked={state === value}
        onChange={handleChange}
      />
      <label
        htmlFor={value}
        className="ml-3 block text-sm font-semibold text-dark-1000"
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
