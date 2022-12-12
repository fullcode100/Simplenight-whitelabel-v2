/* eslint-disable indent */
import { MouseEvent } from 'react';
import classnames from 'classnames';

import { useColor } from 'hooks/layoutAndUITooling/useColorNew';

interface ButtonProps {
  children: React.ReactNode;
  type?: string;
  disabled?: boolean;
  height?: string;
  width?: string;
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
}

const Button = ({
  children,
  type = 'primary',
  disabled = false,
  height = 'large',
  width = '',
  onClick,
}: ButtonProps) => {
  const colors = useColor(type);

  let customHeight;
  switch (height) {
    case 'large':
      customHeight = 'h-11';
      break;
    case 'small':
      customHeight = 'h-8';
      break;
    default:
      customHeight = height;
      break;
  }

  return (
    <button
      className={classnames(
        `flex justify-center items-center gap-1 border rounded ${customHeight} ${width}`,
        {
          [`cursor-pointer ${colors.default} ${colors.hover} ${colors.focused} ${colors.pressed}`]:
            !disabled,
          [`cursor-not-allowed ${colors.disabled}`]: disabled,
        },
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
