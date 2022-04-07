import { Carousel as AntdCarousel } from 'antd';
import React from 'react';
import Image from 'next/image';
import ReactCarousel from 'react-multi-carousel';

interface CarouselProps {
  children?: any;
  autoplay?: boolean;
  images: string[];
  dots?: boolean;
  dotPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const Carousel = ({
  children,
  images,
  autoplay = false,
  dotPosition = 'bottom',
  dots = true,
}: CarouselProps) => {
  const imageElements = images.map((image, index) => (
    // <div key={index} className="bg-cover bg-no-repeat bg-center">
    //   <img src={image} alt={`image-${index}`} />
    // </div>
    <Image
      key={index + image}
      draggable={false}
      width="100%"
      height="100%"
      src={image}
    />
  ));

  return (
    // <AntdCarousel autoplay={autoplay} dotPosition={dotPosition} dots={dots}>
    //   {children}
    // </AntdCarousel>
    <ReactCarousel
      responsive={responsive}
      ssr
      partialVisible
      deviceType="desktop"
      itemClass="image-item"
    >
      {images.map((image, index) => (
        // <div key={index} className="bg-cover bg-no-repeat bg-center">
        //   <img src={image} alt={`image-${index}`} />
        // </div>
        <Image
          key={index + image}
          draggable={false}
          width="100%"
          height="100%"
          src={image}
        />
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
