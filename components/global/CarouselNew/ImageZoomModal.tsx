import React, { MouseEvent } from 'react';
import Carousel from 'react-multi-carousel';
import CustomArrow from './components/CustomArrow';
import CustomDot from './components/CustomDot';
import classnames from 'classnames';
import ImageModalHeader from './components/ImageModalHeader';
import ImageModalComponent from './components/ImageModalComponent';

interface ImageCarouselProps {
  images: string[];
  open: boolean;
  closeModal: (event?: MouseEvent<HTMLElement>) => void;
  hotelName: string;
}

const ImageZoomModal = ({
  images,
  open,
  closeModal,
  hotelName,
}: ImageCarouselProps) => {
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
    <section
      className={classnames(
        'w-full h-screen flex flex-col items-stretch fixed inset-0 bg-dark-1000 z-20',
        { ['hidden']: !open },
      )}
    >
      <ImageModalHeader hotelName={hotelName} closeModal={closeModal} />
      <section className="h-full">
        <Carousel
          className="h-full flex justify-items-stretch"
          partialVisible={false}
          responsive={responsive}
          infinite
          draggable
          showDots
          customDot={
            <CustomDot
              className="absolute flex items-center gap-2 bottom-5 left-5 text-sm text-white"
              icon={false}
              length={images.length}
            />
          }
          autoPlay={false}
          customLeftArrow={
            <CustomArrow
              className="z-10 absolute right-16 bottom-1"
              position="left"
            />
          }
          customRightArrow={
            <CustomArrow
              className="z-10 absolute right-3 bottom-1"
              position="right"
            />
          }
        >
          {images.map((image, index) => {
            return <ImageModalComponent image={image} key={index + image} />;
          })}
        </Carousel>
      </section>
    </section>
  );
};

export default ImageZoomModal;
