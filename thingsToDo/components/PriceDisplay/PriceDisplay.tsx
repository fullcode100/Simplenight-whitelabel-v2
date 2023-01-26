import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import Paragraph from 'components/global/Typography/Paragraph';

interface ThingsRates {
  total: {
    amount: number;
    formatted: string;
    currency: string;
  };
  discount_percentage: string;
  total_amount_before_discount: {
    amount: number;
    formatted: string;
    currency: string;
  };
}
interface PriceDisplayProps {
  rate: ThingsRates;
  totalLabel?: string;
}

const PriceDisplay = ({ rate, totalLabel }: PriceDisplayProps) => {
  const percentageToApply = rate?.discount_percentage;
  const totalBeforeDiscount = rate?.total_amount_before_discount.formatted;

  const [t] = useTranslation('global');
  const startingRoomTotalLabel = t('total', 'Total');
  const taxesAndFeesLabel = t(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  return (
    <section className="text-right">
      {totalBeforeDiscount && (
        <p className="text-xs">
          <span className="font-normal line-through text-dark-700">
            {totalBeforeDiscount}
          </span>{' '}
          <span className="font-semibold text-green-1000">
            {percentageToApply} Off
          </span>
        </p>
      )}
      <p
        className={classnames('leading-[22px] text-dark-1000', {
          ['flex flex-row gap-1 justify-end']: totalLabel,
        })}
      >
        <span className="text-xs">{totalLabel}</span>
      </p>

      <section className="flex flex-row justify-end gap-1">
        <Paragraph size="xxsmall" textColor="text-dark-800">
          {taxesAndFeesLabel}
        </Paragraph>
        <TaxesAndFeesPopover />
      </section>
    </section>
  );
};
export default PriceDisplay;
