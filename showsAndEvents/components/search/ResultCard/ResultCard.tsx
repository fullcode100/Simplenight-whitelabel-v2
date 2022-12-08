import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import Rating from 'components/global/Rating/Rating';
import React, { ReactNode, useEffect, useState } from 'react';
import { WithId } from 'types/global/WithId';
import Divider from '../../../../components/global/Divider/Divider';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import Link from 'next/link';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import dayjs from 'dayjs';
import LocationPin from 'public/icons/assets/location-pin.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import EmptyImage from 'components/global/EmptyImage/EmptyImage';

interface CardProps<T extends WithId> {
  item: T;
  title: string;
  icon?: ReactNode;
  categoryName?: string;
  fromDate: string;
  toDate: string;
  address?: ReactNode;
  images?: string[];
  className?: string;
  rating?: number;
  reviewsAmount?: number;
  phoneNumber?: string;
  tags?: string;
  cancellable?: ReactNode;
  priceDisplay?: ReactNode;
  url?: string;
  isHorizontal?: boolean;
  index?: number;
  thumbnail?: string;
}

function ResultCard<T extends WithId>({
  title,
  address,
  rating,
  reviewsAmount,
  phoneNumber,
  tags,
  images,
  fromDate,
  toDate,
  cancellable,
  priceDisplay,
  icon,
  categoryName,
  index = 0,
  url = '/',
  isHorizontal,
  thumbnail,
}: CardProps<T>) {
  const [invalidImage, setInvalidImage] = useState(false);
  const target = window.innerWidth < 640 ? '_self' : '_blank';

  useEffect(() => {
    checkValidImage();
  }, [thumbnail]);

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br z-19">
      {icon}
      <span className="font-semibold text-[14px]">{categoryName}</span>
    </section>
  );

  const CarouselAndTagSection = () => (
    <section className="relative">
      {images && <ImageCarousel images={images} title={title} />}
    </section>
  );

  const TitleSection = () => (
    <section
      className={`font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg truncate ${
        isHorizontal
          ? 'max-w-[200px] lg:max-w-[250px]'
          : 'max-w-[250px] lg:max-w-[350px]'
      }`}
    >
      {title}
    </section>
  );

  const RatingSection = () => (
    <section className="flex gap-2 ">
      {rating && <Rating value={rating} />}
      {reviewsAmount && (
        <p className="text-xs text-dark-700">
          {reviewsAmount} {reviewsLabel}
        </p>
      )}
    </section>
  );

  const CancelationAndPricingSection = () => <section></section>;
  const reviewsLabel = 'reviews';

  const checkValidImage = () => {
    const img = new Image();
    img.src = thumbnail as string;
    img.onerror = () => setInvalidImage(true);
  };

  const displayEmpty = invalidImage || !thumbnail;

  return (
    <div className="w-full bg-white rounded-4 border border-dark-300 mt-3 overflow-hidden">
      <Link href={url} passHref>
        <a
          target={target}
          rel="noopener noreferrer"
          className="hover:text-inherit"
        >
          <section
            className={`flex  lg:flex-row relative ${
              isHorizontal ? 'flex-row' : 'flex-col'
            }`}
          >
            {!displayEmpty && (
              <section
                className={` ${
                  isHorizontal
                    ? 'w-[108px] h-[108px]'
                    : 'min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem]'
                }`}
                style={{
                  backgroundImage: `url(${thumbnail ?? '/images/Slide.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            <CategoryTag />
            {displayEmpty && (
              <section
                className={` ${
                  isHorizontal
                    ? 'w-[108px] h-[108px]'
                    : 'min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem]'
                }`}
              >
                <EmptyImage />
              </section>
            )}
            <section
              className={`flex flex-col justify-between ${
                isHorizontal ? 'gap-1 p-3' : 'gap-2 p-5 pb-0 lg:pb-5'
              } lg:justify-start `}
            >
              <TitleSection />

              {/* <RatingSection /> */}
              <section className="flex flex-row gap-2">
                <LocationPin className="h-3.5 lg:h-4 lg:w-4 lg:ml-0 mt-1 lg:mt-0 text-primary-1000" />
                <p className="font-semibold">{address}</p>
              </section>
              <section className="flex flex-row gap-2">
                <CalendarIcon className="h-3.5 lg:h-4 lg:w-4 mt-1 lg:mt-0 text-primary-1000" />
                <p className="font-semibold">
                  From {dayjs(fromDate as string).format('MMM D, YYYY')}
                </p>
              </section>

              {/* {tags && <TagsSection />} */}

              {!isHorizontal && (
                <section className="flex justify-between items-center py-2 px-4"></section>
              )}
            </section>
            <Divider className="lg:hidden" />
            {!isHorizontal && (
              <section className="flex flex-row lg:flex-col lg:ml-auto justify-between items-center lg:items-start py-3 lg:py-5 px-4 lg:px-5">
                <section>{cancellable}</section>
                <section className="ml-auto">{priceDisplay}</section>
              </section>
            )}

            <Divider />
          </section>
          {isHorizontal && (
            <section className="flex justify-between px-2 py-1 border-t-2">
              <div className="self-center">
                <section>{cancellable}</section>
              </div>
              <div>
                <section>{priceDisplay}</section>
                <p className="flex">
                  Includes Taxes and Fees
                  <InfoCircle className="self-center h-4 w-4 ml-2" />
                </p>
              </div>
            </section>
          )}

          <CancelationAndPricingSection />
        </a>
      </Link>
    </div>
  );
}

export default ResultCard;
