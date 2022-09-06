import React from 'react';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import { Rate } from '../../../types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import Paragraph from '../../../../components/global/Typography/Paragraph';
import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';

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
    <section className="flex items-center justify-between">
      <Paragraph size="small" fontWeight="normal">
        {totalLabel}
      </Paragraph>
      <section className="text-right">
        <PriceDisplay rate={rate} />
        <section className="flex flex-row gap-1">
          <p className="text-xs text-dark-800">{includesTaxesAndFeesText}</p>
          <TaxesAndFeesPopover />
        </section>

        {CustomPriceBreakdown && <>{CustomPriceBreakdown}</>}
      </section>
    </section>
  );
};

export default BreakdownSummary;
