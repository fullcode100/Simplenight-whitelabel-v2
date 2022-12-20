import React, { FC } from 'react';
import EmptyImage from '@/icons/assets/generic-parking-image.svg';
import ExpandIcon from '@/icons/assets/expand.svg';
import { useTranslation } from 'react-i18next';

interface ImageBoxProps {
  images: string[];
}

export const ImageBox: FC<ImageBoxProps> = ({ images }) => {
  const [t] = useTranslation('parking');
  return (
    <section className="flex gap-2" style={{ height: 320 }}>
      {!images.length ? (
        <section className="h-[100%] grow flex flex-col justify-center items-center gap-2 text-primary-1000">
          <EmptyImage />
        </section>
      ) : (
        <>
          <section className="h-[100%] grow-[2] shrink-0 basis-0 rounded-lg overflow-hidden">
            <ImageItem src={images[0]} />
          </section>
          {images.length > 1 && (
            <section className="hidden lg:flex h-[100%] grow-[1] shrink-0 basis-0 flex-col gap-2">
              <section className="grow rounded-lg overflow-hidden">
                <ImageItem src={images[1]} />
              </section>
              <section className="flex justify-center items-center">
                <button className="border border-primary-1000 text-primary-1000 bg-transparent flex justify-center items-center w-10 h-10 rounded-full">
                  <ExpandIcon />
                </button>
              </section>
            </section>
          )}
        </>
      )}
    </section>
  );
};

interface ImageProps {
  src: string;
}

const ImageItem: FC<ImageProps> = ({ src }) => {
  return (
    <img
      className="block w-[100%] h-[100%] object-cover"
      src={src}
      alt="Parking pic"
    />
  );
};
