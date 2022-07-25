import React from 'react';
import { DotProps } from 'react-multi-carousel/lib/types';
import ImageCarouselIcon from 'public/icons/assets/image-carousel.svg';

interface DotPropsExtended extends DotProps {
  icon: boolean;
  className: string;
  length: number;
  showIndex?: boolean;
}

const CustomDot = ({
  icon,
  className,
  length,
  active,
  index,
  showIndex = true,
}: DotPropsExtended) => {
  const newIndex = index ?? 0;
  if (active) {
    return (
      <section className={className}>
        <p className="my-0">
          {showIndex && <span className="font-semibold">{newIndex + 1}/</span>}
          {length}
        </p>
        {icon && <ImageCarouselIcon />}
      </section>
    );
  }
  return <></>;
};

export default CustomDot;
