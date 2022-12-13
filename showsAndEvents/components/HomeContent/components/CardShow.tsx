import React from 'react';
import Image from 'next/image';

type CardShowProps = {
  imageSrc: string;
  name: string;
  price: string;
};

const CardShow = ({ imageSrc, name, price }: CardShowProps) => {
  return (
    <section className="lg:border rounded overflow-hidden relative cursor-pointer w-[153px] lg:w-[390px]">
      <section className="pointer-events-none select-none relative h-[140px] h-[135px]">
        <Image
          key={'7'}
          src={imageSrc}
          alt=""
          objectFit="cover"
          onClick={() => {
            console.log('clikced');
          }}
          layout={'fill'}
        />
      </section>
      <section className="flex flex-col lg:flex-row justify-between px-0 lg:px-5 py-2 lg:py-4 select-none">
        <h6
          className="max-w-[140px] lg:max-w-[250px] truncate text-base lg:text-sm"
          title={name}
        >
          {name}
        </h6>
        <h6 className="text-xs lg:text-sm">{price}</h6>
      </section>
    </section>
  );
};

export default CardShow;
