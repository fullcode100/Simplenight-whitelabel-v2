/* eslint-disable react/require-default-props */
import React from 'react';
import SectionIcon from '../SectionIcon/SectionIcon';

interface SectionTitleProps {
  icon?: React.ReactElement;
  title?: string;
  subTitle?: string;
  displayIcon?: boolean;
  className?: string;
}

const SectionTitle = ({
  icon,
  title,
  subTitle,
  displayIcon = true,
  className,
}: SectionTitleProps) => (
  <section className={`flex items-center gap-3 lg:gap-5 ${className}`}>
    {displayIcon && <SectionIcon icon={icon} />}
    <section>
      <h2 className="text-lg font-bold leading-6 text-dark-800 lg:text-[32px] lg:leading-[38px]">
        {title}
      </h2>
      {subTitle && (
        <p className="text-lg leading-6 text-dark-800">{subTitle}</p>
      )}
    </section>
  </section>
);

export default SectionTitle;
