import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import ImageZoomModal from './ImageZoomModal';
import CustomArrow from './components/CustomArrow';
import CustomDot from './components/CustomDot';
import classnames from 'classnames';

interface ImageCarouselLargeScreenProps {
  images: string[];
  title: string;
  showDots?: boolean;
  autoPlay?: boolean;
  shouldResetAutoPlay?: boolean;
  infinite?: boolean;
  showIndexDot?: boolean;
}

const ImageCarouselLargeScreen = ({
  images,
  title,
  showDots = true,
  autoPlay = false,
  shouldResetAutoPlay = false,
  infinite = true,
  showIndexDot = true,
}: ImageCarouselLargeScreenProps) => {
  const [showImageZoomModal, setShowImageZoomModal] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const nextItem = activeItem + 1;
  const prevItem = activeItem - 1;
  const handleBeforeCarouselChange = (prev: number) => {
    setActiveItem(prev);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
      partialVisibilityGutter: 40,
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
    <section className="max-w-7xl mx-auto">
      <ImageZoomModal
        images={images}
        open={showImageZoomModal}
        closeModal={() => setShowImageZoomModal(false)}
        title={title}
      />
      <Carousel
        itemClass="px-4"
        responsive={responsive}
        infinite={infinite}
        draggable
        showDots={showDots}
        beforeChange={handleBeforeCarouselChange}
        customDot={
          <CustomDot
            className="absolute flex items-center gap-2 bottom-5 right-10 bg-white/80 rounded-lg py-1 px-2 text-sm text-dark-1000"
            icon={true}
            length={images.length}
            showIndex={showIndexDot}
          />
        }
        autoPlay={autoPlay}
        shouldResetAutoplay={shouldResetAutoPlay}
        customLeftArrow={
          <CustomArrow
            className="z-[5] absolute left-5 -translate-y-7 w-24 h-24"
            position="left"
          />
        }
        customRightArrow={
          <CustomArrow
            className="z-[5] absolute right-5 -translate-y-7 w-24 h-24"
            position="right"
          />
        }
      >
        {images.map((image, index) => {
          const imageClass = classnames(
            'w-[100%] h-[500px] rounded-md bg-dark-500 overflow-hidden flex items-center justify-center',
          );
          return (
            <section key={index + image} className={imageClass}>
              <div className="w-[752px] h-[100%] flex items-center justify-center">
                <img
                  src={image}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                  alt=""
                  onClick={() => setShowImageZoomModal(true)}
                />
              </div>
            </section>
          );
        })}
      </Carousel>
    </section>
  );
};

export default ImageCarouselLargeScreen;
