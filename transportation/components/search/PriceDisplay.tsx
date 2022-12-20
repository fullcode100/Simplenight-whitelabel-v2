import React, { FC } from 'react';
import TaxesAndFeesPopover from '../../../hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { Quote } from '../../types/response/TransportationSearchResponse';
import { useTranslation } from 'react-i18next';

interface PriceDisplayProps {
  transportaion: Quote;
}

export const TransportaionDisplay: FC<PriceDisplayProps> = ({ transportaion }) => {
  const { t } = useTranslation('ground-transportation');

  const currencyCode = transportaion.fare.currency_code;
  const price = transportaion.fare.price || 0;

  return (
    <section className="text-right flex flex-col gap-2">
      {currencyCode && (
        <section className="flex flex-col gap-1 items-end">
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
        <section className="flex flex-row gap-1 justify-end">
          <p className="text-[12px] leading-[15px] text-dark-800">
            Includes Taxes and Fees
          </p>
          <TaxesAndFeesPopover />
        </section>
      )}
    </section>
  );
};
