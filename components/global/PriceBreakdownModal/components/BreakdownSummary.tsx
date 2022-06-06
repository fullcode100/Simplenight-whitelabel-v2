import React from 'react';
import PriceDisplay from 'components/global/PriceDisplay/PriceDisplay';
import { Rate } from '../../../../hotels/types/response/SearchResponse';
import { useTranslation } from 'react-i18next';

interface BreakdownSummaryProps {
  rate: Rate;
}

const BreakdownSummary = ({ rate }: BreakdownSummaryProps) => {
  const [t] = useTranslation('hotels');
  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  const includesTaxesAndFeesText = t(
    'includesTaxesAndFees',
    'Includes Taxes And Fees',
  );
  const nightsText = t('nights', 'Nights');
  const guestsText = t('guests', 'Guests');
  return (
    <section className="flex justify-between items-center">
      <section className="text-sm text-dark-1000">
        <p>2 {nightsText}</p>
        <p>2 {guestsText}</p>
      </section>
      <section className="text-right">
        <PriceDisplay rate={rate} />
        <p className="text-dark-800 text-xs">{includesTaxesAndFeesText}</p>
        <button className="text-primary-1000 underline text-base">
          {priceBreakdownText}
        </button>
      </section>
    </section>
  );
};

export default BreakdownSummary;
