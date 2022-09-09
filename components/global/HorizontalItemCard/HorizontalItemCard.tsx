import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithId } from 'types/global/WithId';
import EmptyImage from '../EmptyImage/EmptyImage';
import Rating from '../Rating/Rating';
import Link from 'next/link';

interface CardProps<T extends WithId> {
  item: T;
  icon?: ReactNode;
  categoryName?: string;
  address?: string;
  title?: string;
  image?: string;
  price?: ReactNode;
  className?: string;
  rating?: number;
  priceDisplay?: ReactNode;
  cancellable?: ReactNode;
  url?: string;
}

function HorizontalItemCard<T extends WithId>({
  item,
  icon,
  categoryName,
  title = '',
  image = '',
  price,
  address = '',
  className = '',
  rating,
  priceDisplay,
  cancellable,
  url = '/',
}: CardProps<T>) {
  const [t, i18next] = useTranslation('global');
  const [invalidImage, setInvalidImage] = useState(false);
  const fromLabel = t('from', 'From');
  const target = window.innerWidth < 640 ? '_self' : '_blank';

  useEffect(() => {
    checkValidImage();
  }, []);
  const AddressSection = () => (
    <span className="font-normal text-dark-1000 text-sm py-2">{address}</span>
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
    const img = new Image();
    img.src = image;
    img.onerror = () => setInvalidImage(true);
  };

  const displayEmpty = invalidImage || !image;

  return (
    <li
      key={item.id}
      className={`bg-white flex flex-col border border-dark-300 rounded ${className}`}
    >
      <Link href={url} passHref>
        <a target={target} rel="noopener noreferrer">
          <section className="flex flex-row">
            <section
              className="min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem] "
              style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: 'round',
              }}
            >
              <CategoryTag />
              {displayEmpty && <EmptyImage />}
            </section>
            <section className="flex flex-col justify-between p-4 lg:justify-start lg:w-full">
              <TitleSection />
              <AddressSection />
              <section className="mt-2">
                {rating && <Rating value={rating} />}
              </section>
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
