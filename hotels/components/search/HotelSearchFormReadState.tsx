import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import {
  formatAsDisplayDate,
  NEW_SEARCH_DATE_FORMAT,
} from 'helpers/dajjsUtils';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import useQuery from 'hooks/pageInteraction/useQuery';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import { decodeAddressQueryParam } from 'hotels/helpers/urlHelper';

import LocationPin from 'public/icons/assets/location-pin_small.svg';
import CalendarIcon from 'public/icons/assets/calendar_small.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons-small.svg';
import SearchIcon from 'public/icons/assets/search_small.svg';

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
  const roomLabel = tg('room', 'Room');
  const roomsLabel = tg('rooms', 'Rooms');

  const {
    startDate: startDateQuery,
    endDate: endDateQuery,
    adults: adultsQuery,
    children: childrenQuery,
    rooms,
    address,
  } = useQuery();

  const adults = parseInt((adultsQuery && adultsQuery[0]) || '0');
  const children = parseInt((childrenQuery && childrenQuery[0]) || '0');
  const guests = adults + children;

  const startDate = dayjs(startDateQuery as unknown as string).format(
    NEW_SEARCH_DATE_FORMAT,
  );
  const endDate = dayjs(endDateQuery as unknown as string).format(
    NEW_SEARCH_DATE_FORMAT,
  );

  const GUEST_TEXT = usePlural(
    (adults as unknown as number) ?? 0,
    guestLabel,
    guestsLabel,
  );

  const ROOM_TEXT = usePlural(
    parseInt((rooms && rooms[0]) || '0'),
    roomLabel,
    roomsLabel,
  );

  const formattedStartDate = startDateQuery ? startDate : '-';
  const formattedEndDate = endDateQuery ? endDate : '-';
  const HotelAdress =
    address
      ?.toString()
      .split(', ')
      .map((item) => decodeAddressQueryParam(item))
      .join(', ') || '';

  const LocationSection = () => (
    <span className="text-xs">{`Hotels in ${HotelAdress.split(
      ',',
    )[0].trim()}`}</span>
  );

  const OccupancySection = () => (
    <section className="flex flex-row gap-1 text-xs">
      <span>{guests ?? ' - '} </span>
      <span>{GUEST_TEXT} </span>
    </section>
  );

  const DatesSection = () => (
    <section className="text-xs">
      <span>{fromLowerCaseToCapitilize(formattedStartDate)}</span>
      <span> {toLabel} </span>
      <span>{fromLowerCaseToCapitilize(formattedEndDate)}</span>
    </section>
  );

  const OccupancyAndDatesSection = () => (
    <section className="grid gap-2 font-normal text-dark-1000">
      <section className="flex gap-2">
        <section className="grid w-6 place-items-center">
          <LocationPin />
        </section>
        <LocationSection />
      </section>
      <section className="flex gap-2">
        <section className="grid w-6 place-items-center">
          <MultiplePersonsIcon />
        </section>
        <OccupancySection />
        <section className="grid w-6 place-items-center">
          <CalendarIcon />
        </section>
        <DatesSection />
      </section>
    </section>
  );

  const handleSearchClick = () => {
    setIsSearching(true);
  };
  return (
    <section className="z-0 flex items-centers justify-between px-4 text-sm font-lato">
      <section className="flex flex-col w-[90%]">
        <OccupancyAndDatesSection />
      </section>
      <section className="flex items-center justify-center w-[25%]">
        <section onClick={handleSearchClick}>
          <SearchIcon className="text-primary-1000" />
        </section>
      </section>
    </section>
  );
};

export default HotelSearchFormReadState;
