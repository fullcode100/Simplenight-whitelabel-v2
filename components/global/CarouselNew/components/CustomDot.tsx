import React from 'react';
import { DotProps } from 'react-multi-carousel/lib/types';
import ImageCarouselIcon from 'public/icons/assets/image-carousel.svg';

interface DotPropsExtended extends DotProps {
  icon: boolean;
  className: string;
  length: number;
}

const CustomDot = ({
  icon,
  className,
  length,
  active,
  index,
}: DotPropsExtended) => {
  const newIndex = index ?? 0;
  if (active) {
    return (
      <section className={className}>
        <p className="my-0">
          <span className="font-semibold">{newIndex + 1}</span>/{length}
        </p>
        {icon && <ImageCarouselIcon />}
      </section>
    );
  }
  return <></>;
};

export default CustomDot;
