// Libraries
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Amount } from 'types/global/Amount';

type CheckoutSummaryProps = {
  amount: Amount;
  href?: string;
  nights?: number;
  guests?: number;
};

const CheckoutSummary = ({
  amount,
  href = '#',
  nights = 0,
  guests = 0,
}: CheckoutSummaryProps) => {
  const [t] = useTranslation('hotels');
  const [tg] = useTranslation('global');
  const tGuest = tg('guest', 'Guest');
  const tGuests = tg('guests', 'Guests');
  const GUEST_TEXT = guests === 1 ? tGuest : tGuests;
  const tNight = tg('night', 'Night');
  const tNights = tg('nights', 'Nights');
  const NIGHT_TEXT = nights === 1 ? tNight : tNights;
  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  return (
    <section className="flex w-full items-center justify-between">
      <section>
        <p>
          {nights} {NIGHT_TEXT}
        </p>
        <p>
          {guests} {GUEST_TEXT}
        </p>
      </section>
      <section className="flex flex-col justify-end font-lato text-right">
        <p className="text-[18px] leading-6 font-bold text-dark-1000">
          {amount?.formatted}
        </p>
        <p className="text-[14px] leading-5 text-dark-800">
          Includes Taxes and Fees
        </p>
        <a
          className="text-base leading-[22px] font-semibold underline text-primary-1000 hover:text-primary-1000 hover:underline"
          href={href}
        >
          {priceBreakdownText}
        </a>
      </section>
    </section>
  );
};

export default CheckoutSummary;
