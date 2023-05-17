import React, { ReactNode, useEffect, useState } from 'react';
import EmptyImage from 'components/global//EmptyImage/EmptyImage';
import Rating from 'components/global//Rating/Rating';
import Link from 'next/link';
import LocationIcon from 'public/icons/assets/cars/location.svg';
import { Car } from 'cars/types/response/CarSearchResponse';

interface CardProps {
  subtitle?: ReactNode;
  title?: string;
  image?: string;
  price?: ReactNode;
  className?: string;
  rating?: number;
  priceDisplay?: ReactNode;
  cancellable?: ReactNode;
  address?: ReactNode;
  features?: ReactNode;
  item: Car;
  onClick: (car: Car) => void;
}

function HorizontalItemCard({
  title = '',
  image = '',
  price,
  subtitle,
  className = '',
  rating,
  priceDisplay,
  cancellable,
  address,
  features,
  item,
  onClick,
}: CardProps) {
  const [invalidImage, setInvalidImage] = useState(false);
  const target = window.innerWidth < 640 ? '_self' : '_blank';

  useEffect(() => {
    checkValidImage();
  }, []);
  const SubtitleSection = () => (
    <span className="py-2 text-sm font-normal text-dark-1000">{subtitle}</span>
  );

  const TitleSection = () => (
    <header className=" font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg break-words">
      {title}
    </header>
  );

  const checkValidImage = () => {
    const img = new Image();
    img.src = image;
    img.onerror = () => setInvalidImage(true);
  };

  const displayEmpty = invalidImage || !image;

  return (
    <li
      className={`bg-white flex flex-col border border-dark-300 rounded ${className}`}
    >
      <div onClick={() => onClick(item)}>
        <a target={target} rel="noopener noreferrer">
          <section className="flex flex-row justify-center lg:flex-row">
            <section className="flex flex-row justify-between w-full">
              <section
                className="w-[30%] min-h-[80px]"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '80% auto',
                  backgroundPosition: 'center center',
                }}
              >
                {displayEmpty && <EmptyImage />}
              </section>
              <section className="flex flex-col p-4 justify-start w-[70%] min-h-[80px]">
                <TitleSection />
                <SubtitleSection />
                {rating && (
                  <section className="hidden mt-2 lg:block">
                    <Rating value={rating} />
                  </section>
                )}
                {address && (
                  <section className="flex flex-wrap hidden mt-2 lg:block">
                    <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
                      <LocationIcon className="w-7 mt-[-1px] text-green-1000 flex-shrink-0" />
                      <label className="text-dark-700 text-[14px] font-normal">
                        {address}
                      </label>
                    </section>
                  </section>
                )}
                {features && (
                  <section className="hidden mt-2 lg:block">{features}</section>
                )}
              </section>
            </section>

            <section className="hidden lg:flex flex-col py-4 justify-between pr-4 w-[24rem] text-right">
              <section className="text-left">{cancellable}</section>
              {priceDisplay}
            </section>
          </section>
          <section className="flex-col lg:hidden">{price}</section>
        </a>
      </div>
    </li>
  );
}

export default HorizontalItemCard;
