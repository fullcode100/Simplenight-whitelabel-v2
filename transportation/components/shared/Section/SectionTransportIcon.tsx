/* eslint-disable react/require-default-props */
import React from 'react';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import { injectProps } from 'helpers/reactUtils';

interface SectionIconProps {
  colorClass?: string;
  icon?: React.ReactElement;
}

const SectionTransportIcon = ({
  colorClass = 'bg-primary-1000',
  icon = <InfoCircle />,
}: SectionIconProps) => {
  const iconComponent = injectProps(icon, {
    className: `${icon?.props?.className} w-full h-full`,
  });
  return (
    <section
      className={`${colorClass} rounded-full grid place-content-center h-10 w-10 lg:h-[40px] lg:w-[40px]`}
    >
      <section className="w-5 h-5 text-white lg:h-[20px] lg:w-[20px]">
        {iconComponent}
      </section>
    </section>
  );
};

export default SectionTransportIcon;
