import React from 'react';

const HorizontalSkeletonCard = () => {
  return (
    <div className="border border-dark-300 bg-white rounded">
      <div className="flex flex-row animate-pulse">
        <div className="min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem] bg-dark-200"></div>
        <div className="flex flex-col justify-between p-4 lg:justify-start w-full gap-4">
          <div className="h-6 rounded bg-dark-200 w-[60%]"></div>
          <div className="h-4 rounded bg-dark-200 w-1/2"></div>
          <div className="h-6 rounded bg-dark-200 w-1/5"></div>
        </div>
        <div className="hidden lg:flex flex-col py-4 justify-between pr-4 w-[24rem] items-end">
          <div className="h-6 rounded bg-dark-200 w-[80%]"></div>
          <div className="h-10 rounded bg-dark-200 w-[60%]"></div>
        </div>
      </div>
      <div className="lg:hidden p-2 flex justify-end">
        <div className="h-10 rounded bg-dark-200 w-[30%]"></div>
      </div>
    </div>
  );
};

export default HorizontalSkeletonCard;
