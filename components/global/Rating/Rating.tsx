import React from 'react';
import ReactStars from 'react-rating-stars-component';

import EmptyStar from 'public/icons/assets/star-outlined.svg';
import FilledStar from 'public/icons/assets/star-contained.svg';

interface RatingProps {
  value: number | string;
  size?: number;
  edit?: boolean;
  count?: number;
  color?: string;
  onChange?: (newRating: number) => void;
}

const Rating = ({ value, size = 30, edit = false, count = 5 }: RatingProps) => (
  <ReactStars
    value={value}
    size={size}
    edit={edit}
    count={count}
    emptyIcon={<EmptyStar className="text-primary-1000 w-5 h-5" />}
    filledIcon={<FilledStar className="text-primary-1000 w-5 h-5" />}
  />
);

export default Rating;
