import Rating from 'components/global/Rating/Rating';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CarComment from './CarComment';
import StarIcon from 'public/icons/assets/star-outlined.svg';

const CarCustomerReviews = ({
  reviews,
  rating,
}: {
  reviews: {
    rating: number;
    text: string;
    timestamp: string;
    user: {
      name: string;
      image: string | null;
    };
  }[];
  rating: number;
}) => {
  const [t] = useTranslation('cars');
  return (
    <>
      <SectionTitle
        title={t('customerReview', 'Customer Reviews')}
        icon={<StarIcon />}
      />
      <div className="flex items-center my-6">
        <span className="pr-5 text-base text-dark-1000">
          {t('overallRating', 'Overall rating')}
        </span>
        <Rating value={rating} />
        <span className="text-dark-800 text-[12px] pl-2">
          {reviews.length} {t('reviews')}
        </span>
      </div>
      <div>
        {reviews.map((review) => (
          <CarComment
            key={review.text}
            comment={review.text}
            rating={review.rating}
            userName={review.user.name}
            date={review.timestamp}
          />
        ))}
      </div>
    </>
  );
};

export default CarCustomerReviews;
