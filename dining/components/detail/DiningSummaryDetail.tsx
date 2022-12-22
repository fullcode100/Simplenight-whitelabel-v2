import ImageCarouselLargeScreen from 'components/global/CarouselNew/ImageCarouselLargeScreen';
import React from 'react';
import DiningCategoryDetail from './DiningCategoryDetail';
import DiningPhoneEmail from './DiningPhoneEmail';
import DiningRatingDetail from './DiningRatingDetail';
import DiningTimeDetail from './DiningTimeDetail';

const DiningSummaryDetail = ({
  className,
  name,
  rating,
  images,
  reviewsLength,
  phone,
  categories,
  isOpen,
  hours,
}: {
  className?: string;
  name: string;
  rating: number;
  images: string[];
  reviewsLength: number;
  phone: string;
  categories: string[];
  isOpen: boolean;
  hours?: string[];
}) => {
  return (
    <section className={`flex justify-center ${className}`}>
      <section className="max-w-[904px] w-full pt-9 pb-4 mx-auto">
        <h1 className="text-3xl">{name}</h1>
        <div className="flex mt-3">
          <DiningRatingDetail rating={rating} reviewsLength={reviewsLength} />
          <p>|</p>
          <DiningPhoneEmail phone={phone} />
        </div>
      </section>
      {images && (
        <section className="hidden w-full pt-8 lg:block bg-dark-100">
          <ImageCarouselLargeScreen images={images} title="" />
        </section>
      )}
      <section className="max-w-[904px] w-full pt-6 pb-6 mx-auto">
        <div className="flex">
          <DiningTimeDetail isOpen={isOpen} hours={hours} />
          <DiningCategoryDetail className="ml-10" categories={categories} />
        </div>
      </section>
    </section>
  );
};

export default DiningSummaryDetail;
