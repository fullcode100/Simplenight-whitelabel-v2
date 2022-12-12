import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import PartialRefund from 'components/global/PartialRefund/PartialRefund';
import { MinRate } from 'hotels/types/response/SearchResponse';

const cancellableType = 'FREE_CANCELLATION';
const nonRefundable = 'NON_REFUNDABLE';
const partialRefund = 'PARTIAL_REFUND';
interface HotelCancellableProps {
  minRate: MinRate;
}

const HotelCancellable = ({ minRate }: HotelCancellableProps) => {
  const cancellationPolicy = minRate?.cancellation_policy;

  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;
  const nonCancellable =
    cancellationPolicy?.cancellation_type === nonRefundable;
  const partialRefundable =
    cancellationPolicy?.cancellation_type === partialRefund;

  return (
    <section className="flex justify-end">
      {cancellable && <FreeCancellation cancellable={cancellable} />}
      {nonCancellable && <NonRefundable nonCancellable={nonCancellable} />}
      {partialRefundable && (
        <PartialRefund nonCancellable={partialRefundable} />
      )}
      {/* {!cancellable && !nonCancellable && (
        <span className="text-sm text-dark-800">{notCancellableLabel}</span>
      )} */}
    </section>
  );
};
export default HotelCancellable;
