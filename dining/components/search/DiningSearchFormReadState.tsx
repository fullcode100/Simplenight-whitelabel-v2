import React from 'react';
import dayjs from 'dayjs';

import Button from 'components/global/Button/Button';
import LocationPin from 'public/icons/assets/location-pin.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import { useTranslation } from 'react-i18next';
import { formatAsDisplayDate, SEARCH_DATE_FORMAT } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';

interface DiningSearchFormReadStateProps {
  setIsSearching?: (isReading: boolean) => void;
  log?: (message: string) => void;
}

const DiningSearchFormReadState = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsSearching = (value: boolean) => {},
}: DiningSearchFormReadStateProps) => {
  const [tg, i18g] = useTranslation('global');
  const { startDate: startDateQuery, address } = useQuery();
  const startDate = dayjs(startDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );
  const formattedStartDate = startDateQuery
    ? formatAsDisplayDate(startDate)
    : '-';
  const editLabel = tg('edit', 'Edit');
  const location = address?.toString().split(',')[0];
  const LocationSection = () => <span>{location}</span>;

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

  const DatesSection = () => (
    <section>
      <span>{fromLowerCaseToCapitilize(formattedStartDate)}</span>
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

export default DiningSearchFormReadState;
