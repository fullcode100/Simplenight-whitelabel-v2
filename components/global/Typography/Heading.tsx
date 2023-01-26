import React from 'react';
import classnames from 'classnames';
import { HeadingProps, headingClasses } from './TypographyTypes';

const Heading = ({
  tag: Tag,
  children,
  className,
  textColor = 'text-dark-1000',
}: HeadingProps) => {
  const headingClass = headingClasses[Tag];

  return (
    <Tag
      className={classnames(headingClass, textColor, className, 'font-lato')}
    >
      {children}
    </Tag>
  );
};

export default Heading;
