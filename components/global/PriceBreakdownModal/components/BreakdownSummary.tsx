import React from 'react';
import PriceDisplay from 'components/global/PriceDisplay/PriceDisplay';
import { Rate } from '../../../../hotels/types/response/SearchResponse';
import { useTranslation } from 'react-i18next';

interface BreakdownSummaryProps {
  rate: Rate;
  nights?: number;
  guests?: number;
  CustomPriceBreakdown?: React.ReactElement;
}

const BreakdownSummary = ({
  rate,
  nights = 0,
  guests = 0,
  CustomPriceBreakdown,
}: BreakdownSummaryProps) => {
  const [tg] = useTranslation('global');
  const [t] = useTranslation('hotels');
  const includesTaxesAndFeesText = t(
    'includesTaxesAndFees',
    'Includes Taxes And Fees',
  );
  const tGuest = tg('guests', 'Guests');
  const tGuests = tg('guests', 'Guests');
  const GUEST_TEXT = guests === 1 ? tGuest : tGuests;
  const tNight = tg('night', 'Night');
  const tNights = tg('nights', 'Nights');
  const NIGHT_TEXT = nights === 1 ? tNight : tNights;
  return (
    <section className="flex justify-between items-center">
      <section className="text-sm text-dark-1000">
        <p>
          {nights} {NIGHT_TEXT}
        </p>
        <p>
          {guests} {GUEST_TEXT}
        </p>
      </section>
      <section className="text-right">
        <PriceDisplay rate={rate} />
        <p className="text-dark-800 text-xs">{includesTaxesAndFeesText}</p>
        {CustomPriceBreakdown && <>{CustomPriceBreakdown}</>}
      </section>
    </section>
  );
};

export default BreakdownSummary;
