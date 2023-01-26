/* eslint-disable react/require-default-props */
import React from 'react';
import SectionIcon from '../SectionIcon/SectionIcon';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

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
      {title && (
        <Heading tag="h3" textColor="text-dark-800">
          {title}
        </Heading>
      )}
      {subTitle && (
        <Paragraph size="large" textColor="text-dark-800">
          {subTitle}
        </Paragraph>
      )}
    </section>
  </section>
);

export default SectionTitle;
