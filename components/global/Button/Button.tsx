import React from 'react';

import classnames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  value: string;
  size?: 'sm' | 'md' | 'lg';
  /** Button tailwind class color, e.g. 'blue-500' . */
  color?: string;
  /** Button tailwind class text color, e.g. 'white' . */
  textColor?: string;
  [key: string]: any;
}

const Button = ({
  value,
  size = 'md',
  color = 'primary',
  textColor = 'white',
  ...others
}: ButtonProps) => {
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
  }

  return (
    <button
      className={classnames(
        styles.root,
        `bg-${color} text-${textColor} ${sizeTailwindClass}`,
      )}
      {...others}
    >
      {value}
    </button>
  );
};

export default Button;
