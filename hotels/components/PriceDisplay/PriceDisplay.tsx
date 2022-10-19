import React from 'react';
import classnames from 'classnames';

import { Rates } from '../../types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';

interface PriceDisplayProps {
  rate: Rates;
  totalLabel?: string;
  isSearch?: boolean;
  isPriceBase?: boolean;
}

const PriceDisplay = ({
  rate,
  totalLabel,
  isSearch = false,
  isPriceBase,
}: PriceDisplayProps) => {
  const totalAmount = rate?.min_rate.rate.total_amount.formatted;
  const avgAmount = rate?.avg_amount?.avg_amount?.formatted;
  const startingRoomTotal = rate?.min_rate?.rate.starting_room_total;
  const discounts = rate?.avg_amount?.discounts;
  const [t] = useTranslation('global');
  const startingRoomTotalLabel = t('total', 'Total');
  const taxesAndFeesLabel = t(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  let totalBeforeDiscount;
  let percentageToApply;
  if (discounts) {
    ({
      total_amount_before_apply: totalBeforeDiscount,
      percentage_to_apply: percentageToApply,
    } = discounts);
  }

  // const baseBeforeApply = rate?.avg_amount?.discounts?.base_amount_before_apply;
  isPriceBase &&
    (totalBeforeDiscount =
      rate?.min_rate.rate?.rate_breakdown.discounts?.total_amount_before_apply);
  return (
    <section className="text-right">
      {totalBeforeDiscount && (
        <p className="text-xs">
          <span className="text-dark-700 line-through font-normal">
            {totalBeforeDiscount.formatted}
          </span>{' '}
          <span className="text-green-1000 font-semibold">
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
        <span className="text-sm font-semibold">{avgAmount}</span>
      </p>
      {isSearch && startingRoomTotal && (
        <p className="text-[12px] leading-[15px] text-dark-1000 flex flex-row gap-1 justify-end">
          <span>{startingRoomTotal.formatted}</span>{' '}
          <span>{startingRoomTotalLabel}</span>
        </p>
      )}
      <section className="flex flex-row gap-1 justify-end">
        <p className="text-[12px] leading-[15px] text-dark-800">
          {taxesAndFeesLabel}
        </p>
        <TaxesAndFeesPopover />
      </section>
    </section>
  );
};
export default PriceDisplay;
