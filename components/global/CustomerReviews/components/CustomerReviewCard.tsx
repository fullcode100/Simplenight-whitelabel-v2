import Divider from 'components/global/Divider/Divider';
import { Review } from '../../../../types/global/Review';
import Rating from '../../Rating/Rating';
import CommentSection from './CommentSection';

interface ReviewProp {
  review: Review;
  isLastReview: boolean;
}

const CustomerReviewCard = ({ review, isLastReview }: ReviewProp) => {
  const { name, date, rating, positiveComment, negativeComment } = review;

  return (
    <section>
      <h5 className="text-base text-dark-1000 font-semibold pt-6 mb-3 lg:text-2xl">
        {name}
      </h5>
      <section className="flex justify-between items-center lg:justify-start lg:gap-2">
        <Rating value={rating} />
        <p className="text-xs font-semibold text-dark-1000 lg:text-base">
          {date}
        </p>
      </section>
      <CommentSection titleSection="Good Things" text={positiveComment} />
      <CommentSection titleSection="Bad Things" text={negativeComment} />
      {!isLastReview && <Divider className="mt-6" />}
    </section>
  );
};

export default CustomerReviewCard;
