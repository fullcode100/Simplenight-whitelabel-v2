import React from 'react';
import Image from 'next/image';

type CardShowProps = {
  imageSrc: string;
  name: string;
  price: string;
};

const CardShow = ({ imageSrc, name, price }: CardShowProps) => {
  return (
    <section
      className="border rounded overflow-hidden relative cursor-pointer"
      style={{ width: '390px' }}
    >
      <section className="pointer-events-none select-none">
        <Image
          key={'7'}
          width={'390px'}
          height={'140px'}
          src={imageSrc}
          alt=""
          objectFit="cover"
          onClick={() => {
            console.log('clikced');
          }}
        />
      </section>
      <section className="flex justify-between px-5 py-4 select-none">
        <h6 className="max-w-[250px] truncate" title={name}>
          {name}
        </h6>
        <h6>{price}</h6>
      </section>
    </section>
  );
};

export default CardShow;
