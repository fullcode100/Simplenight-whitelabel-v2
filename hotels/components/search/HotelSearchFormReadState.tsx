import dayjs from 'dayjs';
import { formatAsMonthDay } from 'helpers/dajjsUtils';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import React from 'react';

import MagnifierIcon from 'public/icons/assets/magnifier.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';

const DotSpacer = () => <span>·</span>;

const HotelSearchFormReadState = () => {
  const values = {
    location: 'Chicago, IL, USA',
    adults: 2,
    children: 2,
    startDate: '2022-09-01',
    endDate: '2022-09-05',
  };
  const ADULT_TEXT = usePlural(values.adults, 'Adult', 'Adults');

  const formattedStartDate = formatAsMonthDay(values.startDate);
  const formattedEndDate = formatAsMonthDay(values.endDate);

  const LocationSection = () => (
    <span className="font-semibold">{values.location}</span>
  );

  const OccupancySection = () => (
    <section>
      <span>{values.adults} </span>
      <span>{ADULT_TEXT}, </span>
      <span>{values.children}</span>
      <span> Children</span>
    </section>
  );

  const DatesSection = () => (
    <section className="pr-14">
      <span>{formattedStartDate}</span>
      <span> to </span>
      <span>{formattedEndDate}</span>
    </section>
  );

  const OccupancyAndDatesSection = () => (
    <section className="flex justify-between mt-4 mb-2 font-normal">
      <section className="flex gap-2">
        <MultiplePersonsIcon className="text-dark-1000" />
        <OccupancySection />
      </section>
      <DotSpacer />
      <DatesSection />
    </section>
  );

  return (
    <section className="flex font-lato justify-between text-sm px-4 pt-3 border-t-[1px] border-b-[1px]">
      <section className="flex flex-col w-[90%]">
        <LocationSection />
        <OccupancyAndDatesSection />
      </section>
      <section className="flex items-center justify-center w-[15%]">
        <MagnifierIcon className="text-primary-1000 " />
      </section>
    </section>
  );
};

export default HotelSearchFormReadState;
