import React, { FC } from 'react';
import TaxesAndFeesPopover from '../../../hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { TransportationItem } from '../../types/response/TransportationSearchResponse';
import { useTranslation } from 'react-i18next';

interface PriceDisplayProps {
  transportaion: TransportationItem;
}

export const TransportaionDisplay: FC<PriceDisplayProps> = ({
  transportaion,
}) => {
  const { t } = useTranslation('ground-transportation');

  const currencyCode = transportaion.rate.total.full.currency;
  const price = transportaion.rate.total.full.amount || 0;

  return (
    <section className="flex flex-col gap-2 text-right">
      {currencyCode && (
        <section className="flex flex-col items-end gap-1">
          <p className="text-lg leading-[18px] text-dark-1000">
            {price > 0 ? (
              <>
                {currencyCode} {price.toFixed(2)}
              </>
            ) : (
              t('free')
            )}
          </p>
        </section>
      )}
      {price > 0 && (
        <section className="flex flex-row justify-end gap-1">
          <p className="text-[12px] leading-[15px] text-dark-800">
            Includes Taxes and Fees
          </p>
          <TaxesAndFeesPopover />
        </section>
      )}
    </section>
  );
};
