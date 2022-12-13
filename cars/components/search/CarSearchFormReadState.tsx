import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import { formatAsDisplayDate, SEARCH_DATE_FORMAT } from 'helpers/dajjsUtils';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import useQuery from 'hooks/pageInteraction/useQuery';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';

import LocationPin from 'public/icons/assets/location-pin.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';

interface CarSearchFormReadStateProps {
  setIsSearching?: (isReading: boolean) => void;
  log?: (message: string) => void;
}

const Divider = () => (
  <div className="px-2">
    <div className="h-6 border-l border-dark-200" />
  </div>
);

const CarSearchFormReadState = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsSearching = (value: boolean) => {},
}: CarSearchFormReadStateProps) => {
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('cars');

  const editLabel = tg('edit', 'Edit');
  const toLabel = tg('to', 'to');
  const guestLabel = tg('guest', 'Guest');
  const guestsLabel = tg('guests', 'Guests');
  const roomLabel = tg('room', 'Room');
  const roomsLabel = tg('rooms', 'Rooms');

  const {
    startDate: startDateQuery,
    endDate: endDateQuery,
    startTime,
    endTime,
    address,
    address2,
  } = useQuery();

  const location = `${address ? address?.toString().split(',')[0] : ''} - ${
    address2 ? address2?.toString().split(',')[0] : ''
  }`;

  const startDate = dayjs(startDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );
  const endDate = dayjs(endDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );

  const formattedStartDate = startDateQuery
    ? formatAsDisplayDate(startDate)
    : '-';
  const formattedEndDate = endDateQuery ? formatAsDisplayDate(endDate) : '-';

  const LocationSection = () => <span>{location}</span>;

  const DatesSection = () => (
    <section>
      <span>
        {fromLowerCaseToCapitilize(formattedStartDate)} {startTime}
      </span>
      <span> {toLabel} </span>
      <span>
        {fromLowerCaseToCapitilize(formattedEndDate)} {endTime}
      </span>
    </section>
  );

  const LocationAndDatesSection = () => (
    <section className="grid gap-2 font-normal text-dark-1000">
      <section className="flex gap-2">
        <section className="grid w-6 place-items-center">
          <LocationPin className="text-primary-1000" />
        </section>
        <LocationSection />
      </section>
      <section className="flex gap-2">
        <section className="grid w-6 place-items-center">
          <CalendarIcon className="text-primary-1000" />
        </section>
        <DatesSection />
      </section>
    </section>
  );

  const handleSearchClick = () => {
    setIsSearching(true);
  };
  return (
    <section className="z-0 flex items-center justify-between px-4 text-sm font-lato">
      <section className="flex flex-col w-[90%]">
        <LocationAndDatesSection />
      </section>
      <section className="flex items-center justify-center w-[25%]">
        <Button
          value={editLabel}
          translationKey="edit"
          type="contained"
          className="text-[14px] leading-[14px]"
          size="full-sm"
          onClick={handleSearchClick}
        />
      </section>
    </section>
  );
};

export default CarSearchFormReadState;
