import React from 'react';
import HorizontalSkeletonCard from './HorizontalSkeletonCard';

const HorizontalSkeletonList = () => {
  return (
    <div className="space-y-4 lg:mt-9">
      <HorizontalSkeletonCard />
      <HorizontalSkeletonCard />
      <HorizontalSkeletonCard />
      <HorizontalSkeletonCard />
    </div>
  );
};

export default HorizontalSkeletonList;
