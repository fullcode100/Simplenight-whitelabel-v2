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
  const notCancellableLabel = t('ourDealForYou', 'Our Deal for You');

  const { rate, cancellation_policy: cancellationPolicy } = minRate;
  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;

  return (
    <section className="flex justify-between items-center border-t border-dark-300 py-2 px-4">
      {cancellable && <FreeCancellation cancellable={cancellable} />}
      {!cancellable && (
        <span className="text-dark-800 text-sm">{notCancellableLabel}</span>
      )}
      <PriceDisplay rate={rate} totalLabel={fromLabel} />
    </section>
  );
};

export default HotelItemRateInfo;
