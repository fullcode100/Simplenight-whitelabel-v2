import React, { FC } from 'react';
import TaxesAndFeesPopover from '../../../hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { Parking } from '../../types/response/ParkingSearchResponse';
import { useTranslation } from 'react-i18next';

interface PriceDisplayProps {
  parking: Parking;
}

export const PriceDisplay: FC<PriceDisplayProps> = ({ parking }) => {
  const { t } = useTranslation('parking');
  const staticDetails = parking.properties.static;
  const dynamicDetails = parking.properties.dynamic;

  const currencyCode = staticDetails.rate_tables?.currency_code;
  const currency = staticDetails.rate_tables?.currency;
  // const ratePerHour = rateTable?.rates?.find((r) => r.type === 'PT1H');
  const price = dynamicDetails?.rates?.[0]?.price || 0;
  const isCurrencyAndCodeSame = currencyCode === currency;

  return (
    <section className="text-right flex flex-col gap-2">
      {currencyCode && (
        <section className="flex flex-col gap-1 items-end">
          <p className="text-lg leading-[18px] text-dark-1000">
            {price > 0 ? (
              <>
                {isCurrencyAndCodeSame
                  ? `${currencyCode} `
                  : `${currencyCode}${currency}`}
                {price.toFixed(2)}
              </>
            ) : (
              t('free')
            )}
          </p>{' '}
          {price > 0 && <p className="text-xs text-dark-1000">{t('total')}</p>}
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
