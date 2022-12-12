import React, { SyntheticEvent } from 'react';
import { ChangeEvent } from 'react';
import classNames from 'classnames';

interface PillProps {
  checked?: boolean;
  label: string;
  value: string;
  className?: string;
}
const Pill = ({ checked = false, label, value, className = '' }: PillProps) => {
  return (
    <label
      className={`border bg-white border-dark-300 rounded-4 px-3 py-2 capitalize text-xs font-semibold shrink-0  hover:bg-dark-100
      ${className}
    ${checked && 'bg-primary-100 border-primary-300 text-primary-800'} `}
    >
      <input type="checkbox" value={value} className="hidden" />
      {label}
    </label>
  );
};

export default Pill;
