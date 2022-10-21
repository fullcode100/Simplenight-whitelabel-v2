import React from 'react';
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
  onChange?: (newRating: number) => void;
}

const Rating = ({
  value,
  size = 30,
  editable = false,
  count = value,
  sizeClass = 'w-5 h-5',
  onChange,
}: RatingProps) => {
  return (
    <ReactStars
      value={value}
      size={size}
      edit={editable}
      count={count}
      onChange={onChange}
      emptyIcon={<EmptyStar className={`text-primary-1000 ${sizeClass} `} />}
      filledIcon={<FilledStar className={`text-primary-1000 ${sizeClass} `} />}
    />
  );
};
export default Rating;
