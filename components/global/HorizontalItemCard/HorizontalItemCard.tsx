import React, { ReactNode } from 'react';
import { WithId } from 'types/global/WithId';
import Rating from '../Rating/Rating';

interface CardProps<T extends WithId> {
  handleOnViewDetailClick: any;
  item: T;
  icon?: ReactNode;
  categoryName?: string;
  address?: string;
  title?: string;
  image?: string;
  price?: ReactNode;
  className?: string;
  rating?: number;
}

function HorizontalItemCard<T extends WithId>({
  handleOnViewDetailClick,
  item,
  icon,
  categoryName,
  title = '',
  image = '',
  price,
  address = '',
  className = '',
  rating,
}: CardProps<T>) {
  const AddressSection = () => (
    <span className="font-normal text-dark-1000 text-sm py-2">{address}</span>
  );

  const TitleSection = () => (
    <header className=" font-semibold text-dark-1000 text-[18px] leading-[22px]">
      {title}
    </header>
  );

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br">
      {icon}
      <span className="font-semibold text-sm">{categoryName}</span>
    </section>
  );

  return (
    <li
      key={item.id}
      className={`bg-white flex flex-col border border-dark-300 rounded ${className}`}
      onClick={() => handleOnViewDetailClick(item)}
    >
      <section className="flex flex-row">
        <section
          className="min-w-[45%] min-h-[150px] "
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'round',
          }}
        >
          <CategoryTag />
        </section>
        <section className="flex flex-col justify-between p-4">
          <TitleSection />
          <AddressSection />
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
