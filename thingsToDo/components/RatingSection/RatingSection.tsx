import { Paragraph } from '@simplenight/ui';
import Rating from 'components/global/Rating/Rating';
import { useTranslation } from 'react-i18next';

interface Props {
  rating?: number;
  reviewsAmount?: number;
}
const RatingSection = ({ rating, reviewsAmount }: Props) => {
  const [t] = useTranslation('global');
  const reviewsLabel = t('reviews', 'Reviews');
  const noReviewsLabel = t('noReviews', 'No reviews yet');
  return (
    <section className="flex gap-2 ">
      {rating && (
        <Rating value={parseInt(rating.toFixed(0))} reviews={reviewsAmount} />
      )}
      {reviewsAmount ? (
        <Paragraph textColor="text-dark-700">{`${
          Number.isInteger(rating) ? rating : rating?.toFixed(2)
        }/5 (${reviewsAmount} ${reviewsLabel})`}</Paragraph>
      ) : (
        <Paragraph textColor="text-dark-700">{noReviewsLabel}</Paragraph>
      )}
    </section>
  );
};

export default RatingSection;
