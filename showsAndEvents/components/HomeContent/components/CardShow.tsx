import React, { useEffect, useState } from 'react';
import EmptyImage from 'components/global/EmptyImage/EmptyImage';
import Link from 'next/link';

type CardShowProps = {
  imageSrc: string;
  name: string;
  price: string;
  url?: string;
};

const CardShow = ({ imageSrc, name, price, url }: CardShowProps) => {
  const target = window.innerWidth < 640 ? '_self' : '_blank';
  const [invalidImage, setInvalidImage] = useState(false);
  useEffect(() => {
    checkValidImage();
  }, [imageSrc]);

  const checkValidImage = () => {
    const img = new Image();
    img.src = imageSrc as string;
    img.onerror = () => setInvalidImage(true);
  };

  const displayEmpty = invalidImage || !imageSrc;

  return (
    <section className="lg:border rounded overflow-hidden relative cursor-pointer w-[153px] lg:w-[390px]">
      <Link href={url || ''} passHref>
        <a
          target={target}
          rel="noopener noreferrer"
          className="hover:text-inherit"
        >
          <section className="select-none relative h-[140px]">
            {!displayEmpty && (
              <section
                className="select-none relative h-[140px]"
                style={{
                  backgroundImage: `url(${imageSrc ?? '/images/Slide.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            {displayEmpty && <EmptyImage noPading />}
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
        </a>
      </Link>
    </section>
  );
};

export default CardShow;
