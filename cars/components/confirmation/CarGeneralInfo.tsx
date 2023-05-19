/* eslint-disable */
import React, { useState } from 'react';
import { Item } from 'types/booking/bookingType';
import { useTranslation } from 'react-i18next';
import { formatAsDisplayDatetime } from 'helpers/dajjsUtils';
import IconLocation from 'public/icons/assets/cars/location2.svg';
import IconCalendar from 'public/icons/assets/cars/calendar.svg';
import { Paragraph } from '@simplenight/ui';
import CarCustomerInfo from './CarCustomerInfo';

interface CarGeneralInfoProps {
  item?: Item;
}

const CarGeneralInfo = ({ item }: CarGeneralInfoProps) => {
  const [t, i18next] = useTranslation('cars');
  const pickupLabel = t('pickup', 'Pick-Up');
  const dropoffLabel = t('dropoff', 'Drop-Off');

  return (
    <section className="w-full">
      <section className="flex flex-row w-full">
        <section className="flex flex-col w-[50%] gap-4">
          <section className="pl-6">
            <Paragraph
              size="small"
              textColor="text-dark-700"
              fontWeight="semibold"
            >
              {pickupLabel}
            </Paragraph>
          </section>
          <section className="flex items-center">
            <IconCalendar className="text-primary-1000 mr-2" />
            <Paragraph size="small" fontWeight="semibold">
              {formatAsDisplayDatetime(
                item?.booking_data?.start_date as string,
              )}
            </Paragraph>
          </section>
          <section className="flex items-center">
            <IconLocation className="text-primary-1000 mr-2" />
            <Paragraph size="small" fontWeight="semibold">
              {item?.booking_data?.pickup_name}
            </Paragraph>
          </section>
        </section>
        <section className="flex flex-col w-[50%] gap-4">
          <section>
            <Paragraph
              size="small"
              textColor="text-dark-700"
              fontWeight="semibold"
            >
              {dropoffLabel}
            </Paragraph>
          </section>
          <section className="flex items-center">
            <IconCalendar className="text-primary-1000 mr-2" />
            <Paragraph size="small" fontWeight="semibold">
              {formatAsDisplayDatetime(item?.booking_data?.end_date as string)}
            </Paragraph>
          </section>
          <section className="flex items-center">
            <IconLocation className="text-primary-1000 mr-2" />
            <Paragraph size="small" fontWeight="semibold">
              {item?.booking_data?.return_name}
            </Paragraph>
          </section>
        </section>
      </section>
      <section className="w-full">
        <CarCustomerInfo item={item} />
      </section>
    </section>
  );
};

export default CarGeneralInfo;
