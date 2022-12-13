import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithId } from 'types/global/WithId';
import EmptyImage from 'components/global//EmptyImage/EmptyImage';
import Rating from 'components/global//Rating/Rating';
import Link from 'next/link';
import LocationIcon from 'public/icons/assets/cars/location.svg';
import Button from 'components/global/Button/Button';
import { addToCart } from 'core/client/services/CartClientService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Item } from 'types/cart/CartType';

interface CardProps<T extends WithId> {
  item: T;
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

function HorizontalItemCard<T extends WithId>({
  item,
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
}: CardProps<T>) {
  const [t, i18next] = useTranslation('global');
  const [invalidImage, setInvalidImage] = useState(false);
  const fromLabel = t('from', 'From');
  const target = window.innerWidth < 640 ? '_self' : '_blank';

  // add to cart
  const router = useRouter();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookNowText = t('bookNow', 'Book Now');

  const handleAction = async (url: string) => {
    const itemToBook = Object.assign({}, cartItem);
    await addToCart(itemToBook, i18next, store); // add to cart
    router.replace(url); // redirect to: cart or checkout
  };

  useEffect(() => {
    checkValidImage();
  }, []);
  const SubtitleSection = () => (
    <span className="font-normal text-dark-1000 text-sm py-2">{subtitle}</span>
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
      {/* <Link href={url} passHref>
        {/* <a target={target} rel="noopener noreferrer"> */}
      <CategoryTag />
      <section className="flex flex-col justify-center lg:flex-row">
        <section
          className="min-w-[55%] max-w-[80%] min-h-[150px] self-center lg:max-w-[100%] lg:min-w-[15rem] lg:min-h-[11.3rem] "
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '80% auto',
            backgroundPosition: 'center center',
          }}
        >
          {displayEmpty && <EmptyImage />}
        </section>
        <section className="flex flex-col justify-between p-4 lg:justify-start lg:w-full">
          <TitleSection />
          <SubtitleSection />
          {rating && (
            <section className="mt-2">
              <Rating value={rating} />
            </section>
          )}
          {address && (
            <section className="mt-2 flex flex-wrap">
              <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
                <LocationIcon className="w-7 mt-[-1px] text-green-1000 flex-shrink-0" />
                <label className="text-dark-700 text-[14px] font-normal">
                  {address}
                </label>
              </section>
            </section>
          )}
          {features && <section className="mt-2">{features}</section>}
        </section>
        <section className="hidden lg:flex flex-col py-4 justify-between pr-4 w-[24rem] text-right">
          {/* <section className="text-left">{cancellable}</section> */}
          {priceDisplay}

          <section className="flex flex-col pt-1">
            <Button
              value={addToItineraryText}
              size="full"
              type="outlined"
              textColor="primary"
              onClick={() => handleAction('/itinerary')}
              className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mr-2 mt-1"
            />
            <Button
              value={bookNowText}
              size="full"
              onClick={() => handleAction('/checkout/client')}
              className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mt-1"
            />
          </section>
        </section>
      </section>
      <section className="flex-col lg:hidden">
        {price}

        <section className="flex flex-row px-3 py-3">
          <Button
            value={addToItineraryText}
            size="full"
            type="outlined"
            textColor="primary"
            onClick={() => handleAction('/itinerary')}
            className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mr-2 mt-1"
          />
          <Button
            value={bookNowText}
            size="full"
            onClick={() => handleAction('/checkout/client')}
            className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mt-1"
          />
        </section>
      </section>
      {/* </a> */}
      {/* </Link> */}
    </li>
  );
}

export default HorizontalItemCard;
