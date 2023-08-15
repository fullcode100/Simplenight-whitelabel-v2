import React from 'react';
import dayjs from 'dayjs';

import CalendarIcon from 'public/icons/assets/calendar.svg';
import SearchIcon from 'public/icons/assets/search_small.svg';
import { useTranslation } from 'react-i18next';
import { NEW_SEARCH_DATE_FORMAT } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';

interface DiningSearchFormReadStateProps {
  setIsSearching?: (isReading: boolean) => void;
  log?: (message: string) => void;
}

const DiningSearchFormReadState = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsSearching = (value: boolean) => {},
}: DiningSearchFormReadStateProps) => {
  const [tg] = useTranslation('global');
  const { startDate: startDateQuery, address, keyword } = useQuery();
  const startDate = dayjs(startDateQuery as unknown as string).format(
    NEW_SEARCH_DATE_FORMAT,
  );
  // const formattedStartDate = startDateQuery
  //   ? formatAsDisplayDate(startDate)
  //   : '-';
  const editLabel = tg('edit', 'Edit');
  const location = decodeURIComponent(address?.toString().split(', ')[0] || '');
  const LocationSection = () => (
    <p>
      {keyword && <span>{keyword} in </span>}
      <span className="font-semibold">{location}</span>
    </p>
  );

  const LocationAndDatesSection = () => (
    <section className="grid gap-2 font-normal text-dark-1000">
      <section className="flex gap-2">
        <section className="grid w-5 place-items-center">
          <CategoryIcon
            categoryName="dining"
            className="w-3 h-3 text-primary-1000"
          />
        </section>
        <LocationSection />
      </section>
      <section className="flex gap-2">
        <section className="grid w-5 place-items-center">
          <CalendarIcon className="w-3 h-3 text-primary-1000" />
        </section>
        <DatesSection />
      </section>
    </section>
  );

  const DatesSection = () => (
    <section>
      <span>{startDate}</span>
    </section>
  );

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  return (
    <section className="z-0 flex items-center justify-between px-4 text-p-xxs font-lato">
      <section className="flex flex-col w-[90%]">
        <LocationAndDatesSection />
      </section>
      <section className="flex items-center justify-center w-[25%]">
        <section onClick={handleSearchClick} className="cursor-pointer">
          <SearchIcon className="text-primary-1000" />
        </section>
      </section>
    </section>
  );
};

export default DiningSearchFormReadState;
