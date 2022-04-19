import React from 'react';
import { useTranslation } from 'react-i18next';
import { Amount } from 'types/global/Amount';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { WithId } from 'types/global/WithId';

interface CardProps<T extends WithId> {
  handleOnViewDetailClick: any;
  item: T;
  extraInformation?: any;
  title?: string;
  image?: string;
  price?: Amount;
  className?: string;
}

const Divider = () => (
  <div className="h-[1px] w-[140%] bg-dark-200 absolute left-0 mt-4" />
);

function ItemCard<T extends WithId>({
  handleOnViewDetailClick,
  item,
  title = '',
  image = '',
  price,
  extraInformation,
  className = '',
}: CardProps<T>) {
  const [t, i18next] = useTranslation('hotels');
  const totalLabel = t('total', 'Total');
  const fromLabel = t('from', 'from');

  const PriceSection = ({ price }: { price?: Amount }) => (
    <footer className="mt-8 flex justify-between items-center">
      <section>
        <span className="font-lato font-semibold text-base">{totalLabel}</span>
      </section>
      <section className="grid grid-cols-2 items-center">
        <span className="pl-4 font-lato text-base">{fromLabel}</span>
        <span className="font-lato font-semibold text-base">{price?.formatted}</span>
      </section>
    </footer>
  );

  const AddressSection = ({ item }: { item: T }) => (
    <section className="font-lato font-normal text-base mt-5">
      <span>{extraInformation?.address?.address1}</span>
    </section>
  );

  const TitleSection = ({ name }: { name: string }) => (
    <header className="flex justify-between items-center mt-[50%]">
      <span className="h5">{name}</span>
      <LocationPin className="text-primary-1000" />
    </header>
  );

  return (
    <li
      key={item.id}
      className={`bg-white relative w-full shadow overflow-hidden rounded-md px-6 py-4 ${className}`}
      onClick={() => handleOnViewDetailClick(item)}
    >
      <img
        src={image}
        className="w-full h-[50%] absolute left-0 top-0"
        alt="hotel thumbnail"
      />
      <TitleSection name={title} />
      <AddressSection item={item} />
      <Divider />
      <PriceSection price={price} />
    </li>
  );
}

export default ItemCard;
