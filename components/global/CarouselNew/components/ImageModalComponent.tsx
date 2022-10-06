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
        objectFit="cover"
      />
    </section>
  );
};

export default ImageModalComponent;
