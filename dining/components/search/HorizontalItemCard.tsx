import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithId } from 'types/global/WithId';
import EmptyImage from '../../../components/global/EmptyImage/EmptyImage';
import Rating from '../../../components/global/Rating/Rating';
import Link from 'next/link';
import CategoryTags from '../../../components/global/CategoryTags/CategoryTags';
import ReactStars from 'react-rating-stars-component';
import EmptyDollar from 'public/icons/assets/EmptyDollar.svg';
import FilledDollar from 'public/icons/assets/FilledDollar.svg';

interface CardProps<T extends WithId> {
  item: T;
  icon?: ReactNode;
  categoryName?: string;
  address?: string;
  phone?: string;
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
  priceNumber: number;
}

function HorizontalItemCard<T extends WithId>({
  item,
  icon,
  categoryName,
  title = '',
  image = '',
  price,
  address = '',
  phone,
  className = '',
  rating,
  ratingCount = undefined,
  cancellable,
  fallback,
  url = '/',
  categoryTags = [],
  imageBackgroundSize,
  priceNumber,
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
    <section className="flex flex-col text-xs lg:flex-row text-dark-1000 gap-2 lg:gap-2.5">
      <p className="lg:order-3">{address}</p>
      <span className="hidden text-dark-300 lg:order-2 lg:inline-block">|</span>
      {phone && <p className="lg:order-1">{phone}</p>}
    </section>
  );

  const TitleSection = () => (
    <header className="font-semibold text-dark-1000 text-base leading-[22px] break-words">
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
            <section className="flex flex-col justify-between p-5 space-y-2 lg:justify-start lg:w-full">
              <TitleSection />
              <section>
                {rating && <Rating value={rating} reviews={ratingCount} />}
              </section>
              <section>
                <AddressSection />
              </section>
              <section className="flex flex-row items-center gap-2 lg:justify-start">
                <div className="flex">
                  <ReactStars
                    value={priceNumber}
                    size={16}
                    edit={false}
                    count={4}
                    emptyIcon={<EmptyDollar className="w-4 h-4" />}
                    filledIcon={<FilledDollar className="w-4 h-4" />}
                  />
                </div>
                {categoryTags && <CategoryTags tags={categoryTags} />}
              </section>
            </section>
            <section className="hidden lg:flex flex-col py-4 justify-between pr-4 w-[24rem] text-right">
              <section className="text-left">{cancellable}</section>
            </section>
          </section>
          <section className="lg:hidden">{price}</section>
        </a>
      </Link>
    </li>
  );
}

export default HorizontalItemCard;
