import React from 'react';

const HorizontalSkeletonCard = () => {
  return (
    <>
      <div className="block lg:hidden w-[335px] border border-dark-300 rounded overflow-hidden">
        <div className="h-[156px] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-dark-400 before:to-transparent before:animate-[skeleton_800ms_infinite]" />
        <div className="p-4 space-y-2 border-t border-dark-300">
          <div className="w-full rounded h-[22px] overflow-hidden">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
          <div className="w-1/2 rounded h-[22px] overflow-hidden">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
          <div className="w-2/3 rounded h-[22px] overflow-hidden">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
        </div>
        <div className="px-4 py-3 border-t border-dark-300">
          <div className="w-full h-12 overflow-hidden rounded">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full hidden h-[58px] overflow-hidden border rounded lg:flex border-dark-300">
        <div className="px-4 py-2">
          <div className="w-10 h-10 rounded relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-dark-400 before:to-transparent before:animate-[skeleton_800ms_infinite]" />
        </div>
        <div className="flex-1 h-full">
          <div className="flex flex-col justify-center h-full">
            <div className="w-[180px] rounded h-[20px] overflow-hidden">
              <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
            </div>
          </div>
        </div>
        <div className="flex-1 h-full pr-4">
          <div className="flex flex-col items-end justify-center h-full">
            <div className="w-[180px] rounded h-[20px] overflow-hidden">
              <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center w-[247px] h-full px-4 py-3 border-l border-dark-300">
          <div className="w-[90px] h-6 overflow-hidden rounded">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
          <div className="w-[90px] h-8 overflow-hidden rounded">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalSkeletonCard;
