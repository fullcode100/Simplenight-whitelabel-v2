import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import Rating from 'components/global/Rating/Rating';
import React from 'react';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { thingToDoDetail } from '../../mocks/thingToDoDetailMock';

type ThingsDetailDisplayProps = CategoryPageComponentProps;

const ThingsDetailDisplay = ({ Category }: ThingsDetailDisplayProps) => {
  const { images } = thingToDoDetail;

  const HeaderSection = () => {
    const {
      name,
      reviews: {
        reviews_amount: reviewsAmount,
        activity_score: activityScore,
        total_score: totalScore,
      },
    } = thingToDoDetail;
    return (
      <section className="border border-dark-300 ">
        {images && (
          <ImageCarousel images={images} title={name} showDots={false} />
        )}
        <div className="bg-dark-100 px-5 py-4 flex flex-col gap-2">
          <h1 className="h3">{name}</h1>
          <div className="flex items-center gap-2">
            {activityScore && (
              <Rating
                value={activityScore}
                count={Math.floor(activityScore)}
                sizeClass={'h-4 w-4'}
              />
            )}
            <span className="text-dark-700 text-xs">
              {activityScore}/{totalScore} ({reviewsAmount} Reviews)
            </span>
          </div>
        </div>
      </section>
    );
  };
  return (
    <section>
      <HeaderSection />
    </section>
  );
};

export default ThingsDetailDisplay;
