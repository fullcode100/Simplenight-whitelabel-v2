import React from 'react';
import Divider from 'components/global/Divider/Divider';
import PlusIcon from 'public/icons/assets/Plus.svg';
import { useTranslation } from 'react-i18next';
import ThingItineraryPriceBreakdown from './ThingItineraryPriceBreakdown';
import { Paragraph } from '@simplenight/ui';

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
      <section className="flex items-start justify-between">
        <section className="flex items-center gap-2 text-sm capitalize">
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
          <Paragraph size="small" className="capitalize">
            {payNowLabel}
          </Paragraph>
          <Paragraph size="small" fontWeight="semibold">
            {formattedTotalAmount}
          </Paragraph>
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
      <div>
        <Paragraph size="small" textColor="text-dark-700">
          {cancellationPolicyLabel}
        </Paragraph>
        <Paragraph size="small">{cancellationPolicy?.description}</Paragraph>
        {cutoffFlag && (
          <Paragraph size="small" textColor="text-dark-700">
            {cutoffFlag.description}
          </Paragraph>
        )}
        {weatherFlag && (
          <Paragraph size="small">{weatherFlag.description}</Paragraph>
        )}
        {insufficientTravelersFlag && (
          <Paragraph size="small">
            {insufficientTravelersFlag.description}
          </Paragraph>
        )}
      </div>
    );
  };
  return (
    <>
      <Divider />
      <section className="flex flex-col gap-3 px-4 py-4 text-dark-1000">
        <Paragraph
          size="medium"
          className="capitalize"
          fontWeight="semibold"
        >{`${quantity}x ${ticketName}`}</Paragraph>
        <FeesSection />
        <PoliciesSection />
      </section>
    </>
  );
};

export default ThingTicketsInfo;
