import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import Rating from 'components/global/Rating/Rating';
import React, { ReactNode } from 'react';
import { WithId } from 'types/global/WithId';
import Divider from '../../../../components/global/Divider/Divider';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import Link from 'next/link';
import ReadMore from './ReadMoreDescription';

interface CardProps<T extends WithId> {
  item: T;
  title: string;
  icon?: ReactNode;
  categoryName?: string;
  image?: string;
  className?: string;
  rating?: number;
  reviewsAmount?: number;
  cancellable?: ReactNode;
  priceDisplay?: ReactNode;
  url?: string;
  description?: string;
}

function ResultCard<T extends WithId>({
  title,
  rating,
  reviewsAmount,
  image,
  cancellable,
  priceDisplay,
  icon,
  categoryName,
  url = '/',
  description,
}: CardProps<T>) {
  const target = window.innerWidth < 640 ? '_self' : '_blank';

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br z-[1]">
      {icon}
      <span className="font-semibold text-[14px] capitalize">
        {categoryName}
      </span>
    </section>
  );

  const ImageAndTagSection = () => (
    <section
      className="relative min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem]"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CategoryTag />
    </section>
  );
  const TitleSection = () => (
    <section className="font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg break-words">
      {title}
    </section>
  );

  const RatingSection = () => (
    <section className="flex gap-2 ">
      {rating && <Rating value={parseInt(rating.toFixed(0))} />}
      {reviewsAmount && (
        <p className="text-xs text-dark-700">
          {`${
            Number.isInteger(rating) ? rating : rating?.toFixed(2)
          }/5 (${reviewsAmount} ${reviewsLabel})`}
        </p>
      )}
    </section>
  );

  const CancelationAndPricingSection = () => <section></section>;
  const reviewsLabel = 'reviews';
  return (
    <li className="w-full overflow-hidden border rounded-4 border-dark-300">
      <Link href={url} passHref>
        <a target={target} rel="noopener noreferrer">
          <section className="flex flex-col lg:flex-row">
            <ImageAndTagSection />
            <section className="flex flex-col justify-between gap-2 p-4 lg:justify-start lg:w-full">
              <TitleSection />
              <RatingSection />
              {description && (
                <ReadMore
                  className="w-full text-xs leading-5 text-dark-1000"
                  text={description}
                />
              )}
            </section>
            <Divider />
            <section
              className={`hidden lg:flex flex-col py-4 ${
                cancellable ? 'justify-between' : 'justify-end'
              } pr-4 w-[24rem] text-right`}
            >
              {cancellable}
              {priceDisplay}
            </section>

            <CancelationAndPricingSection />
          </section>
          <section
            className={`flex ${
              cancellable ? 'justify-between' : 'justify-end'
            } px-4 py-3 lg:hidden`}
          >
            {cancellable}
            {priceDisplay}
          </section>
        </a>
      </Link>
    </li>
  );
}

export default ResultCard;
