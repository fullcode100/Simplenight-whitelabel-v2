import React from 'react';
import { ArrowProps } from 'react-multi-carousel/lib/types';
import LeftArrow from 'public/icons/assets/carousel-left-arrow.svg';
import RightArrow from 'public/icons/assets/carousel-right-arrow.svg';

interface ArrowPropsExtended extends ArrowProps {
  position: 'right' | 'left';
  className: string;
  rtl?: string;
}

const CustomArrow = ({
  position,
  className,
  carouselState,
  rtl,
  ...restArrowProps
}: ArrowPropsExtended) => {
  if (position === 'right') {
    return (
      <span {...restArrowProps}>
        <RightArrow className={className} />
      </span>
    );
  }
  return (
    <span {...restArrowProps}>
      <LeftArrow className={className} />
    </span>
  );
};

export default CustomArrow;
