import React from 'react';

const CardShowSkeleton = () => {
  return (
    <section className="animate-pulse lg:border rounded overflow-hidden relative cursor-pointer w-[153px] lg:w-[390px]">
      <section className="bg-dark-200 pointer-events-none select-none relative h-[140px] h-[135px]"></section>
      <section className="flex flex-col lg:flex-row justify-between px-0 lg:px-5 py-2 lg:py-4 select-none">
        <section className="rounded bg-dark-200 h-[18px] lg:h-[16px] lg:my-[3px] w-[100px] lg:w-[200px]"></section>
        <section className="rounded bg-dark-200 h-[14px] mt-1 lg:my-[3px] lg:h-[16px] w-[50px] lg:w-[70px]"></section>
      </section>
    </section>
  );
};

export default CardShowSkeleton;
