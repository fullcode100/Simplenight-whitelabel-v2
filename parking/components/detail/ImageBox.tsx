import React, { FC } from 'react';
import EmptyImage from '@/icons/assets/generic-parking-image.svg';
import ImageCarouselLargeScreen from '../../../components/global/CarouselNew/ImageCarouselLargeScreen';
import classNames from 'classnames';
import ImageCarousel from '../../../components/global/CarouselNew/ImageCarousel';

interface ImageBoxProps {
  title: string;
  images: string[];
}

export const ImageBox: FC<ImageBoxProps> = ({ title, images }) => {
  const emptyState = images.length === 0;
  return (
    <section className={classNames('flex gap-2', { 'h-80': emptyState })}>
      {!images.length ? (
        <section className="h-[100%] grow flex flex-col justify-center items-center gap-2 text-primary-1000">
          <EmptyImage />
        </section>
      ) : (
        <section className="w-full">
          <section className="lg:hidden">
            <ImageCarousel
              images={images}
              title={title}
              infinite={false}
              autoPlay={false}
            />
          </section>
          <section className="hidden w-full pt-8 lg:block">
            <ImageCarouselLargeScreen
              images={images}
              title={title}
              infinite={false}
              autoPlay={false}
            />
          </section>
        </section>
      )}
    </section>
  );
};
