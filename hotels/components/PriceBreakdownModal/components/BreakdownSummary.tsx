import React from 'react';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import { Rate } from '../../../types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import Paragraph from '../../../../components/global/Typography/Paragraph';

interface BreakdownSummaryProps {
  rate: Rate;
  nights?: number;
  guests?: number;
  CustomPriceBreakdown?: React.ReactElement;
}

const BreakdownSummary = ({
  rate,
  CustomPriceBreakdown,
}: BreakdownSummaryProps) => {
  const [tg] = useTranslation('global');
  const [t] = useTranslation('hotels');
  const includesTaxesAndFeesText = t(
    'includesTaxesAndFees',
    'Includes Taxes And Fees',
  );
  const totalLabel = tg('total', 'Total');
  return (
    <section className="flex justify-between items-center">
      <Paragraph size="small" fontWeight="normal">
        {totalLabel}
      </Paragraph>
      <section className="text-right">
        <PriceDisplay rate={rate} />
        <p className="text-dark-800 text-xs">{includesTaxesAndFeesText}</p>
        {CustomPriceBreakdown && <>{CustomPriceBreakdown}</>}
      </section>
    </section>
  );
};

export default BreakdownSummary;
