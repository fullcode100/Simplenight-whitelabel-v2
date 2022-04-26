import React from 'react';
import { Review } from 'types/global/Review';
import CustomerReviewCard from './CustomerReviewCard';

interface CustomerReviewsListProps {
  reviews: Array<Review>;
}

const CustomerReviewsList = ({ reviews }: CustomerReviewsListProps) => {
  return (
    <section>
      {reviews.map((review, index) => {
        return (
          <CustomerReviewCard
            review={review}
            isLastReview={index === reviews.length - 1 ? true : false}
            key={review.date}
          />
        );
      })}
    </section>
  );
};

export default CustomerReviewsList;
