/* eslint-disable */
import React, { useState } from 'react';
import { Item } from 'types/cart/CartType';
import { useTranslation } from 'react-i18next';
import { formatAsDisplayDate } from 'helpers/dajjsUtils';
import IconLocation from 'public/icons/assets/cars/location2.svg';
import IconCalendar from 'public/icons/assets/cars/calendar.svg';

interface CarGeneralInfoProps {
  item?: Item;
}

const CarGeneralInfo = ({ item }: CarGeneralInfoProps) => {
  const [t, i18next] = useTranslation('cars');
  const daysLabel = t('days', 'Day(s)');
  const pickupLabel = t('pickup', 'Pick-Up');
  const dropoffLabel = t('dropoff', 'Drop-Off');
  const address = item?.booking_data?.car.Info.LocationDetails
    ? `${item?.booking_data?.car.Info.LocationDetails['@Name']}, ${item?.booking_data?.car.Info.LocationDetails.Address.AddressLine}`
    : '';

  return (
    <section className="flex flex-col gap-2">

      <section className="flex flex-row my-2">
        <IconCalendar className="text-primary-1000 mx-2" />
        <section className="flex flex-col">
          <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
            {pickupLabel}
          </section>
          <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
            {formatAsDisplayDate(item?.booking_data?.search?.start_date as string)} ({item?.booking_data?.search?.start_time})
          </section>
        </section>
      </section>

      <section className="flex flex-row my-2">
        <IconCalendar className="text-primary-1000 mx-2" />
        <section className="flex flex-col">
          <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
            {dropoffLabel}
          </section>
          <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
            {formatAsDisplayDate(item?.booking_data?.search?.end_date as string)} ({item?.booking_data?.search?.end_time})
          </section>
        </section>
      </section>

      <section className="flex flex-row my-2">
        <IconLocation className="text-primary-1000 mx-2" />
        <section className="flex flex-col">
          <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
            {address}
          </section>
        </section>
      </section>

    </section>
  );
};

export default CarGeneralInfo;
