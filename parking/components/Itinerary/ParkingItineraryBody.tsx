import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react';
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
import classNames from 'classnames';
import TrashIcon from '@/icons/assets/small-trash.svg';
import Button from '../../../components/global/Button/Button';
import { removeFromCart } from '../../../core/client/services/CartClientService';
import { useRouter } from 'next/router';

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);

interface ParkingItineraryBodyProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  breakdown?: boolean;
}

export const ParkingItineraryBody: FC<ParkingItineraryBodyProps> = ({
  item,
  reload,
  setReload,
  breakdown = false,
}) => {
  const [tg, i18g] = useTranslation('global');
  const [t] = useTranslation('parking');
  const router = useRouter();

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
  const removeParkingFromShoppingCart = () => {
    const flightToRemove = {
      cartId: item.cart_id,
      itemId: item.cart_item_id,
    };
    removeFromCart(i18g, flightToRemove)
      .then(() => {
        setReload?.(!reload);
        router.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleRemoveAllFlights = () => {
    removeParkingFromShoppingCart();
  };

  return (
    <section>
      <section className="flex flex-col gap-3 px-4 py-4">
        <FeatureItem
          icon={<CarRightIcon className="w-6 mx-2 text-primary-1000" />}
          label={startDate.tz(timezone).toString()}
        />
        <FeatureItem
          icon={<LocationPinIcon className="w-6 mx-2 text-primary-1000" />}
          label={location}
        />
        <FeatureItem
          icon={<CarLeftIcon className="w-6 mx-2 text-primary-1000" />}
          label={endDate.tz(timezone).toString()}
        />
        <FeatureItem
          icon={<ClockIcon className="w-6 mx-2 text-primary-1000" />}
          label={`${duration} ${t(duration === 1 ? 'hour' : 'hours')}`}
        />
      </section>

      <section className={classNames({ 'px-4': breakdown })}>
        <Divider />
      </section>

      <section className="flex flex-col gap-6 px-4 py-4">
        <section className="flex flex-col gap-2">
          <section className="flex items-center justify-between">
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

        {breakdown ? (
          <section>
            <Button
              value={tg('remove')}
              size="full-sm"
              type="outlined"
              leftIcon={<TrashIcon />}
              onClick={handleRemoveAllFlights}
              className="w-full"
            />
          </section>
        ) : (
          <section>
            <p className="text-[16px] font-semibold underline text-primary-1000 hover:text-primary-600 cursor-pointer">
              [SUPPLIER] Terms Of Service
            </p>
          </section>
        )}
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
