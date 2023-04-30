/* eslint-disable */
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import { formatAsDisplayDate, SEARCH_DATE_FORMAT } from 'helpers/dajjsUtils';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import useQuery from 'hooks/pageInteraction/useQuery';

import LocationPin from 'public/icons/assets/location-pin.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';

interface FlightSearchFormReadStateProps {
  setIsSearching?: (isReading: boolean) => void;
  log?: (message: string) => void;
}

const Divider = () => (
  <div className="px-2">
    <div className="h-6 border-l border-dark-200" />
  </div>
);

const FlightSearchFormReadState = ({
  setIsSearching = (value: boolean) => {},
}: FlightSearchFormReadStateProps) => {
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('flights');

  const editLabel = tg('edit', 'Edit');
  const toLabel = tg('to', 'to');
  const guestLabel = th('traveler', 'Traveler');
  const guestsLabel = th('travelers', 'Travelers');

  const {
    direction,
    startDate: startDateQuery,
    endDate: endDateQuery,
    adults: adultsQuery,
    children: childrenQuery,
    infants: infantsQuery,
    rooms,
    address,
    address2,
    startDates,
    addresses,
    addresses2,
  } = useQuery();

  const location = `${address ? address?.toString().split(',')[0] : ''} - ${
    address2 ? address2?.toString().split(',')[0] : ''
  }`;
  const locations: string[] = [];
  if (direction === 'multicity' && addresses && addresses2) {
    const _addresses = addresses.toString().split('|');
    const _addresses2 = addresses2.toString().split('|');
    _addresses.forEach((addr: string, index: number) => {
      const _addr1 = _addresses[index].toString().split('(').pop();
      const airportCode1 = _addr1 ? _addr1.toString().split(')')[0] : '';
      const _addr2 = _addresses2[index].toString().split('(').pop();
      const airportCode2 = _addr2 ? _addr2.toString().split(')')[0] : '';
      locations.push(`${airportCode1} - ${airportCode2}`);
    });
  }
  const adults = parseInt((adultsQuery && adultsQuery[0]) || '1');
  const children = parseInt((childrenQuery && childrenQuery[0]) || '0');
  const infants = parseInt((infantsQuery && infantsQuery[0]) || '0');
  const guests = adults + children + infants;

  useEffect(() => {
    if (!address) setIsSearching(true);
  }, []);

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

  const formattedStartDate = startDateQuery
    ? formatAsDisplayDate(startDate)
    : '-';
  const formattedEndDate = endDateQuery ? formatAsDisplayDate(endDate) : '-';

  const LocationSection = () => <span>{location}</span>;

  const OccupancySection = () => (
    <section className="flex flex-row gap-1">
      <span>{guests ?? ' - '} </span>
      <span>{GUEST_TEXT} </span>
    </section>
  );

  const DatesSection = () =>
    direction === 'round_trip' ? (
      <section>
        <span>{formattedStartDate}</span>
        <span> {toLabel} </span>
        <span>{formattedEndDate}</span>
      </section>
    ) : (
      <section>
        <span>{formattedStartDate}</span>
      </section>
    );

  const OccupancyAndDatesSection = () => (
    <section className="grid gap-2 font-normal text-dark-1000">
      {direction === 'multicity' ? (
        <>
          {locations.map((_location: string, index: number) => (
            <section key={`location_label_${index}`}>
              <section className="flex gap-2">
                <section className="w-6 grid place-items-center">
                  <LocationPin className="text-primary-1000" />
                </section>
                <span>{_location}</span>
              </section>
              <section className="flex gap-2">
                <section className="w-6 grid place-items-center">
                  <CalendarIcon className="text-primary-1000" />
                </section>
                <section>
                  <span>
                    {startDates && startDates.toString().split('|')[index]
                      ? formatAsDisplayDate(
                          startDates.toString().split('|')[index],
                        )
                      : ''}
                  </span>
                </section>
              </section>
            </section>
          ))}
        </>
      ) : (
        <>
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
        </>
      )}
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
    <section className="flex font-lato items-center justify-between text-sm px-4 z-0 pb-4">
      <section className="flex flex-col w-[100%]">
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

export default FlightSearchFormReadState;
