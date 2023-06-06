import React from 'react';

const HorizontalSkeletonCard = () => {
  return (
    <div className="min-w-[980px]">
      <div className="block lg:hidden w-[635px] border border-dark-300 rounded overflow-hidden">
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
      <div className="max-w-7xl mx-auto w-full hidden h-[180px] overflow-hidden border rounded lg:flex border-dark-300">
        <div className="w-[240px] h-full relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-dark-400 before:to-transparent before:animate-[skeleton_800ms_infinite]" />
        <div className="flex-1 h-full p-4 space-y-2 border-l border-dark-300">
          <div className="w-2/3 rounded h-[22px] overflow-hidden">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
          <div className="w-1/3 rounded h-[22px] overflow-hidden">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
          <div className="w-1/2 rounded h-[22px] overflow-hidden">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
        </div>
        <div className="flex items-end w-[230px] h-full px-4 py-3 border-l border-dark-300">
          <div className="w-full h-12 overflow-hidden rounded">
            <div className="h-full w-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-dark-100 before:via-dark-300 before:to-dark-100 before:animate-[skeleton_800ms_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSkeletonCard;
