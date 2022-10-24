/* eslint-disable react/require-default-props */
import React from 'react';
import SectionIcon from '../SectionIcon/SectionIcon';

interface SectionTitleProps {
  icon?: React.ReactNode;
  title?: string;
  subTitle?: string;
  displayIcon?: boolean;
  iconSizeRem?: number;
}

const SectionTitle = ({
  icon,
  title,
  subTitle,
  displayIcon = true,
  iconSizeRem = 2.5,
}: SectionTitleProps) => (
  <section className="flex items-center gap-4">
    {displayIcon && <SectionIcon icon={icon} sizeRem={iconSizeRem} />}
    <section>
      <h2 className="text-lg font-bold text-dark-800 leading-8">{title}</h2>
      {subTitle && (
        <p className="text-dark-800 text-lg leading-6">{subTitle}</p>
      )}
    </section>
  </section>
);

export default SectionTitle;
