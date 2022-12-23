import React, { FC, ReactNode } from 'react';
import { Item } from '../../../types/cart/CartType';
import CarRightIcon from '@/icons/assets/car-right.svg';
import CarLeftIcon from '@/icons/assets/car-left.svg';
import LocationPinIcon from '@/icons/assets/location-pin.svg';
import ClockIcon from '@/icons/assets/clock.svg';
import PlusIcon from '@/icons/assets/plusIcon.svg';
import Divider from '../../../components/global/Divider/Divider';
import { Parking } from '../../types/response/ParkingSearchResponse';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);

interface ParkingItineraryBodyProps {
  item: Item;
}

export const ParkingItineraryBody: FC<ParkingItineraryBodyProps> = ({
  item,
}) => {
  const [t] = useTranslation('parking');
  const bookingData = item.booking_data;
  const parking: Parking = bookingData?.parking;
  const location = parking.properties.static.address.street.formatted;

  const staticDetails = parking.properties.static;
  const currencyCode = staticDetails.rate_tables?.currency_code;
  const currency = staticDetails.rate_tables?.currency;
  const isCurrencyAndCodeSame = currencyCode === currency;
  const price = 0;
  const timezone = parking.properties.static.timezone;

  const startDate = dayjs(
    `${bookingData?.start_date} ${bookingData?.start_time}`,
    'YYYY-MM-DD HHmm',
  );
  const endDate = dayjs(
    `${bookingData?.end_date} ${bookingData?.end_time}`,
    'YYYY-MM-DD HHmm',
  );
  const duration = dayjs.duration(endDate.diff(startDate)).asHours();

  return (
    <section>
      <section className="flex flex-col gap-3 py-4 px-4">
        <FeatureItem
          icon={<CarRightIcon className="w-6 text-primary-1000 mx-2" />}
          label={startDate.tz(timezone).toString()}
        />
        <FeatureItem
          icon={<LocationPinIcon className="w-6 text-primary-1000 mx-2" />}
          label={location}
        />
        <FeatureItem
          icon={<CarLeftIcon className="w-6 text-primary-1000 mx-2" />}
          label={endDate.tz(timezone).toString()}
        />
        <FeatureItem
          icon={<ClockIcon className="w-6 text-primary-1000 mx-2" />}
          label={`${duration} ${t(duration === 1 ? 'hour' : 'hours')}`}
        />
      </section>

      <Divider />

      <section className="flex flex-col gap-6 py-4 px-4">
        <section className="flex flex-col gap-2">
          <section className="flex justify-between items-center">
            <section className="flex items-center gap-2">
              <section className="text-primary-1000">
                <PlusIcon />
              </section>
              <span>Base Price</span>
            </section>
            <section>
              {isCurrencyAndCodeSame
                ? `${currencyCode} `
                : `${currencyCode}${currency}`}
              {price.toFixed(2)}
            </section>
          </section>
          <Divider />
        </section>

        <section>
          <p className="text-[16px] font-semibold underline text-primary-1000 hover:text-primary-600 cursor-pointer">
            [SUPPLIER] Terms Of Service
          </p>
        </section>
      </section>
    </section>
  );
};

const FeatureItem: FC<{ icon: ReactNode; label: string }> = ({
  icon,
  label,
}) => {
  return (
    <section className="flex flex-row">
      {icon}
      <section className="flex items-center font-semibold text-dark-1000 text-[14px] leading-[18px]">
        {label}
      </section>
    </section>
  );
};
