import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import { MinRate } from 'hotels/types/response/SearchResponse';
import { useTranslation } from 'react-i18next';

interface HotelCancellableProps {
  minRate: MinRate;
}

const HotelCancellable = ({ minRate }: HotelCancellableProps) => {
  const [t, i18next] = useTranslation('global');
  const cancellableType = 'FREE_CANCELLATION';
  const nonRefundable = 'NON_REFUNDABLE';
  const cancellationPolicy = minRate?.cancellation_policy;
  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;
  const nonCancellable =
    cancellationPolicy?.cancellation_type === nonRefundable;
  const notCancellableLabel = t('ourDealForYou', 'Our Deal For You');
  return (
    <section className="flex justify-end">
      {cancellable && <FreeCancellation cancellable={cancellable} />}
      {nonCancellable && <NonRefundable nonCancellable={nonCancellable} />}
      {!cancellable && !nonCancellable && (
        <span className="text-sm text-dark-800">{notCancellableLabel}</span>
      )}
    </section>
  );
};
export default HotelCancellable;
