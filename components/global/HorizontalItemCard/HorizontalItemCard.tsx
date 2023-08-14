import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithId } from 'types/global/WithId';
import EmptyImage from '../EmptyImage/EmptyImage';
import Rating from '../Rating/Rating';
import Link from 'next/link';
import CategoryTags from '../CategoryTags/CategoryTags';

interface CardProps<T extends WithId> {
  item: T;
  icon?: ReactNode;
  categoryName?: string;
  address?: string;
  address2?: string;
  title?: string;
  image?: ReactNode;
  fallback?: ReactNode;
  price?: ReactNode;
  className?: string;
  rating?: number;
  ratingCount?: number;
  priceDisplay?: ReactNode;
  cancellable?: ReactNode;
  url?: string;
  categoryTags?: string[];
  imageBackgroundSize?: string;
}

function HorizontalItemCard<T extends WithId>({
  item,
  icon,
  categoryName,
  title = '',
  image = '',
  price,
  address = '',
  address2,
  className = '',
  rating,
  ratingCount = undefined,
  priceDisplay,
  cancellable,
  fallback,
  url = '/',
  categoryTags = [],
  imageBackgroundSize,
}: CardProps<T>) {
  const [t, i18next] = useTranslation('global');
  const [invalidImage, setInvalidImage] = useState(false);
  const [target, setTarget] = useState('');
  const isImageComponent = typeof image !== 'string';
  const ImageComponent = image;
  useEffect(() => {
    const target = window.innerWidth < 640 ? '_self' : '_blank';
    setTarget(target);
  }, []);

  useEffect(() => {
    checkValidImage();
  }, []);
  const AddressSection = () => (
    <>
      <p className="font-normal text-dark-1000 text-sm">{address}</p>
      {address2 && (
        <span className="font-normal text-dark-1000 text-sm">{address2}</span>
      )}
    </>
  );

  const TitleSection = () => (
    <header className=" font-semibold text-dark-1000 text-base leading-[20px] lg:leading-[22px] lg:text-lg break-words">
      {title}
    </header>
  );

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br">
      {icon}
      <span className="font-semibold text-[14px]">{categoryName}</span>
    </section>
  );

  const checkValidImage = () => {
    if (isImageComponent) return;
    const img = new Image();
    img.src = image;
    img.onerror = () => setInvalidImage(true);
  };

  const displayEmpty = invalidImage || !image;

  return (
    <li
      key={item.id}
      className={`bg-white flex flex-col border border-dark-300 rounded-md ${className}`}
    >
      <Link href={url} passHref>
        <a target={target} rel="noopener noreferrer">
          <section className="flex flex-col lg:flex-row lg:justify-between lg:h-48">
            {isImageComponent ? (
              <section className="w-full h-[9.75rem] lg:w-[15rem] lg:h-full flex justify-center items-center text-primary-1000">
                {ImageComponent}
              </section>
            ) : (
              <section
                className="w-full h-[9.75rem] lg:w-[15rem] lg:h-full"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: imageBackgroundSize
                    ? imageBackgroundSize
                    : 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <CategoryTag />

                {displayEmpty ? (
                  fallback ? (
                    <>{fallback}</>
                  ) : (
                    <EmptyImage />
                  )
                ) : null}
              </section>
            )}
            <section className="flex flex-row justify-between lg:w-full">
              <section className="flex flex-col justify-between p-4 gap-2 lg:w-[50%] lg:justify-start">
                <TitleSection />
                <section className="mt-0 lg:mt-4">
                  {rating && (
                    <Rating
                      value={rating}
                      reviews={ratingCount}
                      isHotelRating
                    />
                  )}
                </section>
                <section className="mt-0 lg:mt-4">
                  <AddressSection />
                </section>
                {categoryTags.length != 0 && (
                  <section className="flex flex-row lg:justify-start gap-2 mt-4">
                    <CategoryTags tags={categoryTags} />
                  </section>
                )}
              </section>
              <section className="hidden lg:flex flex-col py-4 justify-between lg:w-[50%] pr-4 text-right">
                <section className="text-left">{cancellable}</section>
                {priceDisplay}
              </section>
            </section>
          </section>
          <section className="lg:hidden">{price}</section>
        </a>
      </Link>
    </li>
  );
}

export default HorizontalItemCard;
