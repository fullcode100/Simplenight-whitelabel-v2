import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactStars from 'react-rating-stars-component';

import EmptyStar from 'public/icons/assets/star-outlined.svg';
import FilledStar from 'public/icons/assets/star-contained.svg';

interface RatingProps {
  value: number;
  size?: number;
  editable?: boolean;
  count?: number;
  sizeClass?: string;
  color?: string;
  reviews?: number;
  onChange?: (newRating: number) => void;
  isHotelRating?: boolean;
}

const Rating = ({
  value,
  size = 30,
  editable = false,
  count = value,
  sizeClass = 'w-5 h-5',
  reviews = undefined,
  isHotelRating = false,
  onChange,
}: RatingProps) => {
  const [t, i18next] = useTranslation('global');
  const reviewsLabel = t('reviews', 'Reviews');

  return (
    <section className="flex flex-row gap-2">
      <ReactStars
        value={value}
        size={size}
        edit={editable}
        count={count}
        onChange={onChange}
        emptyIcon={<EmptyStar className={`text-primary-1000 ${sizeClass} `} />}
        filledIcon={
          <FilledStar className={`text-primary-1000 ${sizeClass} `} />
        }
      />
      {count && (
        <p className=" text-dark-700 text-[14px]">
          {isHotelRating ? (
            <>{`${value}-Star Hotel`}</>
          ) : (
            <>{`${value}/5 (${reviews} ${reviewsLabel})`}</>
          )}
        </p>
      )}
    </section>
  );
};
export default Rating;
