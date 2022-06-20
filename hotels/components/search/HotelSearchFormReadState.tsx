import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import { formatAsDisplayDate, SEARCH_DATE_FORMAT } from 'helpers/dajjsUtils';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import useQuery from 'hooks/pageInteraction/useQuery';

import LocationPin from 'public/icons/assets/location-pin.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';

interface HotelSearchFormReadStateProps {
  setIsSearching?: (isReading: boolean) => void;
  log?: (message: string) => void;
}

const Divider = () => (
  <div className="px-2">
    <div className="h-6 border-l border-dark-200" />
  </div>
);

const HotelSearchFormReadState = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsSearching = (value: boolean) => {},
}: HotelSearchFormReadStateProps) => {
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('hotels');

  const editLabel = tg('edit', 'Edit');
  const toLabel = tg('to', 'to');
  const guestLabel = tg('guest', 'Guest');
  const guestsLabel = tg('guests', 'Guests');
  const roomLabel = th('room', 'Room');
  const roomsLabel = th('rooms', 'Rooms');

  const {
    startDate: startDateQuery,
    endDate: endDateQuery,
    adults: adultsQuery,
    children: childrenQuery,
    rooms,
    address,
  } = useQuery();

  const location = address?.toString().split(',')[0];

  const adults = parseInt((adultsQuery && adultsQuery[0]) || '0');
  const children = parseInt((childrenQuery && childrenQuery[0]) || '0');
  const guests = adults + children;

  const startDate = dayjs(startDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );
  const endDate = dayjs(endDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );

  const GUEST_TEXT = usePlural(
    (adults as unknown as number) ?? 0,
    guestLabel,
    guestsLabel,
  );

  const ROOM_TEXT = usePlural(
    (adults as unknown as number) ?? 0,
    roomLabel,
    roomsLabel,
  );

  const formattedStartDate = startDateQuery
    ? formatAsDisplayDate(startDate)
    : '-';
  const formattedEndDate = endDateQuery ? formatAsDisplayDate(endDate) : '-';

  const LocationSection = () => <span>{location}</span>;

  const OccupancySection = () => (
    <section className="flex flex-row gap-1">
      <span>{guests ?? ' - '} </span>
      <span>{GUEST_TEXT} </span>
      <Divider />
      <span>{rooms ?? ' - '}</span>
      <span>{ROOM_TEXT}</span>
    </section>
  );

  const DatesSection = () => (
    <section>
      <span>{formattedStartDate}</span>
      <span> {toLabel} </span>
      <span>{formattedEndDate}</span>
    </section>
  );

  const OccupancyAndDatesSection = () => (
    <section className="grid gap-2 font-normal text-dark-1000">
      <section className="flex gap-2">
        <section className="w-6 grid place-items-center">
          <LocationPin className="text-primary-1000" />
        </section>
        <LocationSection />
      </section>
      <section className="flex gap-2">
        <section className="w-6 grid place-items-center">
          <CalendarIcon className="text-primary-1000" />
        </section>
        <DatesSection />
      </section>
      <section className="flex gap-2">
        <section className="w-6 grid place-items-center">
          <MultiplePersonsIcon className="text-primary-1000" />
        </section>
        <OccupancySection />
      </section>
    </section>
  );

  const handleSearchClick = () => {
    setIsSearching(true);
  };
  return (
    <section className="flex font-lato items-center justify-between text-sm px-4 z-0">
      <section className="flex flex-col w-[90%]">
        <OccupancyAndDatesSection />
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

export default HotelSearchFormReadState;
