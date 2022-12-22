import Rating from 'components/global/Rating/Rating';
import React from 'react';
import { useTranslation } from 'react-i18next';

const DiningRatingDetail = ({
  rating,
  reviewsLength,
}: {
  rating: number;
  reviewsLength: number;
}) => {
  const [t] = useTranslation('dining');
  return (
    <div className="flex">
      <Rating sizeClass="text-lg" value={rating} />
      <p className="px-2 text-xs font-normal text-dark-800">
        {reviewsLength} {t('reviews')}
      </p>
    </div>
  );
};

export default DiningRatingDetail;
