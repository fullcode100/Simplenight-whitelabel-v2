import SectionHeader from '../SectionHeader/SectionHeader';
import StarIcon from 'public/icons/assets/star-outlined.svg';
import CustomerReviewsList from './components/CustomerReviewsList';
import reviewMock from 'mocks/reviewMock';

const CustomerReviewsSection = () => {
  return (
    <section className="mt-4 px-4 lg:px-0">
      <SectionHeader
        title="Customer Reviews"
        icon={<StarIcon />}
        additionalInfo={
          <p className="text-dark-1000 text-xs lg:text-2xl lg:font-semibold">{`${reviewMock.length} reviews`}</p>
        }
      />
      <CustomerReviewsList reviews={reviewMock} />
    </section>
  );
};

export default CustomerReviewsSection;
