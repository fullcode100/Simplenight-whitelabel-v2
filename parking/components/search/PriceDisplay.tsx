import React, { FC } from 'react';
import TaxesAndFeesPopover from '../../../hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { Parking } from '../../types/response/ParkingSearchResponse';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

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
  const isCurrencyAndCodeSame = currencyCode === currency;
  const fareDetails = dynamicDetails?.rates?.[0];
  const price = fareDetails?.price || 0;
  const durationIso = fareDetails?.value;

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
          {price > 0 && durationIso && (
            <ParkingDuration durationIso={durationIso} />
          )}
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

const ParkingDuration: FC<{ durationIso: string }> = ({ durationIso }) => {
  const [t] = useTranslation('parking');
  const duration = dayjs.duration(durationIso);
  const asHours = duration.asHours();

  return (
    <p className="text-[12px] text-dark-1000 flex items-center gap-1">
      {t('priceUpTo')}

      {!!asHours && (
        <span>
          {asHours} {t(asHours > 1 ? 'hours' : 'hour')}
        </span>
      )}
    </p>
  );
};
