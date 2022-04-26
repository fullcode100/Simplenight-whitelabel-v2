import SectionHeader from '../SectionHeader/SectionHeader';
import StarIcon from 'public/icons/assets/star-outlined.svg';
import CustomerReviewsList from './components/CustomerReviewsList';
import reviewMock from 'mocks/reviewMock';

const CustomerReviewsSection = () => {
  return (
    <section className="mt-4 px-4">
      <SectionHeader
        title="Customer Reviews"
        icon={<StarIcon />}
        additionalInfo={
          <p className="text-dark-1000 text-xs">{`${reviewMock.length} reviews`}</p>
        }
      />
      <CustomerReviewsList reviews={reviewMock} />
    </section>
  );
};

export default CustomerReviewsSection;
