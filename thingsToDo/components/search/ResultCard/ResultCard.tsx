import Rating from 'components/global/Rating/Rating';
import React, { ReactNode } from 'react';
import { WithId } from 'types/global/WithId';
import Divider from '../../../../components/global/Divider/Divider';
import PriceDisplay from './PriceDisplay';
import Link from 'next/link';
import ReadMore from './ReadMoreDescription';
import { useTranslation } from 'react-i18next';
import { Rates } from 'thingsToDo/types/response/ThingsSearchResponse';

import { Paragraph } from '@simplenight/ui';

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
  rate: Rates;
  url?: string;
  description?: string;
}

function ResultCard<T extends WithId>({
  title,
  rating,
  reviewsAmount,
  image,
  cancellable,
  rate,
  icon,
  categoryName,
  url = '/',
  description,
}: CardProps<T>) {
  const target = window.innerWidth < 640 ? '_self' : '_blank';
  const [t] = useTranslation('global');
  const noReviewsLabel = t('noReviews', 'No reviews yet');

  const ImageAndTagSection = () => (
    <section
      className="relative min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem]"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    ></section>
  );
  const TitleSection = () => (
    <section className="font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg break-words">
      {title}
    </section>
  );

  const RatingSection = () => (
    <section className="flex gap-2 ">
      {rating && <Rating value={parseInt(rating.toFixed(0))} />}
      {reviewsAmount ? (
        <Paragraph textColor="text-dark-700">{`${
          Number.isInteger(rating) ? rating : rating?.toFixed(2)
        }/5 (${reviewsAmount} ${reviewsLabel})`}</Paragraph>
      ) : (
        <Paragraph textColor="text-dark-700">{noReviewsLabel}</Paragraph>
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
              <PriceDisplay rate={rate} />
            </section>

            <CancelationAndPricingSection />
          </section>
          <section
            className={`flex ${
              cancellable ? 'justify-between' : 'justify-end'
            } px-4 py-3 lg:hidden items-center`}
          >
            {cancellable}
            <PriceDisplay rate={rate} />
          </section>
        </a>
      </Link>
    </li>
  );
}

export default ResultCard;
