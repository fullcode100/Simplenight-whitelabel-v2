/* eslint-disable react/require-default-props */
import React from 'react';
import SectionTransportIcon from './SectionTransportIcon';

interface SectionTitleProps {
  icon?: React.ReactElement;
  title?: string;
  subTitle?: string;
  displayIcon?: boolean;
}

const SectionTransportTitle = ({
  icon,
  title,
  subTitle,
  displayIcon = true,
}: SectionTitleProps) => (
  <section className="flex items-center gap-3 lg:gap-5">
    {displayIcon && <SectionTransportIcon icon={icon} />}
    <section>
      <h2 className="text-base font-semibold leading-5 text-dark-800 lg:text-base lg:font-semibold lg:leading-5 lg:text-dark-1000">
        {title}
      </h2>
      {subTitle && (
        <p className="lg:text-sm lg:font-normal lg:leading-6 lg:text-dark-800">{subTitle}</p>
      )}
    </section>
  </section>
);

export default SectionTransportTitle;
