import React from 'react';
import PriceDisplay from 'cars/components/PriceDisplay/PriceDisplay';
import { Rates } from '../../../types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import Paragraph from '../../../../components/global/Typography/Paragraph';
import TaxesAndFeesPopover from 'cars/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface BreakdownSummaryProps {
  rate: any;
  nights?: number;
  guests?: number;
  CustomPriceBreakdown?: React.ReactElement;
  roomsQty?: number;
  showTotal?: boolean;
}

const BreakdownSummary = ({
  rate,
  CustomPriceBreakdown,
  showTotal = false,
  nights = 0,
  roomsQty = 0,
}: BreakdownSummaryProps) => {
  console.log(rate);
  const [tg] = useTranslation('global');
  const [t] = useTranslation('flights');
  const includesTaxesAndFeesText = t(
    'includesTaxesAndFees',
    'Includes Taxes And Fees',
  );
  const totalLabel = tg('total', 'Total');

  return (
    <section className="flex items-center justify-between">
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
