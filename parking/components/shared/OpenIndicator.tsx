import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import TimeIcon from '@/icons/assets/clock.svg';
import { Parking } from '../../types/response/ParkingSearchResponse';
import { Highlighted } from '../../../components/global/Highlighted/Highlighted';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

interface OpenIndicatorProps {
  parking: Parking;
}

export const OpenIndicator: FC<OpenIndicatorProps> = ({ parking }) => {
  const [t] = useTranslation('parking');
  const times = parking.properties.static.times;

  if (!times) {
    const restrictionsList = parking.properties.static.restrictions?.find(
      (item) => item === 'EVENTS_ONLY',
    );

    if (!restrictionsList) return null;

    return (
      <section className="flex items-center gap-2">
        <Highlighted color="warning">
          <TimeIcon />
          <span>{t('EVENTS_ONLY')}</span>
        </Highlighted>
      </section>
    );
  }

  const now = dayjs().tz(parking.properties.static.timezone);
  const today = now.format('ddd').toUpperCase();
  const match = times.open.find((i) => i.days.includes(today))!;

  const openTime = now
    .set('hours', parseInt(match.from.substring(0, 2)))
    .set('minutes', parseInt(match.from.substring(2, 4)));

  const closeTime = now
    .set('hours', parseInt(match.to.substring(0, 2)))
    .set('minutes', parseInt(match.to.substring(2, 4)));

  const isOpen = now.isBetween(openTime, closeTime);

  const TIME_FORMAT = 'hh:mm a';
  const openTimeFormatted = openTime.format(TIME_FORMAT);
  const closeTimeFormatted = closeTime.format(TIME_FORMAT);
  const alwaysOpen = openTimeFormatted === closeTimeFormatted;

  return (
    <section className="flex items-center gap-2">
      <Highlighted color={isOpen ? 'success' : 'danger'}>
        <TimeIcon />
        <span>{t(isOpen ? 'open' : 'closed')}</span>
      </Highlighted>

      <section className="text-dark-700">
        {alwaysOpen
          ? t('alwaysOpen')
          : `${openTimeFormatted} - ${closeTimeFormatted}`}
      </section>
    </section>
  );
};
