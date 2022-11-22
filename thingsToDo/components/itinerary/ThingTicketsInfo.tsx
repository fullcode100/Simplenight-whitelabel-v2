import React from 'react';
import Divider from 'components/global/Divider/Divider';
import PlusIcon from 'public/icons/assets/Plus.svg';
import { useTranslation } from 'react-i18next';
import ThingItineraryPriceBreakdown from './ThingItineraryPriceBreakdown';

const ThingTicketsInfo = ({ item }: any) => {
  const {
    booking_data: { ticket_types: paxes },
    quantity,
    rate: { total: totalAmount, discounts },
    item_data: {
      extra_data: {
        tickets: [
          {
            name: ticketName,
            ticket_types: [{ cancellation_policy: cancellationPolicy }],
          },
        ],
      },
    },
  } = item;

  interface Pax {
    age_band: 'ADULT' | 'SENIOR' | 'YOUTH' | 'CHILD' | 'INFANT' | 'TRAVELER';
    age_band_label: string;
    quantity: number;
  }
  const FeesRow = ({ priceBreakdown, label }: any) => {
    return (
      <section className="flex justify-between items-start">
        <section className="text-sm flex items-center gap-2 capitalize">
          <PlusIcon className={'text-primary-1000 h-4 w-4 '} />
          {label}
        </section>
        {priceBreakdown}
      </section>
    );
  };

  const FeesSection = () => {
    const [g] = useTranslation('global');
    const payNowLabel = g('payNow', 'Pay Now');
    const formattedTotalAmount = totalAmount.full.formatted;
    const hasDiscount =
      discounts.total_amount_before_apply.amount > totalAmount.full.amount;
    const formattedDiscount = discounts.percentage_to_apply;
    const formattedAmountBeforeApply =
      discounts.total_amount_before_apply.formatted;

    let paxesLabel = '';
    paxes.forEach((pax: Pax, idx: number) => {
      paxesLabel += `${pax.quantity} ${pax.age_band_label}${
        idx < paxes.length - 1 ? ',' : ''
      } `;
    });
    return (
      <>
        <FeesRow
          label={paxesLabel}
          priceBreakdown={
            <ThingItineraryPriceBreakdown
              totalAmount={formattedTotalAmount}
              discount={hasDiscount && formattedDiscount}
              amountBeforeDiscount={hasDiscount && formattedAmountBeforeApply}
            />
          }
        />
        <Divider />
        <div className="flex justify-between text-dark-1000">
          <p className="text-sm capitalize ">{payNowLabel}</p>
          <p className=" text-dark-1000text-sm font-semibold">
            {formattedTotalAmount}
          </p>
        </div>
      </>
    );
  };

  const PoliciesSection = () => {
    const [t] = useTranslation('things');
    const CUTOFF_FLAG_ID = 'CUT_OFF_TIMES_LOCAL_BASED';
    const WEATHER_FLAG_ID = 'CANCEL_IF_BAD_WEATHER';
    const INSUFFICIENT_TRAVELERS_FLAG_ID = 'CANCEL_IF_INSUFFICIENT_TRAVELERS';

    const cutoffFlag = cancellationPolicy.flags.find(
      (flag: any) => flag.flag_id === CUTOFF_FLAG_ID,
    );
    const weatherFlag = cancellationPolicy.flags.find(
      (flag: any) => flag.flag_id === WEATHER_FLAG_ID,
    );
    const insufficientTravelersFlag = cancellationPolicy.flags.find(
      (flag: any) => flag.flag_id === INSUFFICIENT_TRAVELERS_FLAG_ID,
    );

    const cancellationPolicyLabel = t(
      'cancellationPolicy',
      'Cancellation Policy',
    );

    return (
      <div className="text-sm ">
        <h4 className="text-sm  text-dark-700 font-normal">
          {cancellationPolicyLabel}
        </h4>
        <p>{cancellationPolicy.description}</p>
        {cutoffFlag && (
          <p className="text-sm  text-dark-700">{cutoffFlag.description}</p>
        )}
        {weatherFlag && <p className="text-sm ">{weatherFlag.description}</p>}
        {insufficientTravelersFlag && (
          <p className="text-sm ">{insufficientTravelersFlag.description}</p>
        )}
      </div>
    );
  };
  return (
    <>
      <Divider />
      <section className="flex flex-col gap-3 py-4 px-4 text-dark-1000">
        <h3 className="text-base capitalize">
          {quantity}x {ticketName}
        </h3>
        <FeesSection />
        <PoliciesSection />
      </section>
    </>
  );
};

export default ThingTicketsInfo;
