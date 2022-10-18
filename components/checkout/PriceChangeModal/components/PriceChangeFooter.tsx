import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PriceChangeFooterProps {
  oldTotal: string;
  newTotal: string;
  priceAccepted: boolean;
}

const PriceChangeFooter = ({
  oldTotal,
  newTotal,
  priceAccepted,
}: PriceChangeFooterProps) => {
  const [t] = useTranslation('global');
  const totalLabel = t('total', 'Total');
  const taxesAndFeesLabel = t(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );
  const acceptLabel = t('accept', 'Accept');
  const discardLabel = t('discardItinerary', 'Discard Itinerary');

  return (
    <section className="py-6 px-4 space-y-4">
      {priceAccepted && (
        <section className="flex justify-between items-center text-dark-1000">
          <p className="mt-2.5 text-sm leading-[22px]">{totalLabel}</p>
          <section className="flex flex-col items-end">
            <p className="text-xs text-dark-700 line-through font-normal">
              {oldTotal}
            </p>
            <p className="font-semibold text-sm">{newTotal}</p>
            <section className="flex flex-row gap-1">
              <p className="text-[12px] leading-[15px] text-dark-800">
                {taxesAndFeesLabel}
              </p>
              <TaxesAndFeesPopover />
            </section>
          </section>
        </section>
      )}
      <button
        className={`text-base w-full py-3 rounded text-center text-white font-semibold ${
          priceAccepted ? 'bg-primary-1000' : 'bg-error-1000'
        }`}
      >
        {priceAccepted ? acceptLabel : discardLabel}
      </button>
    </section>
  );
};

export default PriceChangeFooter;
