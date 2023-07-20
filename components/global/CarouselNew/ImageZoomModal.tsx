import React, { MouseEvent, useMemo, useState } from 'react';
import Carousel, { StateCallBack } from 'react-multi-carousel';
import CustomArrow from './components/CustomArrow';
import CustomDot from './components/CustomDot';
import classnames from 'classnames';
import ImageModalHeader from './components/ImageModalHeader';
import ImageModalComponent from './components/ImageModalComponent';
import { getCurrentSlideForInfinityCarousel } from './utils';

export interface ImageItem {
  text: string;
  url: string;
}
interface ImageCarouselProps {
  images: ImageItem[] | string[];
  open: boolean;
  closeModal: (event?: MouseEvent<HTMLElement>) => void;
  title: string;
}

const ImageZoomModal = ({
  images,
  open,
  closeModal,
  title,
}: ImageCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(() =>
    images.length > 0 ? 1 : 0,
  );
  const imageText = useMemo(() => {
    if (images.length == 0 || currentSlide > images.length) return '';
    return (images[currentSlide - 1] as ImageItem)?.text || '';
  }, [images, currentSlide]);

  const responsive = {
    superLargeDesktop: {
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
  const afterChange = (
    previousSlide: number,
    { currentSlide }: StateCallBack,
  ) => {
    const result = getCurrentSlideForInfinityCarousel(
      images.length,
      currentSlide,
    );
    setCurrentSlide(result);
  };
  return (
    <section
      className={classnames(
        'w-full h-full flex flex-col items-stretch fixed inset-0 bg-dark-1000 z-40',
        { ['hidden']: !open },
      )}
    >
      <ImageModalHeader title={title} closeModal={closeModal} />
      <section className="h-full">
        <Carousel
          afterChange={afterChange}
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
              className="z-10 absolute left-0 w-24 h-24"
              position="left"
            />
          }
          customRightArrow={
            <CustomArrow
              className="z-10 absolute right-0 w-24 h-24"
              position="right"
            />
          }
        >
          {images.map((image, index) => {
            const src: string = (image as ImageItem)?.url || (image as string);
            return <ImageModalComponent image={src} key={index + src} />;
          })}
        </Carousel>
        <section className="w-full px-5 absolute bottom-16">
          <div className="relative mt-3">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className={'flex flex-col w-full'}>
                <div className={'pb-2 text-white text-sm font-normal'}>
                  {imageText}
                </div>
                <div className="w-full border-t border-dark-800" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default ImageZoomModal;
