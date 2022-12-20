import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

interface HighlightedProps {
  color?: 'success' | 'danger' | 'warning';
}

export const Highlighted: FC<PropsWithChildren<HighlightedProps>> = ({
  color = 'success',
  children,
}) => {
  const className = classNames(
    'h-6 w-fit rounded flex items-center gap-2 px-2 text-[14px] leading-[20px] font-semibold',
    {
      'bg-green-100 text-green-800': color === 'success',
      'bg-red-100 text-red-800': color === 'danger',
      'bg-orange-100 text-orange-800': color === 'warning',
    },
  );

  return <section className={className}>{children}</section>;
};
