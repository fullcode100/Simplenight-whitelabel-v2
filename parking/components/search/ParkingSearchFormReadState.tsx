import React, { FC } from 'react';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import Button from '../../../components/global/Button/Button';
import { formatAsDisplayDatetime } from '../../../helpers/dajjsUtils';
import { useTranslation } from 'react-i18next';

import LocationPin from '@/icons/assets/location-pin.svg';
import CarLeft from '@/icons/assets/car-left.svg';
import CarRight from '@/icons/assets/car-right.svg';

interface ParkingSearchFormReadStateProps {
  setIsSearching?: (isReading: boolean) => void;
}

export const ParkingSearchFormReadState: FC<ParkingSearchFormReadStateProps> = (
  props,
) => {
  const [tg] = useTranslation('global');

  const handleEditMode = () => {
    props.setIsSearching?.(true);
  };

  const {
    startDate: startDateQuery,
    startTime: startTimeQuery,
    endDate: endDateQuery,
    endTime: endTimeQuery,
    address,
  } = useQuery();
  const startDate = formatAsDisplayDatetime(
    `${startDateQuery} ${startTimeQuery}`,
  );
  const endDate = formatAsDisplayDatetime(`${endDateQuery} ${endTimeQuery}`);

  const Summary: FC = () => {
    return (
      <section className="grid gap-2 font-normal text-dark-1000">
        <section className="flex gap-2 min-w-0">
          <section className="grid w-6 place-items-center shrink-0">
            <LocationPin className="text-primary-1000" />
          </section>
          <span className="truncate ...">
            {decodeURIComponent(address?.toString().split(', ')[0] || '')}
          </span>
        </section>
        <section className="flex gap-2">
          <section className="grid w-6 place-items-center">
            <CarRight className="text-primary-1000" />
          </section>
          <section>
            <span>{fromLowerCaseToCapitilize(startDate)}</span>
          </section>
        </section>
        <section className="flex gap-2">
          <section className="grid w-6 place-items-center">
            <CarLeft className="text-primary-1000" />
          </section>
          <section>
            <span>{fromLowerCaseToCapitilize(endDate)}</span>
          </section>
        </section>
      </section>
    );
  };

  return (
    <section className="z-0 flex items-center justify-between px-4 text-sm font-lato">
      <section className="flex flex-col w-[90%]">
        <Summary />
      </section>
      <section className="flewx items-center justify-center w-[25%]">
        <Button
          value={tg('edit', 'Edit')}
          translationKey="edit"
          type="contained"
          className="text-[14px] leading-[14px]"
          size="full-sm"
          onClick={handleEditMode}
        />
      </section>
    </section>
  );
};
