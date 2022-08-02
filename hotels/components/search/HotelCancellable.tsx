import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import { MinRate } from 'hotels/types/response/SearchResponse';
import { useTranslation } from 'react-i18next';

interface HotelCancellableProps {
  minRate: MinRate;
}

const HotelCancellable = ({ minRate }: HotelCancellableProps) => {
  const [t, i18next] = useTranslation('global');
  const cancellableType = 'FREE_CANCELLATION';
  const cancellationPolicy = minRate?.cancellation_policy;
  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;
  const notCancellableLabel = t('ourDealForYou', 'Our Deal for You');
  return (
    <section className="flex justify-end">
      {cancellable && <FreeCancellation cancellable={cancellable} />}
      {!cancellable && (
        <span className="text-dark-800 text-sm">{notCancellableLabel}</span>
      )}
    </section>
  );
};
export default HotelCancellable;
