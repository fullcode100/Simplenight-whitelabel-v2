import { FC } from 'react';

interface FilterTitleProps {
  label: string;
  className: string;
}

export const FilterTitle: FC<FilterTitleProps> = ({
  label,
  className = '',
}) => {
  return <label className={`mb-2 ${className}`}>{label}</label>;
};
