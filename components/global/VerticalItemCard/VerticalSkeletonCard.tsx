import React from 'react';

const VerticalSkeletonCard = () => {
  return (
    <>
      <div
        className="w-full hidden border rounded border-dark-300 pl-4
      lg:block lg:min-w-[18rem] lg:max-w-[18rem] lg:w-[25%] lg:mr-8 lg:mt-12 lg:h-full lg:min-h-[1000px] mt-3 relative"
      >
        <div className="w-[240px] h-full relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-dark-400 before:to-transparent before:animate-[skeleton_800ms_infinite]" />
      </div>
    </>
  );
};

export default VerticalSkeletonCard;
