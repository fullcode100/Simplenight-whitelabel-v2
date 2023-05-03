import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithId } from 'types/global/WithId';
import EmptyImage from 'components/global//EmptyImage/EmptyImage';
import Rating from 'components/global//Rating/Rating';
import Link from 'next/link';
import LocationIcon from 'public/icons/assets/cars/location.svg';
import Button from 'components/global/Button/Button';
import { addToCart } from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import { Item } from 'types/cart/CartType';
import { hasCartMode } from 'helpers/purchaseModeUtils';

interface CardProps {
  icon?: ReactNode;
  categoryName?: string;
  subtitle?: ReactNode;
  title?: string;
  image?: string;
  price?: ReactNode;
  className?: string;
  rating?: number;
  priceDisplay?: ReactNode;
  cancellable?: ReactNode;
  url?: string;
  address?: ReactNode;
  features?: ReactNode;
  cartItem: Item;
}

function HorizontalItemCard({
  icon,
  categoryName,
  title = '',
  image = '',
  price,
  subtitle,
  className = '',
  rating,
  priceDisplay,
  cancellable,
  url = '/',
  address,
  features,
  cartItem,
}: CardProps) {
  const [t, i18next] = useTranslation('global');
  const [invalidImage, setInvalidImage] = useState(false);
  const fromLabel = t('from', 'From');
  const target = window.innerWidth < 640 ? '_self' : '_blank';

  // add to cart
  const router = useRouter();

  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookNowText = t('bookNow', 'Book Now');
  const showAddToItinerary = hasCartMode();

  const handleAction = async (url: string) => {
    const itemToBook = Object.assign({}, cartItem);
    await addToCart(itemToBook, i18next); // add to cart
    router.replace(url); // redirect to: cart or checkout
  };

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
      className={`bg-white flex flex-col border border-dark-300 rounded ${className}`}
    >
      <Link href={url} passHref>
        <a target={target} rel="noopener noreferrer">
          {/* <CategoryTag /> */}
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
      </Link>
    </li>
  );
}

export default HorizontalItemCard;
