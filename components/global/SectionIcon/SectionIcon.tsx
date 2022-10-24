/* eslint-disable react/require-default-props */
import React from 'react';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import { injectProps } from 'helpers/reactUtils';

interface SectionIconProps {
  sizeRem?: number;
  colorClass?: string;
  icon?: React.ReactNode;
}

const SectionIcon = ({
  sizeRem = 2.5,
  colorClass = 'bg-primary-1000',
  icon = <InfoCircle />,
}: SectionIconProps) => {
  const sizeIcon = sizeRem / 2;
  const iconComponent = injectProps(icon as any, {
    className: 'w-full h-full',
  });
  return (
    <section
      className={`${colorClass} rounded-full grid place-content-center`}
      style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}
    >
      <section
        className="text-white"
        style={{ width: `${sizeIcon}rem`, height: `${sizeIcon}rem` }}
      >
        {iconComponent}
      </section>
    </section>
  );
};

export default SectionIcon;
