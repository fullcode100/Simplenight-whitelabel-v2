import { useTranslation } from 'react-i18next';

import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import PriceDisplay from 'components/global/PriceDisplay/PriceDisplay';
import { MinRate } from 'hotels/types/response/SearchResponse';

interface HotelItemRateInfoProps {
  minRate: MinRate;
}

const cancellableType = 'FREE_CANCELLATION';

const HotelItemRateInfo = ({ minRate }: HotelItemRateInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const fromLabel = t('from', 'From');

  const { rate, cancellation_policy: cancellationPolicy } = minRate;
  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;

  return (
    <section className="flex justify-between items-center">
      <FreeCancellation cancellable={cancellable} />
      <PriceDisplay rate={rate} totalLabel={fromLabel} />
    </section>
  );
};

export default HotelItemRateInfo;
