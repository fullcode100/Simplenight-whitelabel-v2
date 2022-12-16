import React from 'react';
import PriceDisplay from 'flights/components/PriceDisplay/PriceDisplay';
import { Rate } from '../../../types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import Paragraph from '../../../../components/global/Typography/Paragraph';

interface BreakdownSummaryProps {
  rate: any;
  nights?: number;
  guests?: number;
  CustomPriceBreakdown?: React.ReactElement;
}

const BreakdownSummary = ({
  rate,
  CustomPriceBreakdown,
}: BreakdownSummaryProps) => {
  const [tg] = useTranslation('global');
  const [t] = useTranslation('flights');
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
        {/* <PriceDisplay rate={rate} /> */}
        {rate?.total?.prepaid?.amount} {rate?.total?.prepaid?.currency}
        <p className="text-dark-800 text-xs">{includesTaxesAndFeesText}</p>
        {CustomPriceBreakdown && <>{CustomPriceBreakdown}</>}
      </section>
    </section>
  );
};

export default BreakdownSummary;
