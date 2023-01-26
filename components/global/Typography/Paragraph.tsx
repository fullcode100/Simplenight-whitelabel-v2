import React from 'react';
import classnames from 'classnames';
import { ParagraphProps, paragraphClasses } from './TypographyTypes';

const Paragraph = ({
  fontWeight = 'normal',
  className,
  children,
  size = 'xsmall',
  textColor = 'text-dark-1000',
}: ParagraphProps) => {
  const paragraphClass = paragraphClasses[size];

  return (
    <p
      className={classnames(
        paragraphClass,
        textColor,
        className,
        {
          'font-semibold': fontWeight == 'semibold',
        },
        {
          'font-normal': fontWeight == 'normal',
        },
        'font-lato m-0',
      )}
    >
      {children}
    </p>
  );
};

export default Paragraph;
