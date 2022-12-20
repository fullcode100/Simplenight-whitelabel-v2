import React, { FC } from 'react';
import {
  Parking,
  RateTables,
} from '../../types/response/ParkingSearchResponse';
import { Container } from './Container';
import DollarSignIcon from '@/icons/assets/location-pin.svg';
import ClockIcon from '@/icons/assets/clock.svg';
import { DetailSectionItem } from './DetailSectionItem';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);

interface ParkingDetailProps {
  parking: Parking;
}

export const ParkingDetailPricesAndWorkHours: FC<ParkingDetailProps> = ({
  parking,
}) => {
  return (
    <section>
      <Container>
        <section className="flex flex-col lg:flex-row items-stretch gap-8">
          <section className="grow basis-0">
            <ParkingDetailOpeningHours parking={parking} />
          </section>

          <div className="hidden lg:block w-px bg-dark-200" />
          <hr className="inline lg:hidden" />

          <section className="grow basis-0">
            <ParkingDetailPrices parking={parking} />
          </section>
        </section>
      </Container>
    </section>
  );
};

const ParkingDetailOpeningHours: FC<ParkingDetailProps> = ({ parking }) => {
  const [t] = useTranslation('parking');
  const openingList = parking.properties.static.times?.open;
  const openingMap = new Map<string, string>();
  const timezone = parking.properties.static.timezone;
  const firstDay = dayjs.tz(dayjs(), timezone).startOf('weeks');

  openingList?.forEach((list) => {
    const openTime = dayjs()
      .set('hours', parseInt(list.from.substring(0, 2)))
      .set('minutes', parseInt(list.from.substring(2, 4)));

    const closeTime = dayjs()
      .set('hours', parseInt(list.to.substring(0, 2)))
      .set('minutes', parseInt(list.to.substring(2, 4)));

    const openTimeFormatted = openTime.format('hh:mm a');
    const closeTimeFormatted = closeTime.format('hh:mm a');

    const isSame = openTimeFormatted === closeTimeFormatted;

    const val = `${openTimeFormatted} - ${closeTimeFormatted}`;
    list.days.forEach((day) => {
      openingMap.set(day, isSame ? t('allDay') : val);
    });
  });

  const days = Array(7)
    .fill(0)
    .map((_, i) => {
      const dayName = firstDay.add(i, 'days').format('ddd').toUpperCase();
      return {
        dayName,
        hoursFormatted: openingMap.get(dayName) || '',
      };
    });

  return (
    <DetailSectionItem title={t('openingTimes')} icon={<ClockIcon />}>
      <section className="flex flex-col items-stretch gap-2">
        {days.map((day, index) => (
          <section
            key={`open-time-${index}`}
            className="flex justify-between text-dark-1000 text-lg"
          >
            <span>{t(day.dayName)}</span>
            <span>{day.hoursFormatted}</span>
          </section>
        ))}
      </section>
    </DetailSectionItem>
  );
};

const ParkingDetailPrices: FC<ParkingDetailProps> = ({ parking }) => {
  const [t] = useTranslation('parking');
  const rateTables = parking.properties.static.rate_tables;

  return (
    <DetailSectionItem title={t('prices')} icon={<DollarSignIcon />}>
      {rateTables && <Pricing rateTables={rateTables} />}
      {/*   TODO: Show not price details status */}
    </DetailSectionItem>
  );
};

interface PricingProps {
  rateTables: RateTables;
}

const Pricing: FC<PricingProps> = ({ rateTables }) => {
  const [t] = useTranslation('parking');
  const {
    rate_table: rateTable,
    currency_code: currencyCode,
    currency,
  } = rateTables;

  const defaultRates = rateTable.find((rate) => rate.eligibility === 'DEFAULT');
  return (
    <section className="flex flex-col items-stretch gap-2">
      {!!defaultRates?.rates &&
        defaultRates.rates.map((rate, index) => {
          const isFree = rate.price === 0;

          if (rate.type === 'DURATION') {
            const duration = dayjs.duration(rate.value);
            const asHours = duration.asHours();
            const asMinutes = duration.asMinutes();
            return (
              <section
                key={`rate-${index}`}
                className="flex justify-between text-dark-1000 text-lg"
              >
                {asHours === 1 ? (
                  <span>
                    {asHours} <small>{t('hour')}</small>
                  </span>
                ) : asHours > 1 ? (
                  <span>
                    {asHours} <small>{t('hours')}</small>
                  </span>
                ) : (
                  <span>
                    {asMinutes} <small>{t('minutes')}</small>
                  </span>
                )}
                {isFree ? (
                  <span>{t('free')}</span>
                ) : (
                  <span>
                    {currency || currencyCode}
                    {rate.price.toFixed(2)}
                  </span>
                )}
              </section>
            );
          }
          return (
            <section
              key={`rate-${index}`}
              className="flex justify-between text-dark-1000 text-lg"
            >
              <span>{t(rate.value)}</span>
              {isFree ? (
                <span>{t('free')}</span>
              ) : (
                <span>
                  {currency || currencyCode}
                  {rate.price.toFixed(2)}
                </span>
              )}
            </section>
          );
        })}
    </section>
  );
};
