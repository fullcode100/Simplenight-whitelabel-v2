import React from 'react';
import Rating from 'components/global/Rating/Rating';
import dayjs from 'dayjs';

const CarComment = ({
  comment,
  userName,
  rating,
  date,
}: {
  comment: string;
  userName: string;
  rating: number;
  date: string;
}) => {
  const dateString = dayjs(date).format('MM/DD/YYYY');
  return (
    <div className="mt-6 mb-2">
      <p className="pb-2 text-base text-dark-1000">{userName}</p>
      <div className="flex justify-between mb-2">
        <Rating value={rating} />
        <span className="block">{dateString}</span>
      </div>
      <p className="text-sm font-normal text-dark-800">{comment}</p>
    </div>
  );
};

export default CarComment;
