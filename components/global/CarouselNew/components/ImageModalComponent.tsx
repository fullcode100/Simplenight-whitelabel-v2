import React from 'react';
import Image from 'next/image';

interface ImageModalProps {
  image: string;
}

const ImageModalComponent = ({ image }: ImageModalProps) => {
  return (
    <section className="-mt-32">
      <Image
        width="375px"
        height="200px"
        layout="responsive"
        src={image}
        alt=""
      />
      <section className="w-full px-5 absolute top-[190px]">
        <p className="text-sm text-white">Deluxe Room</p>
        <div className="relative mt-3">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-dark-800" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ImageModalComponent;
