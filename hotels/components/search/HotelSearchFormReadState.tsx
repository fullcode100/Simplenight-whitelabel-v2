import dayjs from 'dayjs';
import { formatAsMonthDay, SEARCH_DATE_FORMAT } from 'helpers/dajjsUtils';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import React, { useEffect } from 'react';

import MagnifierIcon from 'public/icons/assets/magnifier.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';
import useQuery from 'hooks/pageInteraction/useQuery';

const DotSpacer = () => <span>·</span>;

interface HotelSearchFormReadStateProps {
  setIsSearching?: (isReading: boolean) => void;
  log?: (message: string) => void;
}

const HotelSearchFormReadState = ({
  setIsSearching = (value: boolean) => {},
}: HotelSearchFormReadStateProps) => {
  const {
    startDate: startDateQuery,
    endDate: endDateQuery,
    adults: adultsQuery,
    children: childrenQuery,
    rooms,
  } = useQuery();

  const location = 'Chicago, IL, USA';
  const adults = adultsQuery;
  const children = childrenQuery;
  const startDate = dayjs(startDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );
  const endDate = dayjs(endDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );

  const ADULT_TEXT = usePlural(
    (adults as unknown as number) ?? 0,
    'Adult',
    'Adults',
  );

  const formattedStartDate = startDateQuery ? formatAsMonthDay(startDate) : '-';
  const formattedEndDate = endDateQuery ? formatAsMonthDay(endDate) : '-';

  const LocationSection = () => (
    <span className="font-semibold">{location}</span>
  );

  const OccupancySection = () => (
    <section>
      <span>{adults ?? ' - '} </span>
      <span>{ADULT_TEXT}, </span>
      <span>{children ?? ' - '}</span>
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

  const handleSearchClick = () => {
    setIsSearching(true);
  };
  return (
    <section className="flex font-lato justify-between text-sm px-4 border-t-[1px] border-b-[1px] pt-4">
      <section className="flex flex-col w-[90%]">
        <LocationSection />
        <OccupancyAndDatesSection />
      </section>
      <section
        className="flex items-center justify-center w-[15%]"
        onClick={handleSearchClick}
      >
        <MagnifierIcon className="text-primary-1000 " />
      </section>
    </section>
  );
};

export default HotelSearchFormReadState;
