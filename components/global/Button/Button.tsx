/* eslint indent: off */
import React from 'react';

import { useColor } from 'hooks/layoutAndUITooling/useColor';
import NormalButton from './components/NormalButton';
import I18nHOC from '../I18nHOC/I18nHOC';
import DualButton from './components/DualButton';

interface ButtonProps {
  value: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Button tailwind class color, e.g. 'blue-500' . */
  color?: string;
  /** Button tailwind class text color, e.g. 'white' . */
  textColor?: string;
  className?: string;
  disabled?: boolean;
  type?:
    | 'contained'
    | 'outlined'
    | 'dual'
    | 'square-contained'
    | 'square-outlined'
    | 'square-no-bg';
  [key: string]: any;
}

/* eslint new-cap: ["off"] */
const Button = ({
  value,
  size = 'md',
  color = 'primary',
  textColor = 'white',
  type = 'contained',
  disabled = false,
  className = '',
  ...others
}: ButtonProps) => {
  const colors = useColor(color, type);

  let sizeTailwindClass;
  switch (size) {
    case 'sm':
      sizeTailwindClass = 'w-18 h-6 text-sm';
      break;
    case 'md':
      sizeTailwindClass = 'w-24 h-7 text-md';
      break;
    case 'lg':
      sizeTailwindClass = 'w-32 h-8 text-lg';
      break;
    case 'full':
      sizeTailwindClass = 'w-full';
      break;
  }

  switch (type) {
    case 'dual': {
      return (
        <DualButton
          colors={colors}
          sizeClassname={sizeTailwindClass}
          value={value}
          disabled={disabled}
          className={className}
          {...others}
        />
      );
    }
    default: {
      return (
        <NormalButton
          colors={colors}
          sizeClassname={sizeTailwindClass}
          value={value}
          disabled={disabled}
          className={className}
          {...others}
        />
      );
    }
  }
};

/* eslint new-cap: ["off"] */
export default I18nHOC<ButtonProps>(Button);
