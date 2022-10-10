import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import Rating from 'components/global/Rating/Rating';
import React, { ReactNode } from 'react';
import { WithId } from 'types/global/WithId';
import Divider from '../../../../components/global/Divider/Divider';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import Link from 'next/link';

interface CardProps<T extends WithId> {
  item: T;
  title: string;
  icon?: ReactNode;
  categoryName?: string;
  address?: ReactNode;
  images?: string[];
  className?: string;
  rating?: number;
  reviewsAmount?: number;
  phoneNumber?: string;
  tags?: string[];
  cancellable?: ReactNode;
  priceDisplay?: ReactNode;
  url?: string;
}

function ResultCard<T extends WithId>({
  title,
  address,
  rating,
  reviewsAmount,
  phoneNumber,
  tags,
  images,
  cancellable,
  priceDisplay,
  icon,
  categoryName,
  url = '/',
}: CardProps<T>) {
  const target = window.innerWidth < 640 ? '_self' : '_blank';

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br z-10">
      {icon}
      <span className="font-semibold text-[14px]">{categoryName}</span>
    </section>
  );

  const CarouselAndTagSection = () => (
    <section className="relative">
      <CategoryTag />
      {images && <ImageCarousel images={images} title={title} />}
    </section>
  );
  const TitleSection = () => (
    <section className="font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg break-words">
      {title}
    </section>
  );

  const RatingSection = () => (
    <section className="flex gap-2 ">
      {rating && <Rating value={rating} />}
      {reviewsAmount && (
        <p className="text-xs text-dark-700">
          {reviewsAmount} {reviewsLabel}
        </p>
      )}
    </section>
  );

  const TagsSection = () => {
    return (
      <section className="gap-2 flex">
        {tags?.map((tag, idx) => (
          <span
            className="py-0.5 px-2 bg-dark-100 capitalize inline-block rounded-4"
            key={idx}
          >
            {tag}
          </span>
        ))}
      </section>
    );
  };

  const CancelationAndPricingSection = () => <section></section>;
  const reviewsLabel = 'reviews';
  return (
    <li className="w-full rounded-4 border border-dark-300 overflow-hidden">
      <CarouselAndTagSection />
      <Link href={url} passHref>
        <a target={target} rel="noopener noreferrer">
          <section className="flex flex-col justify-between  gap-2 p-4 lg:justify-start lg:w-full">
            <TitleSection />
            <RatingSection />
            {address}
            <p>{phoneNumber}</p>
            {tags && <TagsSection />}
          </section>
          <Divider />
          <section className="flex justify-between items-center py-2 px-4">
            {cancellable}
            {priceDisplay}
          </section>

          <CancelationAndPricingSection />
        </a>
      </Link>
    </li>
  );
}

export default ResultCard;
