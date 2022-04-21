import React, { useState } from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import ImageZoomModal from './ImageZoomModal';
import CustomArrow from './components/CustomArrow';
import CustomDot from './components/CustomDot';

interface ImageCarouselProps {
  images: string[];
  hotelName: string;
}

const ImageCarousel = ({ images, hotelName }: ImageCarouselProps) => {
  const [showImageZoomModal, setShowImageZoomModal] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <ImageZoomModal
        images={images}
        open={showImageZoomModal}
        closeModal={() => setShowImageZoomModal(false)}
        hotelName={hotelName}
      />
      <Carousel
        partialVisible={false}
        responsive={responsive}
        infinite
        draggable
        showDots
        customDot={
          <CustomDot
            className="absolute flex items-center gap-2 bottom-5 right-3 bg-white/80 rounded-lg py-1 px-2 text-sm text-dark-1000"
            icon={true}
            length={images.length}
          />
        }
        autoPlay={false}
        customLeftArrow={
          <CustomArrow
            className="z-10 absolute left-0 -translate-y-7"
            position="left"
          />
        }
        customRightArrow={
          <CustomArrow
            className="z-10 absolute right-0 -translate-y-7"
            position="right"
          />
        }
      >
        {images.map((image, index) => {
          return (
            <Image
              key={index + image}
              width="375px"
              height="200px"
              layout="responsive"
              src={image}
              alt=""
              onClick={() => setShowImageZoomModal(true)}
            />
          );
        })}
      </Carousel>
    </>
  );
};

export default ImageCarousel;
