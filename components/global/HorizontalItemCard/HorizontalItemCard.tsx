import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Amount } from 'types/global/Amount';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { WithId } from 'types/global/WithId';
import Rating from '../Rating/Rating';

interface CardProps<T extends WithId> {
  handleOnViewDetailClick: any;
  item: T;
  extraInformation?: any;
  title?: string;
  image?: string;
  price?: ReactNode;
  className?: string;
  rating?: number | string;
}

const Divider = () => (
  <div className="h-[1px] w-[200%] bg-dark-200 absolute right-[-50px] top-[-10px]" />
);

function HorizontalItemCard<T extends WithId>({
  handleOnViewDetailClick,
  item,
  title = '',
  image = '',
  price,
  extraInformation,
  className = '',
  rating,
}: CardProps<T>) {
  const AddressSection = ({ item }: { item: T }) => (
    <section className="font-lato font-normal text-base mt-5">
      <span>{extraInformation.address.address1}</span>
    </section>
  );

  const TitleSection = ({ name }: { name: string }) => (
    <header className="flex justify-between items-center">
      <span className="h5">{name}</span>
    </header>
  );

  return (
    <li
      key={item.id}
      className={`bg-white flex flex-col relative w-full shadow overflow-hidden rounded-md px-6 py-4 ${className}`}
      onClick={() => handleOnViewDetailClick(item)}
    >
      <section className="items-center">
        <img
          src={image}
          className="absolute top-0 left-0 w-[40%] h-[75%]"
          alt="hotel thumbnail"
        />
        <section className="ml-[40%] px-3">
          <TitleSection name={title} />
          <AddressSection item={item} />
          <section className="mt-2">
            {rating && <Rating value={rating} />}
          </section>
        </section>
      </section>
      {price}
    </li>
  );
}

export default HorizontalItemCard;
