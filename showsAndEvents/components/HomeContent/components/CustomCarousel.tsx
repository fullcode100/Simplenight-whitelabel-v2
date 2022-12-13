import React from 'react';
import Carousel, { ButtonGroupProps } from 'react-multi-carousel';
import CustomArrow from 'components/global/CarouselNew/components/CustomArrow';

type CustomCarouselProps = {
  children: React.ReactNode;
};

const CustomCarousel = ({ children }: CustomCarouselProps) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      partialVisibilityGutter: 20,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 890 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 890, min: 0 },
      items: 2,
    },
  };

  const ButtonGroup = ({ next, previous }: ButtonGroupProps) => {
    return (
      <div className="absolute top-0 w-full hidden lg:block">
        <section onClick={() => previous && previous()}>
          <CustomArrow
            className="z-[5] absolute -left-12 translate-y-2/4 w-24 h-24 cursor-pointer"
            position="left"
          />
        </section>
        <section onClick={() => next && next()}>
          <CustomArrow
            className="z-[5] absolute -right-12 translate-y-2/4 w-24 h-24 cursor-pointer"
            position="right"
          />
        </section>
      </div>
    );
  };

  return (
    <section className="relative">
      <Carousel
        partialVisible={true}
        responsive={responsive}
        infinite={true}
        draggable
        autoPlay={false}
        shouldResetAutoplay={false}
        arrows={false}
        customButtonGroup={<ButtonGroup />}
        renderButtonGroupOutside={true}
      >
        {children}
      </Carousel>
    </section>
  );
};

export default CustomCarousel;
