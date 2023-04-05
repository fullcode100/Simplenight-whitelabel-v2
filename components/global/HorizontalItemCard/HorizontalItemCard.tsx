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
  address?: any;
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
  address = {},
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
  const fromLabel = t('from', 'From');
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
      <p className="font-normal text-dark-1000 text-sm">{address?.address}</p>
      <span className="font-normal text-dark-1000 text-sm">
        {address?.city}, {address?.countryCode}, {address?.postalCode}
      </span>
    </>
  );

  const TitleSection = () => (
    <header className=" font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg break-words">
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
          <section className="flex min-[300px]:flex-col md:flex-row lg:flex-row">
            {isImageComponent ? (
              <section className="min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem] flex justify-center items-center text-primary-1000">
                {ImageComponent}
              </section>
            ) : (
              <section
                className="min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem] "
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
            <section className="flex flex-col justify-between p-4 lg:justify-start lg:w-full">
              <TitleSection />
              <section className="mt-4">
                <AddressSection />
              </section>
              <section className="mt-4">
                {rating && (
                  <Rating value={rating} reviews={ratingCount} isHotelRating />
                )}
              </section>
              {categoryTags && (
                <section className="flex flex-row lg:justify-start gap-2 mt-4">
                  <CategoryTags tags={categoryTags} />
                </section>
              )}
            </section>
            <section className="hidden lg:flex flex-col py-4 justify-between pr-4 w-[24rem] text-right">
              <section className="text-left">{cancellable}</section>
              {priceDisplay}
            </section>
          </section>
          <section className="lg:hidden">{price}</section>
        </a>
      </Link>
    </li>
  );
}

export default HorizontalItemCard;
